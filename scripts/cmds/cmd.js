const { configCommands } = global.GoatBot; const { log, loading, removeHomeDir } = global.utils;

function getDomain(url) { const regex = /^(?:https?://)?(?:[^@\n]+@)?(?:www.)?([^:/\n]+)/im; const match = url.match(regex); return match ? match[1] : null; }

function isURL(str) { try { new URL(str); return true; } catch (e) { return false; } }

module.exports = { config: { name: "cmd", version: "1.17-fixed", author: "NTKhang + Fix by nirob", countDown: 5, role: 2, description: { vi: "Quản lý các tệp lệnh của bạn", en: "Manage your command files" }, category: "owner" },

onStart: async function ({ args, message, api, threadModel, userModel, dashBoardModel, globalModel, threadsData, usersData, dashBoardData, globalData, event, commandName, getLang }) { const { unloadScripts, loadScripts } = global.utils;

if (args[0] === "load" && args[1]) {
  const infoLoad = loadScripts("cmds", args[1], log, configCommands, api, threadModel, userModel, dashBoardModel, globalModel, threadsData, usersData, dashBoardData, globalData, getLang);
  if (infoLoad.status === "success")
    return message.reply(getLang("loaded", infoLoad.name));
  else {
    console.log(infoLoad.errorWithThoutRemoveHomeDir);
    return message.reply(getLang("loadedError", infoLoad.name, infoLoad.error.name, infoLoad.error.message) + "\n" + infoLoad.error.stack);
  }
}

if (args[0]?.toLowerCase() === "loadall" || (args[0] === "load" && args.length > 2)) {
  const fileNeedToLoad = args[0].toLowerCase() === "loadall" ?
    fs.readdirSync(__dirname).filter(file => file.endsWith(".js") && !file.match(/(eg)\.js$/g) && (!file.match(/(dev)\.js$/g) || process.env.NODE_ENV === "development") && !configCommands.commandUnload?.includes(file)).map(file => file.replace(".js", ""))
    : args.slice(1);
  const arraySucces = [], arrayFail = [];
  for (const fileName of fileNeedToLoad) {
    const infoLoad = loadScripts("cmds", fileName, log, configCommands, api, threadModel, userModel, dashBoardModel, globalModel, threadsData, usersData, dashBoardData, globalData, getLang);
    if (infoLoad.status === "success") arraySucces.push(fileName);
    else arrayFail.push(` ❗ ${fileName} => ${infoLoad.error.name}: ${infoLoad.error.message}`);
  }
  let msg = "";
  if (arraySucces.length) msg += getLang("loadedSuccess", arraySucces.length);
  if (arrayFail.length) {
    msg += (msg ? "\n" : "") + getLang("loadedFail", arrayFail.length, arrayFail.join("\n"));
    msg += "\n" + getLang("openConsoleToSeeError");
  }
  return message.reply(msg);
}

if (args[0] === "unload") {
  if (!args[1]) return message.reply(getLang("missingCommandNameUnload"));
  try {
    const infoUnload = unloadScripts("cmds", args[1], configCommands, getLang);
    return message.reply(getLang("unloaded", infoUnload.name));
  } catch (err) {
    return message.reply(getLang("unloadedError", args[1], err.name, err.message));
  }
}

if (args[0] === "install") {
  let url = args[1];
  let fileName = args[2];
  let rawCode;

  if (!url || !fileName)
    return message.reply(getLang("missingUrlCodeOrFileName"));

  if (url.endsWith(".js") && !isURL(url)) {
    const tmp = fileName;
    fileName = url;
    url = tmp;
  }

  if (url.match(/https?:\/\//))

	    
