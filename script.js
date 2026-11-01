const API_BASE = "http://127.0.0.1:5000";

/* =====================================
   MEDIGUARD AI - MULTI LANGUAGE SYSTEM
===================================== */

const translations = {
    en: {
        "Dashboard": "Dashboard",
        "My Medicines": "My Medicines",
        "Prescriptions": "Prescriptions",
        "Reminders": "Reminders",
        "AI Voice Assistant": "AI Voice Assistant",
        "Family Dashboard": "Family Dashboard",
        "Settings": "Settings",
        "Welcome to MediGuard AI": "Welcome to MediGuard AI",
        "Your Smart Medication Management Assistant": "Your Smart Medication Management Assistant",
        "Stay Safe. Stay Healthy.": "Stay Safe. Stay Healthy.",
        "Manage your medicines and reminders in one place.": "Manage your medicines and reminders in one place.",
        "Active Medicines": "Active Medicines",
        "Upcoming Doses": "Upcoming Doses",
        "Doses Taken": "Doses Taken",
        "Refill Alerts": "Refill Alerts",
        "📅 Today's Medication": "📅 Today's Medication",
        "No medicines scheduled for today.": "No medicines scheduled for today.",
        "Quick Actions": "Quick Actions",
        "➕ Add Medicine": "➕ Add Medicine",
        "⏰ Set Reminder": "⏰ Set Reminder",
        "📄 Scan Prescription": "📄 Scan Prescription",
        "🎙️ Voice Assistant": "🎙️ Voice Assistant",
        "💊 My Medicines": "💊 My Medicines",
        "Medicine Name": "Medicine Name",
        "Dosage": "Dosage",
        "Frequency": "Frequency",
        "Timing": "Timing",
        "Duration": "Duration",
        "Stock": "Stock",
        "Add Medicine": "Add Medicine",
        "Saved Medicines": "Saved Medicines",
        "📄 AI Prescription Scanner": "📄 AI Prescription Scanner",
        "Upload a prescription image to extract its written text.": "Upload a prescription image to extract its written text.",
        "Select Prescription Image": "Select Prescription Image",
        "Image Preview": "Image Preview",
        "🔍 Scan Prescription": "🔍 Scan Prescription",
        "Extracted Prescription Text": "Extracted Prescription Text",
        "Please verify all extracted information with a qualified healthcare professional. Unclear handwriting must not be guessed.": "Please verify all extracted information with a qualified healthcare professional. Unclear handwriting must not be guessed.",
        "⏰ Medicine Reminders": "⏰ Medicine Reminders",
        "Select Medicine": "Select Medicine",
        "Reminder Time": "Reminder Time",
        "Repeat": "Repeat",
        "Once": "Once",
        "Daily": "Daily",
        "Weekly": "Weekly",
        "Select Weekdays": "Select Weekdays",
        "Monday": "Monday",
        "Tuesday": "Tuesday",
        "Wednesday": "Wednesday",
        "Thursday": "Thursday",
        "Friday": "Friday",
        "Saturday": "Saturday",
        "Sunday": "Sunday",
        "Save Reminder": "Save Reminder",
        "All Reminders": "All Reminders",
        "🎙️ MediGuard AI Voice Assistant": "🎙️ MediGuard AI Voice Assistant",
        "Speak or type a message. You can edit your speech transcription before sending it.": "Speak or type a message. You can edit your speech transcription before sending it.",
        "🎤 Start Speaking": "🎤 Start Speaking",
        "Stop Speaking": "Stop Speaking",
        "Your Message": "Your Message",
        "🔊 Read Text Aloud": "🔊 Read Text Aloud",
        "Clear Text": "Clear Text",
        "Voice features depend on browser and device support.": "Voice features depend on browser and device support.",
        "👨‍👩‍👧 Family Dashboard": "👨‍👩‍👧 Family Dashboard",
        "Family sharing and permission-based access will be implemented in a future version.": "Family sharing and permission-based access will be implemented in a future version.",
        "MediGuard AI Settings": "MediGuard AI Settings",
        "More language, accessibility and notification settings will be added later.": "More language, accessibility and notification settings will be added later.",
        "© 2026 MediGuard AI | Student Project Prototype": "© 2026 MediGuard AI | Student Project Prototype",
        "This application is for medication tracking and educational purposes, not for diagnosis or treatment decisions.": "This application is for medication tracking and educational purposes, not for diagnosis or treatment decisions.",
        "Enter fictional test medicine name": "Enter fictional test medicine name",
        "Example: 1 tablet": "Example: 1 tablet",
        "Example: Twice daily": "Example: Twice daily",
        "Example: Morning and evening": "Example: Morning and evening",
        "Example: 5 days": "Example: 5 days",
        "Enter stock quantity": "Enter stock quantity",
        "Extracted text will appear here. You can edit it after scanning.": "Extracted text will appear here. You can edit it after scanning.",
        "Your spoken words will appear here...": "Your spoken words will appear here...",
        "No medicines added yet.": "No medicines added yet.",
        "No reminders saved yet.": "No reminders saved yet.",
        "Edit": "Edit",
        "Delete": "Delete",
        "Update stock": "Update stock",
        "Taken": "Taken",
        "Missed": "Missed",
        "Skipped": "Skipped",
        "Pending": "Pending",
        "Error": "Error",
        "Medicine added successfully.": "Medicine added successfully.",
        "Reminder saved.": "Reminder saved.",
        "Please select an image first.": "Please select an image first.",
        "Scanning image... please wait.": "Scanning image... please wait.",
        "Text extracted. Please verify it carefully; OCR can make mistakes.": "Text extracted. Please verify it carefully; OCR can make mistakes.",
        "Image selected successfully.": "Image selected successfully.",
        "Please select an image file.": "Please select an image file.",
        "Image size must be below 5 MB.": "Image size must be below 5 MB.",
        "Listening...": "Listening...",
        "Stopped listening.": "Stopped listening.",
        "You can edit the transcription.": "You can edit the transcription.",
        "Enter some text first.": "Enter some text first.",
        "Reading text aloud.": "Reading text aloud.",
        "Text cleared.": "Text cleared."
    },

    hi: {
        "Dashboard": "डैशबोर्ड",
        "My Medicines": "मेरी दवाइयाँ",
        "Prescriptions": "प्रिस्क्रिप्शन",
        "Reminders": "रिमाइंडर",
        "AI Voice Assistant": "AI वॉइस असिस्टेंट",
        "Family Dashboard": "परिवार डैशबोर्ड",
        "Settings": "सेटिंग्स",
        "Welcome to MediGuard AI": "MediGuard AI में आपका स्वागत है",
        "Your Smart Medication Management Assistant": "आपका स्मार्ट दवा प्रबंधन सहायक",
        "Stay Safe. Stay Healthy.": "सुरक्षित रहें। स्वस्थ रहें।",
        "Manage your medicines and reminders in one place.": "अपनी दवाइयों और रिमाइंडर को एक जगह संभालें।",
        "Active Medicines": "चालू दवाइयाँ",
        "Upcoming Doses": "आने वाली खुराक",
        "Doses Taken": "ली गई खुराक",
        "Refill Alerts": "दवा दोबारा लेने के अलर्ट",
        "📅 Today's Medication": "📅 आज की दवाइयाँ",
        "No medicines scheduled for today.": "आज के लिए कोई दवा निर्धारित नहीं है।",
        "Quick Actions": "त्वरित कार्य",
        "➕ Add Medicine": "➕ दवा जोड़ें",
        "⏰ Set Reminder": "⏰ रिमाइंडर सेट करें",
        "📄 Scan Prescription": "📄 प्रिस्क्रिप्शन स्कैन करें",
        "🎙️ Voice Assistant": "🎙️ वॉइस असिस्टेंट",
        "💊 My Medicines": "💊 मेरी दवाइयाँ",
        "Medicine Name": "दवा का नाम",
        "Dosage": "खुराक",
        "Frequency": "कितनी बार",
        "Timing": "समय",
        "Duration": "अवधि",
        "Stock": "दवा की मात्रा",
        "Add Medicine": "दवा जोड़ें",
        "Saved Medicines": "सेव की गई दवाइयाँ",
        "📄 AI Prescription Scanner": "📄 AI प्रिस्क्रिप्शन स्कैनर",
        "Upload a prescription image to extract its written text.": "लिखा हुआ टेक्स्ट निकालने के लिए प्रिस्क्रिप्शन की फोटो अपलोड करें।",
        "Select Prescription Image": "प्रिस्क्रिप्शन की फोटो चुनें",
        "Image Preview": "फोटो का पूर्वावलोकन",
        "🔍 Scan Prescription": "🔍 प्रिस्क्रिप्शन स्कैन करें",
        "Extracted Prescription Text": "निकाला गया प्रिस्क्रिप्शन टेक्स्ट",
        "Please verify all extracted information with a qualified healthcare professional. Unclear handwriting must not be guessed.": "निकाली गई जानकारी किसी योग्य स्वास्थ्य विशेषज्ञ से जाँचें। अस्पष्ट लिखावट का अनुमान न लगाएँ।",
        "⏰ Medicine Reminders": "⏰ दवा रिमाइंडर",
        "Select Medicine": "दवा चुनें",
        "Reminder Time": "रिमाइंडर का समय",
        "Repeat": "दोहराएँ",
        "Once": "एक बार",
        "Daily": "रोज़ाना",
        "Weekly": "हर सप्ताह",
        "Select Weekdays": "दिन चुनें",
        "Monday": "सोमवार",
        "Tuesday": "मंगलवार",
        "Wednesday": "बुधवार",
        "Thursday": "गुरुवार",
        "Friday": "शुक्रवार",
        "Saturday": "शनिवार",
        "Sunday": "रविवार",
        "Save Reminder": "रिमाइंडर सेव करें",
        "All Reminders": "सभी रिमाइंडर",
        "🎙️ MediGuard AI Voice Assistant": "🎙️ MediGuard AI वॉइस असिस्टेंट",
        "Speak or type a message. You can edit your speech transcription before sending it.": "बोलें या संदेश लिखें। भेजने से पहले आप लिखे गए शब्दों को बदल सकते हैं।",
        "🎤 Start Speaking": "🎤 बोलना शुरू करें",
        "Stop Speaking": "बोलना बंद करें",
        "Your Message": "आपका संदेश",
        "🔊 Read Text Aloud": "🔊 टेक्स्ट सुनें",
        "Clear Text": "टेक्स्ट साफ़ करें",
        "Voice features depend on browser and device support.": "वॉइस सुविधा आपके ब्राउज़र और डिवाइस पर निर्भर करती है।",
        "👨‍👩‍👧 Family Dashboard": "👨‍👩‍👧 परिवार डैशबोर्ड",
        "Family sharing and permission-based access will be implemented in a future version.": "परिवार के साथ साझा करने की सुविधा भविष्य के संस्करण में आएगी।",
        "MediGuard AI Settings": "MediGuard AI सेटिंग्स",
        "More language, accessibility and notification settings will be added later.": "भाषा, सुविधा और नोटिफिकेशन की अन्य सेटिंग्स बाद में जोड़ी जाएँगी।",
        "© 2026 MediGuard AI | Student Project Prototype": "© 2026 MediGuard AI | छात्र प्रोजेक्ट प्रोटोटाइप",
        "This application is for medication tracking and educational purposes, not for diagnosis or treatment decisions.": "यह ऐप दवाइयों का रिकॉर्ड रखने और शैक्षिक उद्देश्य के लिए है, बीमारी की पहचान या इलाज के निर्णय के लिए नहीं।",
        "Enter fictional test medicine name": "टेस्ट दवा का नाम लिखें",
        "Example: 1 tablet": "उदाहरण: 1 गोली",
        "Example: Twice daily": "उदाहरण: दिन में दो बार",
        "Example: Morning and evening": "उदाहरण: सुबह और शाम",
        "Example: 5 days": "उदाहरण: 5 दिन",
        "Enter stock quantity": "दवा की मात्रा लिखें",
        "Extracted text will appear here. You can edit it after scanning.": "स्कैन किया गया टेक्स्ट यहाँ आएगा। आप इसे बदल सकते हैं।",
        "Your spoken words will appear here...": "आपके बोले हुए शब्द यहाँ आएँगे...",
        "No medicines added yet.": "अभी कोई दवा नहीं जोड़ी गई है।",
        "No reminders saved yet.": "अभी कोई रिमाइंडर सेव नहीं है।",
        "Edit": "बदलें",
        "Delete": "हटाएँ",
        "Update stock": "स्टॉक बदलें",
        "Taken": "ले ली",
        "Missed": "छूट गई",
        "Skipped": "छोड़ी गई",
        "Pending": "बाकी",
        "Error": "त्रुटि",
        "Medicine added successfully.": "दवा सफलतापूर्वक जोड़ दी गई।",
        "Reminder saved.": "रिमाइंडर सेव हो गया।",
        "Please select an image first.": "पहले फोटो चुनें।",
        "Scanning image... please wait.": "फोटो स्कैन हो रही है... कृपया प्रतीक्षा करें।",
        "Text extracted. Please verify it carefully; OCR can make mistakes.": "टेक्स्ट निकाल लिया गया है। कृपया जाँचें, स्कैन में गलती हो सकती है।",
        "Image selected successfully.": "फोटो सफलतापूर्वक चुनी गई।",
        "Please select an image file.": "कृपया फोटो फ़ाइल चुनें।",
        "Image size must be below 5 MB.": "फोटो का आकार 5 MB से कम होना चाहिए।",
        "Listening...": "सुन रहा है...",
        "Stopped listening.": "सुनना बंद कर दिया गया।",
        "You can edit the transcription.": "आप लिखे गए शब्दों को बदल सकते हैं।",
        "Enter some text first.": "पहले कुछ टेक्स्ट लिखें।",
        "Reading text aloud.": "टेक्स्ट पढ़ा जा रहा है।",
        "Text cleared.": "टेक्स्ट साफ़ कर दिया गया।"
    },

    pa: {
        "Dashboard": "ਡੈਸ਼ਬੋਰਡ",
        "My Medicines": "ਮੇਰੀਆਂ ਦਵਾਈਆਂ",
        "Prescriptions": "ਨੁਸਖ਼ੇ",
        "Reminders": "ਰਿਮਾਈਂਡਰ",
        "AI Voice Assistant": "AI ਵੌਇਸ ਅਸਿਸਟੈਂਟ",
        "Family Dashboard": "ਪਰਿਵਾਰ ਡੈਸ਼ਬੋਰਡ",
        "Settings": "ਸੈਟਿੰਗਾਂ",
        "Welcome to MediGuard AI": "MediGuard AI ਵਿੱਚ ਤੁਹਾਡਾ ਸਵਾਗਤ ਹੈ",
        "Your Smart Medication Management Assistant": "ਤੁਹਾਡਾ ਸਮਾਰਟ ਦਵਾਈ ਪ੍ਰਬੰਧਨ ਸਹਾਇਕ",
        "Stay Safe. Stay Healthy.": "ਸੁਰੱਖਿਅਤ ਰਹੋ। ਸਿਹਤਮੰਦ ਰਹੋ।",
        "Manage your medicines and reminders in one place.": "ਆਪਣੀਆਂ ਦਵਾਈਆਂ ਅਤੇ ਰਿਮਾਈਂਡਰ ਇੱਕ ਥਾਂ ਤੇ ਸੰਭਾਲੋ।",
        "Active Medicines": "ਚੱਲ ਰਹੀਆਂ ਦਵਾਈਆਂ",
        "Upcoming Doses": "ਆਉਣ ਵਾਲੀਆਂ ਖੁਰਾਕਾਂ",
        "Doses Taken": "ਲਈਆਂ ਖੁਰਾਕਾਂ",
        "Refill Alerts": "ਦਵਾਈ ਦੁਬਾਰਾ ਲੈਣ ਦੇ ਅਲਰਟ",
        "📅 Today's Medication": "📅 ਅੱਜ ਦੀਆਂ ਦਵਾਈਆਂ",
        "No medicines scheduled for today.": "ਅੱਜ ਲਈ ਕੋਈ ਦਵਾਈ ਤੈਅ ਨਹੀਂ ਹੈ।",
        "Quick Actions": "ਤੇਜ਼ ਕਾਰਵਾਈਆਂ",
        "➕ Add Medicine": "➕ ਦਵਾਈ ਜੋੜੋ",
        "⏰ Set Reminder": "⏰ ਰਿਮਾਈਂਡਰ ਲਗਾਓ",
        "📄 Scan Prescription": "📄 ਨੁਸਖ਼ਾ ਸਕੈਨ ਕਰੋ",
        "🎙️ Voice Assistant": "🎙️ ਵੌਇਸ ਅਸਿਸਟੈਂਟ",
        "💊 My Medicines": "💊 ਮੇਰੀਆਂ ਦਵਾਈਆਂ",
        "Medicine Name": "ਦਵਾਈ ਦਾ ਨਾਮ",
        "Dosage": "ਖੁਰਾਕ",
        "Frequency": "ਕਿੰਨੀ ਵਾਰ",
        "Timing": "ਸਮਾਂ",
        "Duration": "ਮਿਆਦ",
        "Stock": "ਦਵਾਈ ਦੀ ਮਾਤਰਾ",
        "Add Medicine": "ਦਵਾਈ ਜੋੜੋ",
        "Saved Medicines": "ਸੰਭਾਲੀਆਂ ਦਵਾਈਆਂ",
        "📄 AI Prescription Scanner": "📄 AI ਨੁਸਖ਼ਾ ਸਕੈਨਰ",
        "Upload a prescription image to extract its written text.": "ਲਿਖਿਆ ਟੈਕਸਟ ਕੱਢਣ ਲਈ ਨੁਸਖ਼ੇ ਦੀ ਤਸਵੀਰ ਅੱਪਲੋਡ ਕਰੋ।",
        "Select Prescription Image": "ਨੁਸਖ਼ੇ ਦੀ ਤਸਵੀਰ ਚੁਣੋ",
        "Image Preview": "ਤਸਵੀਰ ਦੀ ਝਲਕ",
        "🔍 Scan Prescription": "🔍 ਨੁਸਖ਼ਾ ਸਕੈਨ ਕਰੋ",
        "Extracted Prescription Text": "ਕੱਢਿਆ ਗਿਆ ਨੁਸਖ਼ੇ ਦਾ ਟੈਕਸਟ",
        "Please verify all extracted information with a qualified healthcare professional. Unclear handwriting must not be guessed.": "ਕੱਢੀ ਗਈ ਜਾਣਕਾਰੀ ਸਿਹਤ ਮਾਹਿਰ ਤੋਂ ਜਾਂਚਵਾਓ। ਅਸਪਸ਼ਟ ਲਿਖਾਈ ਦਾ ਅੰਦਾਜ਼ਾ ਨਾ ਲਗਾਓ।",
        "⏰ Medicine Reminders": "⏰ ਦਵਾਈ ਰਿਮਾਈਂਡਰ",
        "Select Medicine": "ਦਵਾਈ ਚੁਣੋ",
        "Reminder Time": "ਰਿਮਾਈਂਡਰ ਦਾ ਸਮਾਂ",
        "Repeat": "ਦੁਹਰਾਓ",
        "Once": "ਇੱਕ ਵਾਰ",
        "Daily": "ਰੋਜ਼ਾਨਾ",
        "Weekly": "ਹਫ਼ਤਾਵਾਰੀ",
        "Select Weekdays": "ਦਿਨ ਚੁਣੋ",
        "Monday": "ਸੋਮਵਾਰ",
        "Tuesday": "ਮੰਗਲਵਾਰ",
        "Wednesday": "ਬੁੱਧਵਾਰ",
        "Thursday": "ਵੀਰਵਾਰ",
        "Friday": "ਸ਼ੁੱਕਰਵਾਰ",
        "Saturday": "ਸ਼ਨੀਵਾਰ",
        "Sunday": "ਐਤਵਾਰ",
        "Save Reminder": "ਰਿਮਾਈਂਡਰ ਸੰਭਾਲੋ",
        "All Reminders": "ਸਾਰੇ ਰਿਮਾਈਂਡਰ",
        "🎙️ MediGuard AI Voice Assistant": "🎙️ MediGuard AI ਵੌਇਸ ਅਸਿਸਟੈਂਟ",
        "Speak or type a message. You can edit your speech transcription before sending it.": "ਬੋਲੋ ਜਾਂ ਸੁਨੇਹਾ ਲਿਖੋ। ਭੇਜਣ ਤੋਂ ਪਹਿਲਾਂ ਲਿਖੇ ਸ਼ਬਦ ਬਦਲ ਸਕਦੇ ਹੋ।",
        "🎤 Start Speaking": "🎤 ਬੋਲਣਾ ਸ਼ੁਰੂ ਕਰੋ",
        "Stop Speaking": "ਬੋਲਣਾ ਬੰਦ ਕਰੋ",
        "Your Message": "ਤੁਹਾਡਾ ਸੁਨੇਹਾ",
        "🔊 Read Text Aloud": "🔊 ਟੈਕਸਟ ਸੁਣੋ",
        "Clear Text": "ਟੈਕਸਟ ਸਾਫ਼ ਕਰੋ",
        "Voice features depend on browser and device support.": "ਵੌਇਸ ਸਹੂਲਤ ਬ੍ਰਾਊਜ਼ਰ ਅਤੇ ਡਿਵਾਈਸ ਉੱਤੇ ਨਿਰਭਰ ਕਰਦੀ ਹੈ।",
        "👨‍👩‍👧 Family Dashboard": "👨‍👩‍👧 ਪਰਿਵਾਰ ਡੈਸ਼ਬੋਰਡ",
        "Family sharing and permission-based access will be implemented in a future version.": "ਪਰਿਵਾਰ ਨਾਲ ਸਾਂਝਾ ਕਰਨ ਦੀ ਸਹੂਲਤ ਅਗਲੇ ਵਰਜਨ ਵਿੱਚ ਆਵੇਗੀ।",
        "MediGuard AI Settings": "MediGuard AI ਸੈਟਿੰਗਾਂ",
        "More language, accessibility and notification settings will be added later.": "ਹੋਰ ਭਾਸ਼ਾ ਅਤੇ ਨੋਟੀਫਿਕੇਸ਼ਨ ਸੈਟਿੰਗਾਂ ਬਾਅਦ ਵਿੱਚ ਜੋੜੀਆਂ ਜਾਣਗੀਆਂ।",
        "© 2026 MediGuard AI | Student Project Prototype": "© 2026 MediGuard AI | ਵਿਦਿਆਰਥੀ ਪ੍ਰੋਜੈਕਟ ਪ੍ਰੋਟੋਟਾਈਪ",
        "This application is for medication tracking and educational purposes, not for diagnosis or treatment decisions.": "ਇਹ ਐਪ ਦਵਾਈਆਂ ਦਾ ਰਿਕਾਰਡ ਰੱਖਣ ਅਤੇ ਸਿੱਖਿਆ ਲਈ ਹੈ, ਬਿਮਾਰੀ ਦੀ ਜਾਂਚ ਜਾਂ ਇਲਾਜ ਦੇ ਫੈਸਲੇ ਲਈ ਨਹੀਂ।",
        "Enter fictional test medicine name": "ਟੈਸਟ ਦਵਾਈ ਦਾ ਨਾਮ ਲਿਖੋ",
        "Example: 1 tablet": "ਉਦਾਹਰਨ: 1 ਗੋਲੀ",
        "Example: Twice daily": "ਉਦਾਹਰਨ: ਦਿਨ ਵਿੱਚ ਦੋ ਵਾਰ",
        "Example: Morning and evening": "ਉਦਾਹਰਨ: ਸਵੇਰੇ ਅਤੇ ਸ਼ਾਮ",
        "Example: 5 days": "ਉਦਾਹਰਨ: 5 ਦਿਨ",
        "Enter stock quantity": "ਦਵਾਈ ਦੀ ਮਾਤਰਾ ਲਿਖੋ",
        "Extracted text will appear here. You can edit it after scanning.": "ਸਕੈਨ ਕੀਤਾ ਟੈਕਸਟ ਇੱਥੇ ਆਵੇਗਾ। ਤੁਸੀਂ ਇਸਨੂੰ ਬਦਲ ਸਕਦੇ ਹੋ।",
        "Your spoken words will appear here...": "ਤੁਹਾਡੇ ਬੋਲੇ ਸ਼ਬਦ ਇੱਥੇ ਆਉਣਗੇ...",
        "No medicines added yet.": "ਹਾਲੇ ਕੋਈ ਦਵਾਈ ਨਹੀਂ ਜੋੜੀ ਗਈ।",
        "No reminders saved yet.": "ਹਾਲੇ ਕੋਈ ਰਿਮਾਈਂਡਰ ਨਹੀਂ ਹੈ।",
        "Edit": "ਬਦਲੋ",
        "Delete": "ਮਿਟਾਓ",
        "Update stock": "ਸਟਾਕ ਬਦਲੋ",
        "Taken": "ਲੈ ਲਈ",
        "Missed": "ਰਹਿ ਗਈ",
        "Skipped": "ਛੱਡ ਦਿੱਤੀ",
        "Pending": "ਬਾਕੀ",
        "Error": "ਗਲਤੀ",
        "Medicine added successfully.": "ਦਵਾਈ ਸਫਲਤਾਪੂਰਵਕ ਜੋੜੀ ਗਈ।",
        "Reminder saved.": "ਰਿਮਾਈਂਡਰ ਸੰਭਾਲਿਆ ਗਿਆ।",
        "Please select an image first.": "ਪਹਿਲਾਂ ਤਸਵੀਰ ਚੁਣੋ।",
        "Scanning image... please wait.": "ਤਸਵੀਰ ਸਕੈਨ ਹੋ ਰਹੀ ਹੈ... ਉਡੀਕ ਕਰੋ।",
        "Text extracted. Please verify it carefully; OCR can make mistakes.": "ਟੈਕਸਟ ਕੱਢ ਲਿਆ ਗਿਆ ਹੈ। ਧਿਆਨ ਨਾਲ ਜਾਂਚੋ, ਸਕੈਨ ਵਿੱਚ ਗਲਤੀ ਹੋ ਸਕਦੀ ਹੈ।",
        "Image selected successfully.": "ਤਸਵੀਰ ਚੁਣੀ ਗਈ ਹੈ।",
        "Please select an image file.": "ਕਿਰਪਾ ਕਰਕੇ ਤਸਵੀਰ ਚੁਣੋ।",
        "Image size must be below 5 MB.": "ਤਸਵੀਰ 5 MB ਤੋਂ ਛੋਟੀ ਹੋਣੀ ਚਾਹੀਦੀ ਹੈ।",
        "Listening...": "ਸੁਣ ਰਿਹਾ ਹੈ...",
        "Stopped listening.": "ਸੁਣਨਾ ਬੰਦ ਹੋ ਗਿਆ।",
        "You can edit the transcription.": "ਤੁਸੀਂ ਲਿਖੇ ਸ਼ਬਦ ਬਦਲ ਸਕਦੇ ਹੋ।",
        "Enter some text first.": "ਪਹਿਲਾਂ ਕੁਝ ਟੈਕਸਟ ਲਿਖੋ।",
        "Reading text aloud.": "ਟੈਕਸਟ ਪੜ੍ਹਿਆ ਜਾ ਰਿਹਾ ਹੈ।",
        "Text cleared.": "ਟੈਕਸਟ ਸਾਫ਼ ਕੀਤਾ ਗਿਆ।"
    }
};


