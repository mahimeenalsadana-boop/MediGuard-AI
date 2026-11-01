
const REMINDER_API_BASE = "http://127.0.0.1:5000";

const SOUND_STORAGE_KEY = "mediguard_sound_enabled";
const ALERT_STORAGE_KEY = "mediguard_alerted_reminders";
const VOICE_STORAGE_KEY = "mediguard_voice_enabled";

let audioContext = null;
let soundEnabled =
    localStorage.getItem(SOUND_STORAGE_KEY) === "true";

let voiceEnabled =
    localStorage.getItem(VOICE_STORAGE_KEY) !== "false";

let reminderCheckRunning = false;
let reminderCheckInterval = null;

const alertedReminders = new Set();
const snoozeTimers = new Map();

/* =====================================
   AUDIO INITIALIZATION
===================================== */

function initializeAudio() {
    const AudioContextClass =
        window.AudioContext || window.webkitAudioContext;

    if (!AudioContextClass) return false;

    if (!audioContext) {
        audioContext = new AudioContextClass();
    }

    return true;
}

async function activateSavedSound() {
    if (!soundEnabled) return;

    try {
        initializeAudio();

        if (audioContext.state === "suspended") {
            await audioContext.resume();
        }
    } catch (error) {
        console.log("Audio waiting for user interaction:", error);
    }
}

/* =====================================
   ENABLE SOUND
===================================== */

async function enableReminderSound() {
    try {
        if (!initializeAudio()) {
            alert("Sound is not supported by this browser.");
            return;
        }

        await audioContext.resume();

        if (audioContext.state !== "running") {
            alert("Please allow sound in your browser.");
            return;
        }

        soundEnabled = true;

        localStorage.setItem(SOUND_STORAGE_KEY, "true");

        playReminderSound();
        updateSoundButton();

        alert("Reminder sound enabled and saved!");

    } catch (error) {
        console.error("Sound setup error:", error);
        alert("Could not enable reminder sound.");
    }
}

/* =====================================
   SOUND
===================================== */

function playReminderSound() {
    if (!soundEnabled || !audioContext) return;

    if (audioContext.state !== "running") {
        activateSavedSound();
        return;
    }

    const frequencies = [660, 880, 660];

    frequencies.forEach((frequency, index) => {
        const oscillator = audioContext.createOscillator();
        const gain = audioContext.createGain();

        const startTime =
            audioContext.currentTime + index * 0.25;

        oscillator.type = "sine";
        oscillator.frequency.value = frequency;

        gain.gain.setValueAtTime(0.001, startTime);
        gain.gain.exponentialRampToValueAtTime(
            0.2,
            startTime + 0.03
        );
        gain.gain.exponentialRampToValueAtTime(
            0.001,
            startTime + 0.18
        );

        oscillator.connect(gain);
        gain.connect(audioContext.destination);

        oscillator.start(startTime);
        oscillator.stop(startTime + 0.2);
    });
}

/* =====================================
   VOICE REMINDER
===================================== */

function speakMedicineReminder(reminder) {
    if (!voiceEnabled) return;

    if (!("speechSynthesis" in window)) {
        console.log("Speech is not supported by this browser.");
        return;
    }

    const medicineName =
        reminder.medicine_name || "your medicine";

    const message =
        `It's time for your medicine, ${medicineName}. ` +
        "Please check your medicine instructions.";

    window.speechSynthesis.cancel();

    const speech = new SpeechSynthesisUtterance(message);

    speech.lang = "en-IN";
    speech.rate = 0.9;
    speech.pitch = 1;
    speech.volume = 1;

    window.speechSynthesis.speak(speech);
}

/* =====================================
   VOICE SETTINGS
===================================== */

function toggleReminderVoice() {
    voiceEnabled = !voiceEnabled;

    localStorage.setItem(
        VOICE_STORAGE_KEY,
        String(voiceEnabled)
    );

    updateVoiceButton();

    if (voiceEnabled) {
        alert("Voice reminders enabled!");
    } else {
        window.speechSynthesis?.cancel();
        alert("Voice reminders disabled.");
    }
}

function updateVoiceButton() {
    const button = document.getElementById(
        "reminderVoiceButton"
    );

    if (button) {
        button.textContent = voiceEnabled
            ? "🗣️ Voice Reminders: ON"
            : "🗣️ Voice Reminders: OFF";
    }
}

/* =====================================
   RESTORE AUDIO AFTER PAGE LOAD
===================================== */

function setupSoundRestore() {
    if (!soundEnabled) return;

    initializeAudio();
    activateSavedSound();

    const resumeOnInteraction = async () => {
        if (!soundEnabled || !audioContext) return;

        try {
            if (audioContext.state === "suspended") {
                await audioContext.resume();
            }
        } catch (error) {
            console.log("Audio resume error:", error);
        }
    };

    document.addEventListener("click", resumeOnInteraction);
    document.addEventListener("keydown", resumeOnInteraction);
    document.addEventListener("touchstart", resumeOnInteraction);
}

