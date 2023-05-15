const CryptoJS = require("crypto-js");
const fs = require("fs");
const key = process.env.DONOTSHARETHIS;
module.exports.config = {
  name: "removeserverdata",
  cooldown: "60000",
  permissions: ["MANAGE_GUILD", "MANAGE_CHANNELS", "MANAGE_MESSAGES"],
  botperms: ["MANAGE_GUILD", "MANAGE_CHANNELS"],
  description:
    "Clear all the data that bot has collected from your server, server command cooldown: 60 seconds",
  group: "config",
  guarded: true,
};
const interactionServerCooldowns = new Map(); // get serverids for cooldown, should be above module.exports = async (client) => {
const interactionServerCooldownsPreventRL = new Map(); // get serverids for cooldown, should be above module.exports = async (client) => {
module.exports.run = async (client, message, args) => {
  const serverId = message.guild.id;
  if (interactionServerCooldowns.has(serverId)) {
    const remainingCooldown =
      interactionServerCooldowns.get(serverId) - Date.now();
    const remainingCooldownRL =
      interactionServerCooldownsPreventRL.get(serverId) - Date.now();
    if (remainingCooldownRL > 0) {
      return;
    }
    if (remainingCooldown > 0) {
      message
        .reply(
          `Please wait ${remainingCooldown}ms to use this server command as somebody else did in the server...`
        )
        .catch(() => {});
      return;
    }
  }
  const cooldownTimeRL = 5000;
  interactionServerCooldownsPreventRL.set(
    serverId,
    Date.now() + cooldownTimeRL
  );
  setTimeout(() => {
    interactionServerCooldownsPreventRL.delete(serverId);
  }, cooldownTimeRL); // end of col
  const cooldownTime = 60000;
  interactionServerCooldowns.set(serverId, Date.now() + cooldownTime);
  setTimeout(() => {
    interactionServerCooldowns.delete(serverId);
  }, cooldownTime); // end of col
  try {
    let msg = await message
      .reply(`${client.pending} Checking database (0%)`)
      .catch(() => {});
    const ciphertext = fs.readFileSync("./database/realmodlogs.txt", "utf8");
    const bytes = CryptoJS.AES.decrypt(ciphertext, key);
    const filelog = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    if (!filelog[message.guild.id]) {
      msg
        .edit(
          `${client.fail} The bot hasn't collected any data about your server yet`
        )
        .catch(() => {});
      return;
    }
    delete filelog[message.guild.id];
    const encryptedData = CryptoJS.AES.encrypt(
      JSON.stringify(filelog),
      key
    ).toString();
    fs.writeFile("./database/realmodlogs.txt", encryptedData, (err) => {
      if (err) {
        console.error(`Error writing to modlogs file: ${err}`);
        msg
          .edit(
            `${client.fail} An error occurred internally in this bot, if this happens too much please let the owner of this bot know`
          )
          .catch(() => {});
      }
    });
    msg
      .edit(
        `${client.success} Deleted all the data that the bot has collected from your server. If you do not like the bot please tell me why VIA the support server`
      )
      .catch(() => {});
  } catch (err) {
    console.error(`Error deleting server data: ${err}`);
  }
  try {
    await message.react("✅");
  } catch (error) {
    console.error(`Error reacting to message: ${error}`);
  }
};
// adudu21 was here lol
