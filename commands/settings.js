const { MessageEmbed } = require("discord.js")

module.exports.config = {
    name: "settings",
            cooldown: '2500',
   // aliases: ['settings'],
    permissions: ['MANAGE_GUILD'],
    group: 'info',
    description: "View all configuration settings, command cooldown: 2.5 seconds",
    example: 'h!config'
}
const message = 'messageCreate'
module.exports.run = async(client, message, args) => {
          console.log(`[COMMAND LOG] settings command ran on: ${message.guild.name} ID: ${message.guild.id}`)
  try {
    await message.react('✅');
  } catch (error) {
    console.error(`Error reacting to message`);
  }

    let modLogsChannel = 'None';

    let modlogs = require('../database/modlogs.json')[message.guild.id];
    if (modlogs) {
        modLogsChannel = `<#${modlogs.channel}>`;
    }
  
    message.reply(`Configuration settings for **${message.guild.name}**

Modlogs/logs: ${modLogsChannel}`)

}