const CryptoJS = require('crypto-js');
const fs = require('fs');
const key = process.env.DONOTSHARETHIS
module.exports.config = {
  name: "removeserverdata",
  cooldown: '120000',
  permissions: ['ADMINISTRATOR'],
  description: "Clear all the data that bot has collected from your server, command cooldown: 120 seconds",
  group: 'config',
  guarded: true,
}
module.exports.run = async (client, message, args) => {
  console.log(`[COMMAND LOG] removeserverdata command ran on: ${message.guild.name} ID: ${message.guild.id}`)
  try {
    let msg = await message.reply('⏳ -> Removing server data, when done the bot will let you know...').catch(() => {})
    msg.edit('⏳ -> Checking database (0%)').catch(() => {})
    const ciphertext = fs.readFileSync('./database/realmodlogs.txt', 'utf8');
    const bytes = CryptoJS.AES.decrypt(ciphertext, key);
    const filelog = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    if (!filelog[message.guild.id]) {
      msg.edit("The bot hasn't collected any data about your server yet").catch(() => {})
      return;
    }
    delete filelog[message.guild.id];
    msg.edit('⏳ -> Deleted modlogs settings (100%)').catch(() => {})
    const encryptedData = CryptoJS.AES.encrypt(JSON.stringify(filelog), key).toString();
    fs.writeFile('./database/realmodlogs.txt', encryptedData, (err) => {
      if (err) {
        console.error(`Error writing to modlogs file: ${err}`)
      }
    })
    msg.edit(`✅ -> Deleted all the data that the bot has collected from your server. If you do not like the bot please tell me why VIA the support server`).catch(() => {})
  } catch (err) {
    console.error(`Error deleting server data: ${err}`)
  }
  try {
    await message.react('✅');
  } catch (error) {
    console.error(`Error reacting to message: ${error}`)
  }
}
// adudu21 was here lol