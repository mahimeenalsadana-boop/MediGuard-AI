import os
from pathlib import Path
from datetime import date
from io import BytesIO

from flask import Flask, jsonify, request
from flask_cors import CORS
from dotenv import load_dotenv
from google import genai
import pytesseract
from PIL import Image, UnidentifiedImageError

from database import get_db_connection, create_tables


# -----------------------------------
# APP CONFIGURATION
# -----------------------------------

app = Flask(__name__)
CORS(app)

app.config["MAX_CONTENT_LENGTH"] = 5 * 1024 * 1024

app_folder = Path(__file__).resolve().parent
env_path = app_folder / ".env"

load_dotenv(dotenv_path=env_path, override=True)

pytesseract.pytesseract.tesseract_cmd = (
    r"C:\Program Files\Tesseract-OCR\tesseract.exe"
)

# GEMINI CONFIGURATION
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY", "").strip()
GEMINI_MODEL = os.getenv("GEMINI_MODEL", "gemini-2.5-flash")

client = None

print("ENV FILE EXISTS:", env_path.exists())
print("API KEY FOUND:", bool(GEMINI_API_KEY))

if GEMINI_API_KEY:
    try:
        client = genai.Client(api_key=GEMINI_API_KEY)
        print("Gemini API client initialized.")
    except Exception as error:
        print("Gemini initialization error:", error)
else:
    print("Gemini API key NOT found.")

create_tables()


# -----------------------------------
# HOME
# -----------------------------------

@app.route("/")
def home():
    return jsonify({
        "message": "Welcome to MediGuard AI API",
        "status": "Running"
    })


# -----------------------------------
# GET MEDICINES
# -----------------------------------

@app.route("/medicines", methods=["GET"])
def get_medicines():
    conn = get_db_connection()

    medicines = conn.execute(
        "SELECT * FROM medicines ORDER BY id DESC"
    ).fetchall()

    conn.close()

    return jsonify([dict(item) for item in medicines])


# -----------------------------------
# ADD MEDICINE
# -----------------------------------

@app.route("/add_medicine", methods=["POST"])
def add_medicine():
    data = request.get_json(silent=True) or {}

    medicine_name = str(
        data.get("medicine_name", "")
    ).strip()

    if not medicine_name:
        return jsonify({"error": "Medicine name is required"}), 400

    try:
        stock = int(data.get("stock", 0) or 0)
    except (TypeError, ValueError):
        return jsonify({"error": "Invalid stock quantity"}), 400

    if stock < 0:
        return jsonify({"error": "Stock cannot be negative"}), 400

    conn = get_db_connection()

    cursor = conn.execute("""
        INSERT INTO medicines
        (medicine_name, dosage, frequency, timing, duration, stock)
        VALUES (?, ?, ?, ?, ?, ?)
    """, (
        medicine_name,
        data.get("dosage", ""),
        data.get("frequency", ""),
        data.get("timing", ""),
        data.get("duration", ""),
        stock
    ))

    medicine_id = cursor.lastrowid

    conn.commit()
    conn.close()

    return jsonify({
        "message": "Medicine added successfully",
        "id": medicine_id
    }), 201


# -----------------------------------
# UPDATE MEDICINE
# -----------------------------------

@app.route("/update_medicine/<int:medicine_id>", methods=["PUT"])
def update_medicine(medicine_id):
    data = request.get_json(silent=True) or {}

    try:
        stock = int(data.get("stock", 0) or 0)
    except (TypeError, ValueError):
        return jsonify({"error": "Invalid stock quantity"}), 400

    if stock < 0:
        return jsonify({"error": "Stock cannot be negative"}), 400

    conn = get_db_connection()

    cursor = conn.execute("""
        UPDATE medicines
        SET medicine_name = ?,
            dosage = ?,
            frequency = ?,
            timing = ?,
            duration = ?,
            stock = ?
        WHERE id = ?
    """, (
        data.get("medicine_name", ""),
        data.get("dosage", ""),
        data.get("frequency", ""),
        data.get("timing", ""),
        data.get("duration", ""),
        stock,
        medicine_id
    ))

    conn.commit()
    conn.close()

    if cursor.rowcount == 0:
        return jsonify({"error": "Medicine not found"}), 404

    return jsonify({"message": "Medicine updated successfully"})


# -----------------------------------
# DELETE MEDICINE
# -----------------------------------