/* =====================================
   CURRENT LANGUAGE
===================================== */

let currentLanguage =
    localStorage.getItem("mediguard_language") || "en";

function t(text) {
    return translations[currentLanguage]?.[text] || text;
}


/* =====================================
   TRANSLATE PAGE TEXT
===================================== */

function translatePage() {
    const dictionary = translations[currentLanguage] || translations.en;

    const walker = document.createTreeWalker(
        document.body,
        NodeFilter.SHOW_TEXT
    );

    let node;

    while ((node = walker.nextNode())) {
        const original = node.nodeValue.trim();

        if (dictionary[original]) {
            node.nodeValue = node.nodeValue.replace(
                original,
                dictionary[original]
            );
        }
    }

    document.querySelectorAll("[placeholder]").forEach(element => {
        const original = element.getAttribute("placeholder");

        if (dictionary[original]) {
            element.setAttribute("placeholder", dictionary[original]);
        }
    });

    document.documentElement.lang = currentLanguage;
}


/* =====================================
   LANGUAGE SELECTOR
===================================== */

function setupLanguageSelector() {
    const selector = document.getElementById("languageSelect");

    if (!selector) return;

    selector.value = currentLanguage;

    selector.addEventListener("change", () => {
        currentLanguage = selector.value;

        localStorage.setItem(
            "mediguard_language",
            currentLanguage
        );

        location.reload();
    });

    translatePage();
}