/* =====================================
   NOTIFICATION PERMISSION
===================================== */

async function enableReminderNotifications() {
    if (!("Notification" in window)) {
        alert("Browser notifications are not supported.");
        return;
    }

    try {
        let permission = Notification.permission;

        if (permission === "default") {
            permission = await Notification.requestPermission();
        }

        if (permission === "granted") {
            alert("Browser notifications enabled!");

            new Notification("MediGuard AI", {
                body: "Your medicine reminders are ready.",
                tag: "mediguard-test"
            });
        } else {
            alert("Please allow notifications in browser settings.");
        }

    } catch (error) {
        console.error("Notification error:", error);
        alert("Could not enable notifications.");
    }
}

/* =====================================
   BROWSER NOTIFICATION
===================================== */

function showBrowserNotification(reminder) {
    if (
        !("Notification" in window) ||
        Notification.permission !== "granted"
    ) {
        return;
    }

    try {
        new Notification("MediGuard AI - Medicine Reminder", {
            body: `Time for your medicine: ${reminder.medicine_name}`,
            tag: `medicine-reminder-${reminder.id}`,
            requireInteraction: true
        });
    } catch (error) {
        console.error("Browser notification error:", error);
    }
}

/* =====================================
   POPUP BUTTON
===================================== */

function createPopupButton(label, color, onClick) {
    const button = document.createElement("button");

    button.type = "button";
    button.textContent = label;

    button.style.cssText = `
        display: block;
        width: 100%;
        margin-top: 9px;
        padding: 10px;
        border: none;
        border-radius: 7px;
        background: ${color};
        color: white;
        cursor: pointer;
        font-size: 14px;
    `;

    button.addEventListener("click", onClick);

    return button;
}

/* =====================================
   REMINDER POPUP
===================================== */

function showReminderAlert(reminder) {
    playReminderSound();
    speakMedicineReminder(reminder);
    showBrowserNotification(reminder);

    const existing = document.getElementById(
        "medicineReminderPopup"
    );

    if (existing) existing.remove();

    const popup = document.createElement("div");

    popup.id = "medicineReminderPopup";

    popup.style.cssText = `
        position: fixed;
        z-index: 99999;
        top: 20px;
        right: 20px;
        width: min(340px, calc(100vw - 40px));
        padding: 20px;
        background: white;
        color: #172033;
        border: 2px solid #2563eb;
        border-radius: 14px;
        box-shadow: 0 8px 30px rgba(0,0,0,0.2);
        font-family: Arial, sans-serif;
    `;

    const heading = document.createElement("h3");
    heading.textContent = "⏰ Medicine Reminder";

    const medicine = document.createElement("p");
    medicine.textContent =
        `Medicine: ${reminder.medicine_name}`;

    const time = document.createElement("p");
    time.textContent =
        `Scheduled time: ${reminder.reminder_time}`;

    const message = document.createElement("p");
    message.textContent =
        "Please check your medicine instructions.";

    const taken = createPopupButton(
        "Taken",
        "#15803d",
        async () => {
            const success = await updateReminder(
                reminder.id,
                "Taken"
            );

            if (success) closePopup();
        }
    );

    const skip = createPopupButton(
        "Skip",
        "#64748b",
        async () => {
            const success = await updateReminder(
                reminder.id,
                "Skipped"
            );

            if (success) closePopup();
        }
    );

    const later = createPopupButton(
        "Remind Me Later (5 min)",
        "#2563eb",
        () => {
            closePopup();

            const oldTimer = snoozeTimers.get(reminder.id);

            if (oldTimer) clearTimeout(oldTimer);

            const timer = setTimeout(() => {
                showReminderAlert(reminder);
                snoozeTimers.delete(reminder.id);
            }, 5 * 60 * 1000);

            snoozeTimers.set(reminder.id, timer);
        }
    );

    popup.append(
        heading,
        medicine,
        time,
        message,
        taken,
        later,
        skip
    );

    document.body.appendChild(popup);

    function closePopup() {
        popup.remove();
    }
}

/* =====================================
   UPDATE REMINDER STATUS
===================================== */

async function updateReminder(id, status) {
    try {
        const response = await fetch(
            `${REMINDER_API_BASE}/update_reminder/${id}`,
            {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ status })
            }
        );

        const result = await response.json();

        if (!response.ok) {
            throw new Error(
                result.error || "Could not update reminder."
            );
        }

        if (typeof loadReminders === "function") {
            await loadReminders();
        }

        return true;

    } catch (error) {
        console.error("Update reminder error:", error);
        alert(error.message);
        return false;
    }
}

/* =====================================
   DATE HELPERS
===================================== */