@app.route("/delete_medicine/<int:medicine_id>", methods=["DELETE"])
def delete_medicine(medicine_id):
    conn = get_db_connection()

    conn.execute(
        "DELETE FROM reminders WHERE medicine_id = ?",
        (medicine_id,)
    )

    cursor = conn.execute(
        "DELETE FROM medicines WHERE id = ?",
        (medicine_id,)
    )

    conn.commit()
    conn.close()

    if cursor.rowcount == 0:
        return jsonify({"error": "Medicine not found"}), 404

    return jsonify({"message": "Medicine deleted successfully"})


# -----------------------------------
# ADD REMINDER
# -----------------------------------

@app.route("/add_reminder", methods=["POST"])
def add_reminder():
    data = request.get_json(silent=True) or {}

    medicine_id = data.get("medicine_id")
    reminder_time = str(
        data.get("reminder_time", "")
    ).strip()

    if not medicine_id or not reminder_time:
        return jsonify({
            "error": "Medicine and reminder time are required"
        }), 400

    try:
        medicine_id = int(medicine_id)
    except (TypeError, ValueError):
        return jsonify({"error": "Invalid medicine ID"}), 400

    repeat_type = data.get("repeat_type", "once")

    if repeat_type not in ["once", "daily", "weekly"]:
        return jsonify({"error": "Invalid repeat type"}), 400

    weekdays = data.get("weekdays", [])

    if isinstance(weekdays, list):
        weekdays = ",".join(str(day) for day in weekdays)
    else:
        weekdays = str(weekdays or "")

    reminder_date = data.get("reminder_date") or None

    if repeat_type == "once" and not reminder_date:
        reminder_date = date.today().isoformat()

    if repeat_type == "weekly" and not weekdays:
        return jsonify({
            "error": "Select at least one weekday"
        }), 400

    conn = get_db_connection()

    medicine = conn.execute(
        "SELECT id FROM medicines WHERE id = ?",
        (medicine_id,)
    ).fetchone()

    if not medicine:
        conn.close()
        return jsonify({"error": "Medicine not found"}), 404

    cursor = conn.execute("""
        INSERT INTO reminders
        (medicine_id, reminder_time, reminder_date,
         status, repeat_type, weekdays)
        VALUES (?, ?, ?, 'Pending', ?, ?)
    """, (
        medicine_id,
        reminder_time,
        reminder_date,
        repeat_type,
        weekdays
    ))

    reminder_id = cursor.lastrowid

    conn.commit()
    conn.close()

    return jsonify({
        "message": "Reminder saved successfully",
        "id": reminder_id
    }), 201


# -----------------------------------
# GET REMINDERS
# -----------------------------------

@app.route("/reminders", methods=["GET"])
def get_reminders():
    conn = get_db_connection()

    reminders = conn.execute("""
        SELECT reminders.*,
               medicines.medicine_name
        FROM reminders
        JOIN medicines
        ON reminders.medicine_id = medicines.id
        ORDER BY reminders.reminder_time
    """).fetchall()

    conn.close()

    return jsonify([dict(item) for item in reminders])


# -----------------------------------
# UPDATE REMINDER STATUS
# -----------------------------------

@app.route("/update_reminder/<int:reminder_id>", methods=["PUT"])
def update_reminder(reminder_id):
    data = request.get_json(silent=True) or {}
    status = data.get("status")

    allowed_statuses = [
        "Pending", "Taken", "Missed", "Skipped"
    ]

    if status not in allowed_statuses:
        return jsonify({"error": "Invalid reminder status"}), 400

    conn = get_db_connection()

    cursor = conn.execute("""
        UPDATE reminders
        SET status = ?
        WHERE id = ?
    """, (status, reminder_id))

    conn.commit()
    conn.close()

    if cursor.rowcount == 0:
        return jsonify({"error": "Reminder not found"}), 404

    return jsonify({"message": "Reminder status updated"})


# -----------------------------------
# DELETE REMINDER
# -----------------------------------

@app.route("/delete_reminder/<int:reminder_id>", methods=["DELETE"])
def delete_reminder(reminder_id):
    conn = get_db_connection()

    cursor = conn.execute(
        "DELETE FROM reminders WHERE id = ?",
        (reminder_id,)
    )

    conn.commit()
    conn.close()

    if cursor.rowcount == 0:
        return jsonify({"error": "Reminder not found"}), 404

    return jsonify({
        "message": "Reminder deleted successfully"
    })