/* =====================================
   SPEECH LANGUAGE
===================================== */

function getSpeechLanguage() {
    const languages = {
        en: "en-IN",
        hi: "hi-IN",
        pa: "pa-IN"
    };

    return languages[currentLanguage] || "en-IN";
}


/* =====================================
   START APPLICATION
===================================== */

document.addEventListener("DOMContentLoaded", () => {
    setupLanguageSelector();

    loadMedicines();
    loadReminders();
    loadRefillAlerts();

    setupMedicineForm();
    setupReminderForm();
    setupPrescriptionScanner();
    setupVoiceAssistant();
});


/* =====================================
   MEDICINES
===================================== */

async function loadMedicines() {
    const list = document.getElementById("medicineList");
    const select = document.getElementById("medicine_id");

    try {
        const response = await fetch(`${API_BASE}/medicines`);

        if (!response.ok) {
            throw new Error("Could not load medicines.");
        }

        const medicines = await response.json();

        if (list) {
            list.innerHTML = "";

            if (!medicines.length) {
                list.textContent = t("No medicines added yet.");
            }

            medicines.forEach(m => {
                const card = document.createElement("div");
                card.className = "medicine-card";

                const title = document.createElement("h3");
                title.textContent = m.medicine_name;

                const details = document.createElement("p");
                details.textContent =
                    `${t("Dosage")}: ${m.dosage || "—"} | ` +
                    `${t("Frequency")}: ${m.frequency || "—"} | ` +
                    `${t("Timing")}: ${m.timing || "—"} | ` +
                    `${t("Duration")}: ${m.duration || "—"} | ` +
                    `${t("Stock")}: ${m.stock}`;

                const edit = document.createElement("button");
                edit.type = "button";
                edit.textContent = t("Edit");
                edit.addEventListener("click", () => editMedicine(m));

                const remove = document.createElement("button");
                remove.type = "button";
                remove.textContent = t("Delete");
                remove.addEventListener("click", () => deleteMedicine(m.id));

                const stock = document.createElement("button");
                stock.type = "button";
                stock.textContent = t("Update stock");
                stock.addEventListener("click", () => updateStock(m));

                card.append(title, details, edit, remove, stock);
                list.appendChild(card);
            });
        }

        if (select) {
            const previous = select.value;
            select.innerHTML = "";

            const defaultOption = document.createElement("option");
            defaultOption.value = "";
            defaultOption.textContent = t("Select Medicine");
            select.appendChild(defaultOption);

            medicines.forEach(m => {
                const option = document.createElement("option");
                option.value = m.id;
                option.textContent = m.medicine_name;
                select.appendChild(option);
            });

            if (medicines.some(m => String(m.id) === previous)) {
                select.value = previous;
            }
        }

        const active = document.getElementById("activeMedicines");

        if (active) {
            active.textContent = medicines.length;
        }

    } catch (error) {
        if (list) {
            list.textContent = `${t("Error")}: ${error.message}`;
        }

        console.error(error);
    }
}


