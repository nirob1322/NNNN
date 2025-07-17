const image = "https://files.catbox.moe/5wytj0.jpg";

module.exports = {
  config: {
    name: "owner",
    version: "1.0",
    author: "NIROB",
    countDown: 5,
    role: 0,
    shortDescription: "Bold style owner info",
    longDescription: "Strong readable bold font style",
    category: "auto ✅"
  },

  onStart: async function ({ event, message, usersData, threadsData }) {
    const user = await usersData.get(event.senderID);
    const thread = await threadsData.get(event.threadID);
    const now = new Date();
    const date = now.toLocaleDateString("en-US", { day: "2-digit", month: "short", year: "numeric" });
    const time = now.toLocaleTimeString("en-US", { timeZone: "Asia/Dhaka", hour: "2-digit", minute: "2-digit", hour12: true });

    const info = `
╭── ⌗ 𝗢𝘄𝗻𝗲𝗿 𝗜𝗻𝗳𝗼 ・୨୧ ──╮

∘ 𝗡𝗮𝗺𝗲    : 𝗡𝗶𝗿𝗼𝗯 𝗛𝗼𝘀𝘀𝗮𝗶𝗻  
∘ 𝗪𝗣      : wa.me/8801772594397  
∘ 𝗔𝗱𝗱𝗿𝗲𝘀𝘀 : 𝗠𝘂𝗻𝘀𝗵𝗶𝗴𝗮𝗻𝗷  
∘ 𝗚𝗲𝗻𝗱𝗲𝗿  : 𝗠𝗮𝗹𝗲  
∘ 𝗥𝗲𝗹𝗶𝗴𝗶𝗼𝗻: 𝗜𝘀𝗹𝗮𝗺  
∘ 𝗔𝗴𝗲     : 𝟭𝟴  

∘ 𝗕𝗼𝘁     : 𝗡 𝗜 𝗥 𝗢 𝗕 - 𝗕 𝗢 𝗧  
∘ 𝗚𝗰      : ${thread.threadName}  
∘ 𝗧𝗶𝗺𝗲    : ${date} | ${time}

╰── ⌗ 𝗦𝘁𝗮𝘆 𝗖𝗹𝗮𝘀𝘀𝘆, 𝗦𝘁𝗮𝘆 𝗦𝗼𝗳𝘁 ──╯`;

    await message.reply({
      body: info,
      attachment: await global.utils.getStreamFromURL(image)
    });
  }
};
