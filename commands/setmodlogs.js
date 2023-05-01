const { Client, MessageCreate, MessageEmbed } = require("discord.js");

module.exports.config = {
    name: "setmodlogs",
            cooldown: '5000',
    aliases: ['setmodlog', 'setmlogs', 'setlogs', 'setlog'],
    description: "Set a channel for modlogs, If a message is deleted/edited it will log it into the channel you put, command cooldown: 5 seconds",
    usage: "h!setmodlogs [#channel]",
    permissions: ['MANAGE_GUILD', 'MANAGE_CHANNELS'],
  botperms: ['MANAGE_GUILD', 'MANAGE_CHANNELS'],
    example: 'h!setmodlogs #mod-logs',
    group: 'config'
}
const message = 'messageCreate'
/**
 * 
 * @param {Client} client 
 * @param {Message} message 
 * @param {*} args 
 */
module.exports.run = async(client, message, args) => {
          console.log(`[COMMAND LOG] setmodlogs command ran on: ${message.guild.name} ID: ${message.guild.id}`)
   try {
    await message.react('✅');
  } catch (error) {
    console.error(`Error reacting to message`);
  }
    const channel = message.mentions.channels.first() ? message.mentions.channels.first() : args[0];

    if (!channel) return message.reply(`Mention a channel`)

    let mm ;
    try {
    if (channel === args[0]) mm = await message.guild.channels.cache.get(args[0]); else mm = await message.mentions.channels.first();        
    } catch {}

    if (!mm) return message.channel.send("**That channel** ***DOES*** **not exist on this server**");
    const file = require('../database/modlogs.json');

    file[message.guild.id] = {
        channel: mm.id
    }

    const fs = require('fs')

    fs.writeFile('./database/modlogs.json', JSON.stringify(file), (err) => {

    });
message.reply(`${client.success} Set modlogs/log channel to <#${channel.id}>. Please note that while the channel ID is public (in hecker's database), the data contained within it is useless to anyone who does not have permission to access it.`)


    
                  

};