module.exports = {
  config: {
    name: "owner",
    version: "1.0",
    author: "NIROB",
    countDown: 5,
    role: 0,
    shortDescription: "admin and info",
    longDescription: "bot owner info",
    category: "auto ✅"
  },

  onStart: async function ({
    event,
    message,
    getLang,
    usersData,
    threadsData
  }) {
    const userData = await usersData.get(event.senderID);
    const userName = userData.name;
    const threadData = await threadsData.get(event.threadID);
    const threadName = threadData.threadName;

    const now = new Date();
    const dateStr = now.toLocaleDateString("en-US", {
      year: "numeric",
      month: "numeric",
      day: "numeric"
    });
    const timeStr = now.toLocaleTimeString("en-US", {
      timeZone: "Asia/Dhaka",
      hour12: true
    });

    const infoMessage = `╔╝❮${userName}❯╚╗
━━━━━━━━━━━━━━━━━━━━━━
𝐍𝐀𝐌𝐄: NIROB HOSSAIN
𝐑𝐄𝐋𝐈𝐆𝐈𝐎𝐍: ISLAM
𝐀𝐃𝐃𝐑𝐄𝐒𝐒: Munshiganj
𝐆𝐄𝐍𝐃𝐄𝐑: MALE
𝐀𝐆𝐄: 18
𝐑𝐄𝐋𝐀𝐓𝐈𝐎𝐍𝐒𝐇𝐈𝐏: 𝐅𝐀𝐈𝐋𝐄𝐃
𝐖𝐎𝐑𝐊: NTG
𝐆𝐌𝐀𝐈𝐋: nahadnirob@gmail.com
𝐅𝐀𝐂𝐄𝐁𝐎𝐎𝐊: https://www.facebook.com/nirob.nahad007
𝐌𝐀𝐒𝐒𝐄𝐍𝐆𝐄𝐑: N/A
𝐖𝐇𝐀𝐓𝐒𝐀𝐏𝐏: wa.me/+8801772594397
𝐈𝐌𝐎: PERSONAL 🫣
𝐓𝐄𝐋𝐄𝐆𝐑𝐀𝐌: N/A
━━━━━━━━━━━━━━━━━━━━━━

Bot Prefix: ( . )
Bot Name: CAT BOT
GC Name: ${threadName}
Time:【 ${dateStr} || ${timeStr} 】
━━━━━━━━━━━━━━━━━━━━━━`;

    await message.reply({
      body: infoMessage,
      attachment: await global.utils.getStreamFromURL("https://files.catbox.moe/a86iqb.mp4")
    });
  }
};