function getTodayKey() {
    const now = new Date();

    return [
        now.getFullYear(),
        String(now.getMonth() + 1).padStart(2, "0"),
        String(now.getDate()).padStart(2, "0")
    ].join("-");
}

function getReminderKey(reminder) {
    return `${reminder.id}-${getTodayKey()}`;
}

function isReminderDue(reminder, now) {
    if (reminder.status !== "Pending") return false;

    const currentDate = getTodayKey();

    const currentTime =
        String(now.getHours()).padStart(2, "0") +
        ":" +
        String(now.getMinutes()).padStart(2, "0");

    const scheduledTime = String(
        reminder.reminder_time || ""
    ).slice(0, 5);

    if (scheduledTime !== currentTime) return false;

    if (reminder.repeat_type === "daily") {
        return true;
    }

    if (reminder.repeat_type === "weekly") {
        const weekday = [
            "Sunday",
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday"
        ][now.getDay()];

        return (reminder.weekdays || "")
            .split(",")
            .map(day => day.trim())
            .includes(weekday);
    }

    return reminder.reminder_date === currentDate;
}

/* =====================================
   ALERT HISTORY
===================================== */

function loadAlertHistory() {
    try {
        const saved = JSON.parse(
            localStorage.getItem(ALERT_STORAGE_KEY) || "[]"
        );

        saved.forEach(key => alertedReminders.add(key));
    } catch (error) {
        console.error("Alert history error:", error);
    }
}

function saveAlertHistory() {
    localStorage.setItem(
        ALERT_STORAGE_KEY,
        JSON.stringify([...alertedReminders])
    );
}

/* =====================================
   CHECK REMINDERS
===================================== */

async function checkMedicineReminders() {
    if (reminderCheckRunning) return;

    reminderCheckRunning = true;

    try {
        const response = await fetch(
            `${REMINDER_API_BASE}/reminders`
        );

        if (!response.ok) {
            throw new Error("Could not check reminders.");
        }

        const reminders = await response.json();
        const now = new Date();

        reminders.forEach(reminder => {
            const key = getReminderKey(reminder);

            if (
                isReminderDue(reminder, now) &&
                !alertedReminders.has(key)
            ) {
                alertedReminders.add(key);
                saveAlertHistory();

                showReminderAlert(reminder);
            }
        });

    } catch (error) {
        console.error("Reminder check error:", error);
    } finally {
        reminderCheckRunning = false;
    }
}

/* =====================================
   REMINDER CONTROLS
===================================== */

function setupReminderAlertControls() {
    if (document.getElementById("reminderAlertControls")) {
        updateSoundButton();
        updateVoiceButton();
        return;
    }

    const container = document.createElement("div");

    container.id = "reminderAlertControls";

    container.style.cssText = `
        position: fixed;
        bottom: 15px;
        right: 15px;
        z-index: 99999;
        display: flex;
        flex-direction: column;
        gap: 8px;
    `;

    const soundButton = createPopupButton(
        soundEnabled
            ? "🔊 Reminder Sound Saved"
            : "🔊 Enable Reminder Sound",
        "#2563eb",
        enableReminderSound
    );

    soundButton.id = "enableReminderSoundButton";

    const voiceButton = createPopupButton(
        voiceEnabled
            ? "🗣️ Voice Reminders: ON"
            : "🗣️ Voice Reminders: OFF",
        "#7c3aed",
        toggleReminderVoice
    );

    voiceButton.id = "reminderVoiceButton";

    const notificationButton = createPopupButton(
        "🔔 Enable Notifications",
        "#475569",
        enableReminderNotifications
    );

    const testButton = createPopupButton(
        "▶ Test Sound & Voice",
        "#15803d",
        () => {
            if (!soundEnabled) {
                alert("Please enable reminder sound first.");
                return;
            }

            playReminderSound();

            speakMedicineReminder({
                medicine_name: "Test Medicine"
            });
        }
    );

    container.append(
        soundButton,
        voiceButton,
        notificationButton,
        testButton
    );

    document.body.appendChild(container);
}

function updateSoundButton() {
    const button = document.getElementById(
        "enableReminderSoundButton"
    );

    if (button) {
        button.textContent = soundEnabled
            ? "🔊 Reminder Sound Saved"
            : "🔊 Enable Reminder Sound";
    }
}

/* =====================================
   START REMINDER SYSTEM
===================================== */

function startReminderSystem() {
    loadAlertHistory();

    setupSoundRestore();
    setupReminderAlertControls();

    checkMedicineReminders();

    if (reminderCheckInterval) {
        clearInterval(reminderCheckInterval);
    }

    reminderCheckInterval = setInterval(
        checkMedicineReminders,
        5000
    );
}

if (document.readyState === "loading") {
    document.addEventListener(
        "DOMContentLoaded",
        startReminderSystem,
        { once: true }
    );
} else {
    startReminderSystem();
}