function setupMedicineForm() {
    const form = document.getElementById("medicineForm");

    if (!form) return;

    form.addEventListener("submit", async event => {
        event.preventDefault();

        const message = document.getElementById("message");

        const payload = {
            medicine_name: document.getElementById("medicine_name").value.trim(),
            dosage: document.getElementById("dosage").value.trim(),
            frequency: document.getElementById("frequency").value.trim(),
            timing: document.getElementById("timing").value.trim(),
            duration: document.getElementById("duration").value.trim(),
            stock: document.getElementById("stock").value
        };

        try {
            const response = await fetch(`${API_BASE}/add_medicine`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload)
            });

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.error || "Could not add medicine.");
            }

            if (message) {
                message.textContent = t("Medicine added successfully.");
            }

            form.reset();

            await loadMedicines();
            await loadRefillAlerts();

        } catch (error) {
            if (message) message.textContent = error.message;
        }
    });
}


async function editMedicine(m) {
    const medicine_name = prompt("Medicine name:", m.medicine_name);
    if (medicine_name === null) return;

    const dosage = prompt(t("Dosage") + ":", m.dosage || "");
    if (dosage === null) return;

    const frequency = prompt(t("Frequency") + ":", m.frequency || "");
    if (frequency === null) return;

    const timing = prompt(t("Timing") + ":", m.timing || "");
    if (timing === null) return;

    const duration = prompt(t("Duration") + ":", m.duration || "");
    if (duration === null) return;

    const stock = prompt(t("Stock") + ":", m.stock);
    if (stock === null) return;

    try {
        const response = await fetch(`${API_BASE}/update_medicine/${m.id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                medicine_name,
                dosage,
                frequency,
                timing,
                duration,
                stock
            })
        });

        const result = await response.json();

        if (!response.ok) {
            throw new Error(result.error || "Update failed.");
        }

        await loadMedicines();
        await loadRefillAlerts();

    } catch (error) {
        alert(error.message);
    }
}


async function deleteMedicine(id) {
    if (!confirm(t("Delete") + "?")) return;

    try {
        const response = await fetch(`${API_BASE}/delete_medicine/${id}`, {
            method: "DELETE"
        });

        const result = await response.json();

        if (!response.ok) {
            throw new Error(result.error || "Delete failed.");
        }

        await loadMedicines();
        await loadReminders();
        await loadRefillAlerts();

    } catch (error) {
        alert(error.message);
    }
}


async function updateStock(m) {
    const stock = prompt(
        `${t("Update stock")} - ${m.medicine_name}:`,
        m.stock
    );

    if (stock === null) return;

    try {
        const response = await fetch(`${API_BASE}/update_stock/${m.id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ stock })
        });

        const result = await response.json();

        if (!response.ok) {
            throw new Error(result.error || "Stock update failed.");
        }

        await loadMedicines();
        await loadRefillAlerts();

    } catch (error) {
        alert(error.message);
    }
}


