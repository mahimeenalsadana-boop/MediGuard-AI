
import sqlite3
from pathlib import Path


# Database file will be created in the project folder
DB_PATH = Path(__file__).resolve().parent / "mediguard.db"


def get_db_connection():
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    conn.execute("PRAGMA foreign_keys = ON")
    return conn


def create_tables():
    conn = get_db_connection()

    # MEDICINES TABLE
    conn.execute("""
        CREATE TABLE IF NOT EXISTS medicines (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            medicine_name TEXT NOT NULL,
            dosage TEXT,
            frequency TEXT,
            timing TEXT,
            duration TEXT,
            stock INTEGER DEFAULT 0
        )
    """)

    # REMINDERS TABLE
    conn.execute("""
        CREATE TABLE IF NOT EXISTS reminders (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            medicine_id INTEGER NOT NULL,
            reminder_time TEXT NOT NULL,
            reminder_date TEXT,
            status TEXT DEFAULT 'Pending',
            repeat_type TEXT DEFAULT 'once',
            weekdays TEXT,
            FOREIGN KEY (medicine_id)
                REFERENCES medicines(id)
                ON DELETE CASCADE
        )
    """)

    # FAMILY INVITE CODES TABLE
    conn.execute("""
        CREATE TABLE IF NOT EXISTS family_invites (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            invite_code TEXT NOT NULL UNIQUE,
            patient_id TEXT NOT NULL,
            created_at TEXT NOT NULL,
            expires_at TEXT NOT NULL,
            status TEXT DEFAULT 'Active'
        )
    """)

    # FAMILY ACCESS REQUESTS TABLE
    conn.execute("""
        CREATE TABLE IF NOT EXISTS family_access_requests (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            invite_id INTEGER NOT NULL,
            family_member_id TEXT NOT NULL,
            family_member_name TEXT,
            requested_at TEXT NOT NULL,
            status TEXT DEFAULT 'Pending',
            FOREIGN KEY (invite_id)
                REFERENCES family_invites(id)
                ON DELETE CASCADE
        )
    """)

    # MIGRATE EXISTING REMINDERS TABLE
    columns = [
        row["name"]
        for row in conn.execute(
            "PRAGMA table_info(reminders)"
        ).fetchall()
    ]

    if "repeat_type" not in columns:
        conn.execute("""
            ALTER TABLE reminders
            ADD COLUMN repeat_type TEXT DEFAULT 'once'
        """)

    if "weekdays" not in columns:
        conn.execute("""
            ALTER TABLE reminders
            ADD COLUMN weekdays TEXT
        """)

    conn.commit()
    conn.close()


if __name__ == "__main__":
    create_tables()
    print("MediGuard AI Database Updated Successfully!")