# -----------------------------------
# UPDATE STOCK
# -----------------------------------

@app.route("/update_stock/<int:medicine_id>", methods=["PUT"])
def update_stock(medicine_id):
    data = request.get_json(silent=True) or {}

    try:
        stock = int(data.get("stock"))
    except (TypeError, ValueError):
        return jsonify({"error": "Invalid stock quantity"}), 400

    if stock < 0:
        return jsonify({"error": "Stock cannot be negative"}), 400

    conn = get_db_connection()

    cursor = conn.execute("""
        UPDATE medicines
        SET stock = ?
        WHERE id = ?
    """, (stock, medicine_id))

    conn.commit()
    conn.close()

    if cursor.rowcount == 0:
        return jsonify({"error": "Medicine not found"}), 404

    return jsonify({"message": "Stock updated successfully"})


# -----------------------------------
# REFILL ALERTS
# -----------------------------------

@app.route("/refill_alerts", methods=["GET"])
def refill_alerts():
    conn = get_db_connection()

    medicines = conn.execute("""
        SELECT *
        FROM medicines
        WHERE stock <= 5
        ORDER BY stock ASC
    """).fetchall()

    conn.close()

    return jsonify([dict(item) for item in medicines])


# -----------------------------------
# PRESCRIPTION OCR SCANNER
# -----------------------------------

@app.route("/scan_prescription", methods=["POST"])
def scan_prescription():
    if "prescriptionImage" not in request.files:
        return jsonify({
            "error": "Please upload a prescription image."
        }), 400

    file = request.files["prescriptionImage"]

    if not file.filename:
        return jsonify({"error": "No image selected."}), 400

    try:
        image = Image.open(BytesIO(file.read()))
        image = image.convert("RGB")

        extracted_text = pytesseract.image_to_string(
            image,
            lang="eng"
        )

        if not extracted_text.strip():
            return jsonify({
                "error": "No readable text found. Please try a clearer image."
            }), 422

        return jsonify({
            "message": "OCR completed. Please verify the extracted text.",
            "extracted_text": extracted_text
        })

    except pytesseract.TesseractNotFoundError:
        print("Tesseract executable was not found.")

        return jsonify({
            "error": "Tesseract was not found. Check its installation path."
        }), 500

    except pytesseract.TesseractError as error:
        print("OCR Error:", str(error))

        return jsonify({
            "error": "OCR could not process this image."
        }), 500

    except UnidentifiedImageError:
        return jsonify({
            "error": "Invalid image file. Please upload JPG or PNG."
        }), 400

    except Exception as error:
        print("Prescription scan error:", str(error))

        return jsonify({
            "error": "Prescription scanning failed."
        }), 500


# -----------------------------------
# GEMINI AI ASSISTANT
# -----------------------------------

@app.route("/ask_ai", methods=["POST"])
def ask_ai():
    if not client:
        return jsonify({
            "error": "Gemini is not configured. Check your .env file."
        }), 503

    data = request.get_json(silent=True) or {}
    message = str(data.get("message", "")).strip()

    if not message:
        return jsonify({"error": "Please enter a question."}), 400

    if len(message) > 4000:
        return jsonify({"error": "Question is too long."}), 400

    prompt = f"""
You are MediGuard AI, a medication information and reminder assistant.

Safety rules:
1. Do not diagnose medical conditions.
2. Do not prescribe medicines or recommend changing doses.
3. Do not advise users to start or stop medicines.
4. Do not claim that medicine combinations are safe.
5. Refer possible interactions to a doctor or pharmacist.
6. Never guess unclear prescription handwriting.
7. For urgent symptoms, advise contacting emergency medical care.
8. Use simple, clear language.
9. This is an educational prototype, not a replacement for a clinician.

User question:
{message}
"""

    try:
        response = client.models.generate_content(
            model=GEMINI_MODEL,
            contents=prompt
        )

        answer = response.text

        if not answer:
            return jsonify({
                "error": "AI returned an empty response."
            }), 502

        return jsonify({"answer": answer})

    except Exception as error:
        print("Gemini API Error:", str(error))

        return jsonify({
            "error": "AI response could not be generated. Please try again."
        }), 502


# -----------------------------------
# RUN SERVER
# -----------------------------------

if __name__ == "__main__":
    app.run(
        host="127.0.0.1",
        port=5000,
        debug=True
    )