const fs = require("fs");
const moment = require("moment-timezone");

module.exports.config = {
    name: "autosend",
    version: "2.2",
    role: 0,
    author: "MAHABUB RAHMAN", // ⚠️ Author name don't change
    description: "Auto-send local image with styled message",
    category: "Media",
    usages: "No manual trigger needed",
    cooldowns: 5
};

const lastSent = {};

async function sendPhoto(api, threadID, timeSlot) {
    try {
        const imagePath = __dirname + "/autosend.jpg"; // 👈 Local image (place autosend.jpg in same folder)

        if (!fs.existsSync(imagePath)) {
            return api.sendMessage("❌ Local image not found (autosend.jpg)", threadID);
        }

        const message = 
`===『Prefix Event』===
➸ It's 𝙉𝙄𝙍𝙊𝘽 (◕‿◕)

┏━━━━━━━━━━━━━┓
মন থেকে ভালোবাসা পূর্ণতা পাক, 💖 নাটকীয় ভালোবাসা থেকে মানুষ মুক্তি পাক!😊🌸✨🔐
┗━━━━━━━━━━━━━┛

🕒 TIME: ${timeSlot}

📌 Creator: 𝙉𝙄𝙍𝙊𝘽 (◕‿◕)
🌐 FB: https://www.facebook.com/nirob.nahad007`;

        api.sendMessage({
            body: message,
            attachment: fs.createReadStream(imagePath)
        }, threadID);

        lastSent[threadID] = timeSlot;

    } catch (err) {
        console.error("🚨 Error sending local photo:", err);
        api.sendMessage("❌ Could not send local image.", threadID);
    }
}

function schedulePhoto(api) {
    const timeSlots = [
        "8:00PM", "10:30PM", "12:30AM" // 🕓 Set your preferred times
    ];

    setInterval(async () => {
        const currentTime = moment().tz("Asia/Dhaka").format("h:mmA");

        const threads = await api.getThreadList(100, null, ["INBOX"]);

        for (const thread of threads) {
            const threadID = thread.threadID;

            if (!thread.isGroup) continue;

            if (timeSlots.includes(currentTime) && lastSent[threadID] !== currentTime) {
                await sendPhoto(api, threadID, currentTime);
            }
        }
    }, 30000);
}

module.exports.onLoad = function ({ api }) {
    if (global.autosendInitialized) return;
    global.autosendInitialized = true;

    schedulePhoto(api);
    console.log("✅ Local AutoSend by NIROB initialized.");
};

module.exports.onStart = () => {};
