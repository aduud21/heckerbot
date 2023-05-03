const filelog = require('../database/modlogs.json')
const { MessageEmbed, ClientUser } = require('discord.js');
const fs  = require('fs')
module.exports.config = {
    name: "removeserverdata",
          cooldown: '120000',
    permissions: ['ADMINISTRATOR'],
    description: "Clear all the data that bot has collected from your server, command cooldown: 120 seconds",
    group: 'config',
    guarded: true,
  }
const message = 'messageCreate'
module.exports.run = async (client, message, args) => {
  console.log(`[COMMAND LOG] removeserverdata command ran on: ${message.guild.name} ID: ${message.guild.id}`)
  try {
    let msg = await message.reply('⏳ -> Removing server data, when done the bot will let you know...').catch(() => {})
    msg.edit('⏳ -> Checking database (0%)').catch(() => {})
    if (!filelog[message.guild.id]) {
      msg.edit("The bot hasn't collected any data about your server yet").catch(() => {})
      return;
    }
    delete filelog[message.guild.id];
    msg.edit('⏳ -> Deleted modlogs settings (100%)').catch(() => {})
    fs.writeFile('./database/modlogs.json', JSON.stringify(filelog, null , 2), (err) => {
      if (err) {
      }
    });
    msg.edit(`✅ -> Deleted all the data that the bot has collected from your server. If you do not like the bot please tell me why VIA the support server`).catch(() => {})
  } catch (err) {
  }
      try {
    await message.react('✅');
  } catch (error) {
    console.error(`Error reacting to message`);
  }
}
// adudu21 was here