/* =====================================
   REMINDERS
===================================== */

function setupReminderForm() {
    const form = document.getElementById("reminderForm");

    if (!form) return;

    form.addEventListener("submit", async event => {
        event.preventDefault();

        const message = document.getElementById("reminderMessage");
        const repeat_type = document.getElementById("repeat_type").value;

        const weekdays = [
            ...document.querySelectorAll('input[name="weekdays"]:checked')
        ].map(x => x.value);

        const payload = {
            medicine_id: document.getElementById("medicine_id").value,
            reminder_time: document.getElementById("reminder_time").value,
            repeat_type,
            reminder_date: document.getElementById("reminder_date").value,
            weekdays
        };

        try {
            const response = await fetch(`${API_BASE}/add_reminder`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload)
            });

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.error || "Could not save reminder.");
            }

            if (message) {
                message.textContent = t("Reminder saved.");
            }

            form.reset();

            const repeat = document.getElementById("repeat_type");

            if (repeat) {
                repeat.value = "once";
                repeat.dispatchEvent(new Event("change"));
            }

            await loadReminders();

        } catch (error) {
            if (message) message.textContent = error.message;
        }
    });
}


/* =====================================
   LOAD AND DISPLAY REMINDERS
===================================== */

async function loadReminders() {
    const list = document.getElementById("reminderList");

    try {
        const response = await fetch(`${API_BASE}/reminders`);

        if (!response.ok) {
            throw new Error("Could not load reminders.");
        }

        const reminders = await response.json();

        if (list) {
            list.innerHTML = "";

            if (!reminders.length) {
                list.textContent = t("No reminders saved yet.");
            }

            reminders.forEach(r => {
                const card = document.createElement("div");
                card.className = "reminder-card";

                const title = document.createElement("h3");
                title.textContent = r.medicine_name;

                const details = document.createElement("p");
                details.textContent =
                    `${t("Reminder Time")}: ${r.reminder_time} | ` +
                    `${t("Repeat")}: ${t(
                        r.repeat_type === "daily" ? "Daily" :
                        r.repeat_type === "weekly" ? "Weekly" : "Once"
                    )} | ${t(r.status)}`;

                card.append(title, details);

                // STATUS BUTTONS
                ["Taken", "Missed", "Skipped", "Pending"].forEach(status => {
                    const button = document.createElement("button");
                    button.type = "button";
                    button.textContent = t(status);

                    button.addEventListener("click", () =>
                        updateReminderStatus(r.id, status)
                    );

                    card.appendChild(button);
                });

                // DELETE BUTTON
                const deleteButton = document.createElement("button");
                deleteButton.type = "button";
                deleteButton.textContent = `🗑️ ${t("Delete")}`;
                deleteButton.className = "delete-reminder-button";

                deleteButton.addEventListener("click", () => {
                    deleteReminder(r.id, r.medicine_name);
                });

                card.appendChild(deleteButton);

                list.appendChild(card);
            });
        }

        // UPCOMING DOSES
        const pending = document.getElementById("upcomingDoses");

        if (pending) {
            pending.textContent =
                reminders.filter(r => r.status === "Pending").length;
        }

        // DOSES TAKEN
        const taken = document.getElementById("dosesTaken");

        if (taken) {
            taken.textContent =
                reminders.filter(r => r.status === "Taken").length;
        }

        // TODAY'S MEDICATION
        const today = document.getElementById("todayMedication");

        if (today) {
            const day = new Date().toLocaleDateString("en-US", {
                weekday: "long"
            });

            const date = new Date().toLocaleDateString("en-CA");

            const todays = reminders.filter(r =>
                r.repeat_type === "daily" ||
                (
                    r.repeat_type === "weekly" &&
                    (r.weekdays || "").split(",").includes(day)
                ) ||
                (
                    (r.repeat_type || "once") === "once" &&
                    r.reminder_date === date
                )
            );

            today.textContent = todays.length
                ? todays.map(r =>
                    `${r.reminder_time} — ${r.medicine_name} (${t(r.status)})`
                  ).join(" | ")
                : t("No medicines scheduled for today.");
        }

    } catch (error) {
        if (list) {
            list.textContent = `${t("Error")}: ${error.message}`;
        }

        console.error(error);
    }
}


