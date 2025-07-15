const { getPrefix } = global.utils;
const { commands, aliases } = global.GoatBot;

const catboxImages = [
  "https://files.catbox.moe/1kfyza.mp4",
  "https://files.catbox.moe/c6ujy4.jpg",
  "https://files.catbox.moe/ueiep7.jpg",
  "https://files.catbox.moe/5wytj0.jpg",
];

// Split array into n parts evenly
function splitArray(arr, parts = 4) {
  const len = arr.length;
  const out = [];
  let i = 0;
  while (i < len) {
    out.push(arr.slice(i, i + Math.ceil(len / parts)));
    i += Math.ceil(len / parts);
  }
  return out;
}

module.exports = {
  config: {
    name: "help",
    version: "1.0",
    author: "Nirob ꨄ︎",
    countDown: 5,
    role: 0,
    shortDescription: {
      en: "N I R O B - BOT help menu, split into 4 pages!",
    },
    longDescription: {
      en: "Shows commands with pastel style and catbox images on 4 pages.",
    },
    category: "info",
    guide: {
      en: "{pn} [1-4]",
    },
    priority: 1,
  },

  onStart: async function ({ message, args, event, threadsData, role }) {
    const prefix = getPrefix(event.threadID);
    let page = 1;
    if (args.length > 0) {
      const p = parseInt(args[0]);
      if (p >= 1 && p <= 4) page = p;
    }

    // Filter commands by user role
    const availableCommands = [];
    for (const [name, cmd] of commands) {
      if (cmd.config.role > role) continue;
      availableCommands.push(name);
    }
    availableCommands.sort();

    // Split commands into 4 pages
    const splitCommands = splitArray(availableCommands, 4);
    const commandsOnPage = splitCommands[page - 1] || [];

    // Compose message style
    let msg = `╭──────────── HELP MENU ══ Page ${page} ────────╮\n\n`;

    // Group commands by category for nicer display
    const categories = {};
    for (const cmdName of commandsOnPage) {
      const cmd = commands.get(cmdName) || commands.get(aliases.get(cmdName));
      if (!cmd) continue;
      const cat = cmd.config.category || "Other";
      if (!categories[cat]) categories[cat] = [];
      categories[cat].push(cmdName);
    }

    for (const catName of Object.keys(categories)) {
      msg += `♡ ${capitalize(catName)} ♡  \n`;
      msg += categories[catName]
        .map((cmd) => `${prefix}${cmd}`)
        .join("    ") + "\n\n";
    }

    msg += `╰───────────────────────────────╯  \n`;
    msg += `Use "${prefix}help ${page === 4 ? 1 : page + 1}" to see more commands!\n`;
    msg += `𝙳𝚎𝚟: 𝙽𝚒𝚛𝚘𝚋 ꨄ︎\n`;

    // Send with catbox image for this page
    const imgUrl = catboxImages[page - 1];
    await message.reply({
      body: msg,
      attachment: await global.utils.getStreamFromURL(imgUrl),
    });
  },
};

function capitalize(text) {
  return text.charAt(0).toUpperCase() + text.slice(1);
         }
