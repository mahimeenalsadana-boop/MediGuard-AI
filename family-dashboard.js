
(() => {
  "use strict";

  // DEMO LOGIN
  const DEMO_EMAIL = "demo@mediguard.com";
  const DEMO_PASSWORD = "MediGuard123";

  // Priya is the normal patient dashboard user
  const PATIENT_ID = 2;

  const MEMBERS_KEY = "mediguard_family_members";
  const MESSAGES_KEY = "mediguard_family_messages";
  const VOICE_KEY = "mediguard_voice_enabled";

  let members = loadData(MEMBERS_KEY, [
    { id: 1, name: "Rajesh", email: "rajesh@example.com" },
    { id: 2, name: "Priya", email: "priya@example.com" },
    { id: 3, name: "Aarav", email: "aarav@example.com" }
  ]);

  let messages = loadData(MESSAGES_KEY, []);
  let currentMemberId = null;

  let voiceAlertsEnabled =
    localStorage.getItem(VOICE_KEY) === "true";

  const announcedMessageIds = new Set();

  // -----------------------------
  // STORAGE HELPERS
  // -----------------------------

  function loadData(key, fallback) {
    try {
      const saved = localStorage.getItem(key);
      return saved ? JSON.parse(saved) : fallback;
    } catch (error) {
      console.error("Storage loading error:", error);
      return fallback;
    }
  }

  function saveData() {
    localStorage.setItem(MEMBERS_KEY, JSON.stringify(members));
    localStorage.setItem(MESSAGES_KEY, JSON.stringify(messages));
  }

  function escapeHTML(value) {
    return String(value).replace(/[&<>"']/g, character => ({
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#039;"
    })[character]);
  }

  function getMember(id) {
    return members.find(member => member.id === Number(id));
  }

  function getUnreadMessages(memberId) {
    return messages.filter(message =>
      message.toId === Number(memberId) && !message.read
    );
  }

  function showMessage(elementId, message, color = "red") {
    const element = document.getElementById(elementId);
    if (!element) return;

    element.textContent = message;
    element.style.color = color;
  }

  // -----------------------------
  // FAMILY LOGIN
  // -----------------------------

  function setupLogin() {
    const loginButton = document.getElementById("familyLoginButton");
    if (!loginButton) return;

    loginButton.addEventListener("click", () => {
      const email =
        document.getElementById("familyEmail")?.value.trim();

      const password =
        document.getElementById("familyPassword")?.value;

      if (email === DEMO_EMAIL && password === DEMO_PASSWORD) {
        const loginBox = document.getElementById("familyLoginBox");
        const dashboard =
          document.getElementById("familyDashboardContent");

        if (loginBox) loginBox.hidden = true;
        if (dashboard) dashboard.hidden = false;

        showMessage("familyLoginMessage", "");
        renderFamilyDashboard();
      } else {
        showMessage(
          "familyLoginMessage",
          "Invalid demo login. Please check your credentials."
        );
      }
    });
  }

  // -----------------------------
  // FAMILY DASHBOARD
  // -----------------------------

  function renderFamilyDashboard() {
    const count = document.getElementById("familyMemberCount");
    const medicineCount =
      document.getElementById("familyMedicineCount");
    const pendingCount =
      document.getElementById("familyPendingCount");

    if (count) count.textContent = members.length;
    if (medicineCount) medicineCount.textContent = "3";

    if (pendingCount) {
      pendingCount.textContent =
        messages.filter(message => !message.read).length;
    }

    const list = document.getElementById("familyMemberList");

    if (list) {
      list.innerHTML = members.map(member => {
        const unread = getUnreadMessages(member.id).length;

        return `
          <div style="border:1px solid #ddd;padding:12px;margin:10px 0;border-radius:10px;">
            <strong>${escapeHTML(member.name)}</strong>
            <p>${escapeHTML(member.email)}</p>
            <p>Unread messages: ${unread}</p>

            <button type="button" data-open-member="${member.id}">
              View Portal
            </button>

            <button type="button" data-remove-member="${member.id}">
              Remove
            </button>
          </div>
        `;
      }).join("");

      list.querySelectorAll("[data-open-member]").forEach(button => {
        button.addEventListener("click", () => {
          openMemberPortal(Number(button.dataset.openMember));
        });
      });

      list.querySelectorAll("[data-remove-member]").forEach(button => {
        button.addEventListener("click", () => {
          removeMember(Number(button.dataset.removeMember));
        });
      });
    }

    renderRefillAlerts();
  }

  function renderRefillAlerts() {
    const container =
      document.getElementById("familyRefillAlerts");

    if (!container) return;

    container.innerHTML = `
      <p>Demo refill alert: Please review medicine stock for family members.</p>
      <small>This is sample information, not a real stock check.</small>
    `;
  }

  // -----------------------------
  // ADD / REMOVE MEMBERS
  // -----------------------------

  function setupAddMember() {
    const button = document.getElementById("addFamilyMember");
    if (!button) return;

    button.addEventListener("click", () => {
      const nameInput =
        document.getElementById("newFamilyName");

      const emailInput =
        document.getElementById("newFamilyEmail");

      const name = nameInput?.value.trim();
      const email = emailInput?.value.trim();

      if (!name || !email) {
        showMessage(
          "familyAddMessage",
          "Please enter both name and email."
        );
        return;
      }

      if (members.some(member =>
        member.email.toLowerCase() === email.toLowerCase()
      )) {
        showMessage(
          "familyAddMessage",
          "This email is already added."
        );
        return;
      }

      members.push({
        id: Date.now(),
        name,
        email
      });

      saveData();

      nameInput.value = "";
      emailInput.value = "";

      showMessage(
        "familyAddMessage",
        "Family member added successfully.",
        "green"
      );

      renderFamilyDashboard();
    });
  }

  function removeMember(memberId) {
    if (memberId === PATIENT_ID) {
      alert("The demo patient account cannot be removed.");
      return;
    }

    members = members.filter(member => member.id !== memberId);

    messages = messages.filter(message =>
      message.fromId !== memberId &&
      message.toId !== memberId
    );

    saveData();
    renderFamilyDashboard();
  }

  // -----------------------------
  // MEMBER PORTAL
  // -----------------------------

  function openMemberPortal(memberId) {
    const member = getMember(memberId);
    if (!member) return;

    currentMemberId = memberId;

    let portal =
      document.getElementById("familyMemberPortal");

    if (!portal) {
      portal = document.createElement("div");
      portal.id = "familyMemberPortal";

      portal.style.cssText =
        "margin-top:20px;padding:16px;border:1px solid #ccc;border-radius:12px;";

      document.getElementById("familyDashboardContent")
        ?.appendChild(portal);
    }

    renderPortal(member);
    portal.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });
  }

  function renderPortal(member) {
    const portal =
      document.getElementById("familyMemberPortal");

    if (!portal) return;

    const inbox = messages.filter(message =>
      message.toId === member.id
    );

    const sent = messages.filter(message =>
      message.fromId === member.id
    );

    const otherMembers = members.filter(other =>
      other.id !== member.id
    );

    portal.innerHTML = `
      <h3>${escapeHTML(member.name)}'s Family Portal</h3>

      <h4>Send a Message</h4>

      <label for="messageReceiver">Send to:</label>

      <select id="messageReceiver">
        ${otherMembers.map(other => `
          <option value="${other.id}">
            ${escapeHTML(other.name)}
          </option>
        `).join("")}
      </select>

      <textarea
        id="familyMessageText"
        rows="3"
        placeholder="Write your family message..."
        style="width:100%;margin-top:8px;"
      ></textarea>

      <button type="button" id="sendFamilyMessage">
        Send Message
      </button>

      <p id="familyMessageStatus" aria-live="polite"></p>

      <hr>

      <h4>Inbox</h4>

      <div>
        ${inbox.length ? inbox.map(message => {
          const sender = getMember(message.fromId);

          return `
            <div style="padding:10px;margin:8px 0;border:1px solid #ddd;border-radius:8px;">
              <strong>From: ${escapeHTML(sender?.name || "Family member")}</strong>
              <p>${escapeHTML(message.text)}</p>
              <small>${escapeHTML(message.time)}</small>
              <p>${message.read ? "Read" : "Unread"}</p>

              ${message.read ? "" : `
                <button type="button" data-mark-read="${message.id}">
                  Mark as Read
                </button>
              `}
            </div>
          `;
        }).join("") : "<p>No messages received yet.</p>"}
      </div>

      <hr>

      <h4>Sent Messages</h4>

      <div>
        ${sent.length ? sent.map(message => {
          const receiver = getMember(message.toId);

          return `
            <div style="padding:10px;margin:8px 0;border:1px solid #ddd;border-radius:8px;">
              <strong>To: ${escapeHTML(receiver?.name || "Family member")}</strong>
              <p>${escapeHTML(message.text)}</p>
              <small>${escapeHTML(message.time)}</small>
            </div>
          `;
        }).join("") : "<p>No sent messages yet.</p>"}
      </div>

      <button type="button" id="closeMemberPortal">
        Back to Family Dashboard
      </button>
    `;

    document.getElementById("sendFamilyMessage")
      ?.addEventListener("click", () => {
        sendFamilyMessage(member);
      });

    document.getElementById("closeMemberPortal")
      ?.addEventListener("click", () => {
        portal.remove();
        currentMemberId = null;
      });

    portal.querySelectorAll("[data-mark-read]")
      .forEach(button => {
        button.addEventListener("click", () => {
          markMessageRead(Number(button.dataset.markRead));
          renderPortal(member);
          renderFamilyDashboard();
        });
      });
  }

  // -----------------------------
  // SEND MESSAGE
  // -----------------------------

  function sendFamilyMessage(sender) {
    const receiverId = Number(
      document.getElementById("messageReceiver")?.value
    );

    const text =
      document.getElementById("familyMessageText")?.value.trim();

    if (!receiverId || !text) {
      showMessage(
        "familyMessageStatus",
        "Choose a recipient and write a message."
      );
      return;
    }

    const receiver = getMember(receiverId);

    if (!receiver) {
      showMessage(
        "familyMessageStatus",
        "Recipient not found."
      );
      return;
    }

    messages.push({
      id: Date.now(),
      fromId: sender.id,
      toId: receiverId,
      text,
      time: new Date().toLocaleString(),
      read: false
    });

    saveData();

    showMessage(
      "familyMessageStatus",
      "Message sent successfully.",
      "green"
    );

    renderPortal(sender);
    renderFamilyDashboard();
    renderPatientNotifications();
  }

  function markMessageRead(messageId) {
    const message = messages.find(item =>
      item.id === messageId
    );

    if (!message) return;

    message.read = true;
    saveData();

    renderPatientNotifications();
  }

  // -----------------------------
  // PATIENT DASHBOARD MESSAGES
  // -----------------------------

  function renderPatientNotifications() {
    const dashboard = document.getElementById("dashboard");
    if (!dashboard) return;

    let panel =
      document.getElementById("patientFamilyMessages");

    if (!panel) {
      panel = document.createElement("div");
      panel.id = "patientFamilyMessages";

      panel.style.cssText =
        "margin:20px 0;padding:16px;border:1px solid #ccc;border-radius:12px;background:#fff;";

      dashboard.appendChild(panel);
    }

    const received = messages.filter(message =>
      message.toId === PATIENT_ID
    );

    panel.innerHTML = `
      <h3>Family Messages</h3>

      <p>Messages received from your family members appear here.</p>

      <button type="button" id="enableFamilyVoice">
        ${voiceAlertsEnabled ? "Voice Alerts Enabled" : "Enable Voice Alerts"}
      </button>

      <p id="patientVoiceStatus" aria-live="polite">
        ${voiceAlertsEnabled
          ? "Voice alerts are enabled."
          : "Enable voice alerts to hear incoming messages."}
      </p>

      <div>
        ${received.length ? received.slice().reverse().map(message => {
          const sender = getMember(message.fromId);

          return `
            <div style="padding:12px;margin:10px 0;border:1px solid #ddd;border-radius:8px;">
              <strong>From: ${escapeHTML(sender?.name || "Family member")}</strong>
              <p>${escapeHTML(message.text)}</p>
              <small>${escapeHTML(message.time)}</small>
              <p>${message.read ? "Read" : "Unread"}</p>

              ${message.read ? "" : `
                <button type="button" data-patient-read="${message.id}">
                  Mark as Read
                </button>
              `}
            </div>
          `;
        }).join("") : "<p>No family messages yet.</p>"}
      </div>
    `;

    document.getElementById("enableFamilyVoice")
      ?.addEventListener("click", enableVoiceAlerts);

    panel.querySelectorAll("[data-patient-read]")
      .forEach(button => {
        button.addEventListener("click", () => {
          markMessageRead(Number(button.dataset.patientRead));
          renderPatientNotifications();
        });
      });
  }

  // -----------------------------
  // VOICE ANNOUNCEMENTS
  // -----------------------------

  function enableVoiceAlerts() {
    if (!("speechSynthesis" in window)) {
      showMessage(
        "patientVoiceStatus",
        "Voice announcements are not supported by this browser."
      );
      return;
    }

    voiceAlertsEnabled = true;

    localStorage.setItem(VOICE_KEY, "true");

    const status =
      document.getElementById("patientVoiceStatus");

    if (status) {
      status.textContent =
        "Voice alerts enabled. New messages will be announced.";
      status.style.color = "green";
    }

    renderPatientNotifications();
    announcePendingMessages();
  }

  function announceMessage(senderName, messageText) {
    if (!voiceAlertsEnabled) return;
    if (!("speechSynthesis" in window)) return;

    window.speechSynthesis.cancel();

    const announcement = new SpeechSynthesisUtterance(
      `New message from ${senderName}. The message says: ${messageText}`
    );

    announcement.lang = "en-IN";
    announcement.rate = 0.95;
    announcement.volume = 1;

    window.speechSynthesis.speak(announcement);
  }

  function isPatientDashboardVisible() {
    const dashboard =
      document.getElementById("dashboard");

    return Boolean(
      dashboard &&
      !dashboard.hidden &&
      dashboard.getClientRects().length > 0
    );
  }

  function announcePendingMessages() {
    if (!voiceAlertsEnabled) return;
    if (!isPatientDashboardVisible()) return;

    const pending = getUnreadMessages(PATIENT_ID);

    pending.forEach(message => {
      if (announcedMessageIds.has(message.id)) return;

      announcedMessageIds.add(message.id);

      const sender = getMember(message.fromId);

      announceMessage(
        sender?.name || "a family member",
        message.text
      );
    });
  }

  // -----------------------------
  // REFRESH / AUTO CHECK
  // -----------------------------

  function refreshPatientMessages() {
    messages = loadData(MESSAGES_KEY, []);
    members = loadData(MEMBERS_KEY, []);

    renderPatientNotifications();
    announcePendingMessages();
  }

  window.addEventListener("storage", event => {
    if (
      event.key === MESSAGES_KEY ||
      event.key === MEMBERS_KEY
    ) {
      refreshPatientMessages();
    }

    if (event.key === VOICE_KEY) {
      voiceAlertsEnabled = event.newValue === "true";
      renderPatientNotifications();
      announcePendingMessages();
    }
  });

  // -----------------------------
  // LOGOUT
  // -----------------------------

  function setupLogout() {
    const button =
      document.getElementById("familyLogoutButton");

    if (!button) return;

    button.addEventListener("click", () => {
      const loginBox =
        document.getElementById("familyLoginBox");

      const dashboard =
        document.getElementById("familyDashboardContent");

      if (loginBox) loginBox.hidden = false;
      if (dashboard) dashboard.hidden = true;

      const email = document.getElementById("familyEmail");
      const password = document.getElementById("familyPassword");

      if (email) email.value = "";
      if (password) password.value = "";

      document.getElementById("familyMemberPortal")?.remove();

      currentMemberId = null;
    });
  }

  // -----------------------------
  // START
  // -----------------------------

  function startFamilyDashboard() {
    setupLogin();
    setupAddMember();
    setupLogout();

    renderPatientNotifications();

    // Check for new messages every 1.5 seconds
    window.setInterval(refreshPatientMessages, 1500);
  }

  if (document.readyState === "loading") {
    document.addEventListener(
      "DOMContentLoaded",
      startFamilyDashboard
    );
  } else {
    startFamilyDashboard();
  }
})();
