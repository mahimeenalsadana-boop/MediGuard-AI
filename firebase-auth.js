import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-app.js";

import {
    getAuth,
    RecaptchaVerifier,
    signInWithPhoneNumber,
    onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/11.6.0/firebase-auth.js";

import { firebaseConfig } from "./firebase-config.js";

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// HTML elements
const phoneInput = document.getElementById("familyPhone");
const sendOtpButton = document.getElementById("sendOtpButton");
const otpSection = document.getElementById("otpSection");
const otpInput = document.getElementById("familyOtp");
const verifyOtpButton = document.getElementById("verifyOtpButton");
const authMessage = document.getElementById("authMessage");

let confirmationResult = null;
let recaptchaVerifier = null;

function showMessage(message) {
    if (authMessage) {
        authMessage.textContent = message;
    }
}

function setupRecaptcha() {
    if (recaptchaVerifier) {
        recaptchaVerifier.clear();
    }

    recaptchaVerifier = new RecaptchaVerifier(
        auth,
        "recaptcha-container",
        {
            size: "normal",
            callback: () => {
                showMessage("reCAPTCHA verified. You can request your OTP.");
            },
            "expired-callback": () => {
                showMessage("reCAPTCHA expired. Please verify again.");
            }
        }
    );
}

// Send OTP
if (sendOtpButton) {
    sendOtpButton.addEventListener("click", async () => {
        const phoneNumber = phoneInput?.value.trim() || "";

        if (!/^\+[1-9]\d{7,14}$/.test(phoneNumber)) {
            showMessage("Enter a valid phone number with country code, e.g. +91XXXXXXXXXX.");
            return;
        }

        sendOtpButton.disabled = true;
        showMessage("Preparing phone verification...");

        try {
            setupRecaptcha();
            await recaptchaVerifier.render();

            confirmationResult = await signInWithPhoneNumber(
                auth,
                phoneNumber,
                recaptchaVerifier
            );

            if (otpSection) {
                otpSection.hidden = false;
            }

            showMessage("OTP sent. Check your phone.");

        } catch (error) {
            console.error("OTP sending error:", error);
            showMessage(error.message || "Could not send OTP. Please try again.");

            if (recaptchaVerifier) {
                recaptchaVerifier.clear();
                recaptchaVerifier = null;
            }
        } finally {
            sendOtpButton.disabled = false;
        }
    });
}

// Verify OTP
if (verifyOtpButton) {
    verifyOtpButton.addEventListener("click", async () => {
        const otp = otpInput?.value.trim() || "";

        if (!confirmationResult) {
            showMessage("Please request an OTP first.");
            return;
        }

        if (!/^\d{6}$/.test(otp)) {
            showMessage("Please enter the 6-digit OTP.");
            return;
        }

        verifyOtpButton.disabled = true;
        showMessage("Verifying OTP...");

        try {
            const result = await confirmationResult.confirm(otp);

            showMessage("Phone number verified successfully!");
            console.log("Verified Firebase user:", result.user.uid);

            if (otpSection) otpSection.hidden = true;
            if (phoneInput) phoneInput.disabled = true;
            sendOtpButton.disabled = true;

        } catch (error) {
            console.error("OTP verification error:", error);
            showMessage("OTP verification failed. Check the code and try again.");
        } finally {
            verifyOtpButton.disabled = false;
        }
    });
}

// Check Firebase login state
onAuthStateChanged(auth, (user) => {
    if (user) {
        console.log("Firebase user is signed in.");
    } else {
        console.log("No Firebase user is signed in.");
    }
});