/* =====================================
   DELETE REMINDER
===================================== */

async function deleteReminder(id, medicineName) {
    const confirmed = confirm(
        `Are you sure you want to delete the reminder for ${medicineName}?`
    );

    if (!confirmed) return;

    try {
        const response = await fetch(
            `${API_BASE}/delete_reminder/${id}`,
            {
                method: "DELETE"
            }
        );

        const result = await response.json();

        if (!response.ok) {
            throw new Error(
                result.error || "Could not delete reminder."
            );
        }

        await loadReminders();

        alert("Reminder deleted successfully.");

    } catch (error) {
        alert(error.message);
        console.error("Delete reminder error:", error);
    }
}


/* =====================================
   UPDATE REMINDER STATUS
===================================== */

async function updateReminderStatus(id, status) {
    try {
        const response = await fetch(`${API_BASE}/update_reminder/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ status })
        });

        const result = await response.json();

        if (!response.ok) {
            throw new Error(result.error || "Could not update reminder.");
        }

        await loadReminders();

    } catch (error) {
        alert(error.message);
    }
}


/* =====================================
   REFILL ALERTS
===================================== */

async function loadRefillAlerts() {
    try {
        const response = await fetch(`${API_BASE}/refill_alerts`);

        if (!response.ok) {
            throw new Error("Could not load refill alerts.");
        }

        const medicines = await response.json();

        const count = document.getElementById("safetyAlerts");

        if (count) {
            count.textContent = medicines.length;
        }

    } catch (error) {
        console.error(error);
    }
}


/* =====================================
   PRESCRIPTION OCR SCANNER
===================================== */

function setupPrescriptionScanner() {
    const button = document.getElementById("scanPrescription");
    const input = document.getElementById("prescriptionImage");
    const output = document.getElementById("extractedText");
    const message = document.getElementById("scanMessage");

    if (!button || !input || !output || !message) return;

    button.addEventListener("click", async () => {
        const file = input.files && input.files[0];

        if (!file) {
            message.textContent = t("Please select an image first.");
            return;
        }

        const formData = new FormData();
        formData.append("prescriptionImage", file);

        button.disabled = true;
        message.textContent = t("Scanning image... please wait.");

        try {
            const response = await fetch(`${API_BASE}/scan_prescription`, {
                method: "POST",
                body: formData
            });

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.error || "Prescription scan failed.");
            }

            output.value = result.extracted_text || "";

            message.textContent =
                t("Text extracted. Please verify it carefully; OCR can make mistakes.");

        } catch (error) {
            message.textContent =
                error.message || "Could not connect to the server.";

        } finally {
            button.disabled = false;
        }
    });
}


/* =====================================
   TEXT TO SPEECH HELPER
===================================== */

function readTextAloud(text, statusElement) {
    if (!text || !text.trim()) {
        if (statusElement) {
            statusElement.textContent = "There is no text to read.";
        }
        return;
    }

    if (!("speechSynthesis" in window)) {
        if (statusElement) {
            statusElement.textContent =
                "Text-to-speech is not supported in this browser.";
        }
        return;
    }

    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = getSpeechLanguage();

    utterance.onstart = () => {
        if (statusElement) {
            statusElement.textContent = "Reading aloud...";
        }
    };

    utterance.onend = () => {
        if (statusElement) {
            statusElement.textContent = "Finished reading.";
        }
    };

    utterance.onerror = () => {
        if (statusElement) {
            statusElement.textContent = "Could not read the text aloud.";
        }
    };

    window.speechSynthesis.speak(utterance);
}


/* =====================================
   VOICE ASSISTANT + GEMINI AI
===================================== */

function setupVoiceAssistant() {
    const textBox = document.getElementById("voiceText");
    const start = document.getElementById("startVoice");
    const stop = document.getElementById("stopVoice");
    const speak = document.getElementById("speakText");
    const clear = document.getElementById("clearVoice");
    const message = document.getElementById("voiceMessage");

    if (!textBox) return;

    // CREATE SEND TO AI BUTTON
    let sendAI = document.getElementById("sendToAI");

    if (!sendAI) {
        sendAI = document.createElement("button");
        sendAI.id = "sendToAI";
        sendAI.type = "button";
        sendAI.textContent = "🤖 Send to AI";
        textBox.insertAdjacentElement("afterend", sendAI);
    }

    // CREATE GEMINI ANSWER AREA
    let answerBox = document.getElementById("aiAnswer");

    if (!answerBox) {
        answerBox = document.createElement("div");
        answerBox.id = "aiAnswer";

        answerBox.style.cssText = `
            margin-top: 15px;
            padding: 15px;
            border: 1px solid #ccc;
            border-radius: 10px;
            white-space: pre-wrap;
            min-height: 60px;
            line-height: 1.6;
        `;

        answerBox.textContent = "Gemini's answer will appear here.";
        sendAI.insertAdjacentElement("afterend", answerBox);
    }

    // CREATE READ AI ANSWER BUTTON
    let readAnswer = document.getElementById("readAIAnswer");

    if (!readAnswer) {
        readAnswer = document.createElement("button");
        readAnswer.id = "readAIAnswer";
        readAnswer.type = "button";
        readAnswer.textContent = "🔊 Read AI Answer";

        answerBox.insertAdjacentElement("afterend", readAnswer);
    }

    // SPEECH RECOGNITION SETUP
    const Recognition =
        window.SpeechRecognition || window.webkitSpeechRecognition;

    let recognition = null;

    if (Recognition) {
        recognition = new Recognition();

        recognition.lang = getSpeechLanguage();
        recognition.continuous = false;
        recognition.interimResults = true;

        recognition.onstart = () => {
            if (message) {
                message.textContent = "Listening...";
            }
        };

        recognition.onresult = event => {
            let text = "";

            for (let i = 0; i < event.results.length; i++) {
                text += event.results[i][0].transcript;
            }

            textBox.value = text;
        };

        recognition.onerror = event => {
            if (message) {
                message.textContent = `Voice error: ${event.error}`;
            }
        };

        recognition.onend = () => {
            if (message) {
                message.textContent =
                    "You can edit your transcription before sending.";
            }
        };

        start?.addEventListener("click", () => {
            recognition.lang = getSpeechLanguage();

            try {
                recognition.start();
            } catch (error) {
                if (message) {
                    message.textContent = error.message;
                }
            }
        });

    } else {
        start?.addEventListener("click", () => {
            if (message) {
                message.textContent =
                    "Speech recognition is not supported by this browser.";
            }
        });
    }

    // STOP LISTENING
    stop?.addEventListener("click", () => {
        if (recognition) {
            recognition.stop();
        }

        if (message) {
            message.textContent = "Stopped listening.";
        }
    });

    // SEND QUESTION TO GEMINI BACKEND
    sendAI.addEventListener("click", async () => {
        const question = textBox.value.trim();

        if (!question) {
            if (message) {
                message.textContent =
                    "Please type or speak a question first.";
            }
            return;
        }

        sendAI.disabled = true;
        sendAI.textContent = "⏳ Getting AI answer...";
        answerBox.textContent = "Gemini is thinking...";

        try {
            const response = await fetch(`${API_BASE}/ask_ai`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    message: question,
                    language: currentLanguage
                })
            });

            const result = await response.json();

            if (!response.ok) {
                throw new Error(
                    result.error || "Gemini could not answer."
                );
            }

            if (!result.answer) {
                throw new Error("Gemini returned an empty answer.");
            }

            answerBox.textContent = result.answer;

            if (message) {
                message.textContent = "Gemini answered successfully.";
            }

        } catch (error) {
            answerBox.textContent =
                "Sorry, the AI answer could not be loaded.\n" +
                error.message;

            if (message) {
                message.textContent = error.message;
            }

            console.error("Gemini request error:", error);

        } finally {
            sendAI.disabled = false;
            sendAI.textContent = "🤖 Send to AI";
        }
    });

    // READ GEMINI'S ANSWER ALOUD
    readAnswer.addEventListener("click", () => {
        const answer = answerBox.textContent.trim();

        if (
            !answer ||
            answer === "Gemini's answer will appear here." ||
            answer === "Gemini is thinking..."
        ) {
            if (message) {
                message.textContent = "Please get an AI answer first.";
            }
            return;
        }

        if (
            answer.startsWith("Sorry, the AI answer could not be loaded.")
        ) {
            if (message) {
                message.textContent = "There is no AI answer to read.";
            }
            return;
        }

        readTextAloud(answer, message);
    });

    // READ USER'S TYPED MESSAGE ALOUD
    speak?.addEventListener("click", () => {
        const text = textBox.value.trim();

        if (!text) {
            if (message) {
                message.textContent = "Enter some text first.";
            }
            return;
        }

        readTextAloud(text, message);
    });

    // CLEAR TEXT AND AI ANSWER
    clear?.addEventListener("click", () => {
        textBox.value = "";
        answerBox.textContent = "Gemini's answer will appear here.";

        if ("speechSynthesis" in window) {
            window.speechSynthesis.cancel();
        }

        if (message) {
            message.textContent = "Text cleared.";
        }
    });
}