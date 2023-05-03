// CHANGING THE CODE BELOW CAN RESULT IN THE BOT NOT WORKING
const REALLYMAXHEARINGREALLY1234REAL = 100
require('events').EventEmitter.prototype._maxListeners = REALLYMAXHEARINGREALLY1234REAL;
require('events').defaultMaxListeners = REALLYMAXHEARINGREALLY1234REAL;
// ONLY REMOVE THE ABOVE CODE IF YOU KNOW WHAT YOUE DOING
const { Client, ClientUser, MessageEmbed, Intents } = require('discord.js')
const { blacklisted } = require('../config/bot.json')
module.exports = async(client) => {
    client.ws.on("INTERACTION_CREATE", (interaction) => {
        const commandId = interaction.data.id;
        const commandName = interaction.data.name;
        
        if (commandName == "information") {
          if (blacklisted.includes(interaction.member.user.id)){
  return;
          }
          if (commandName == "information") console.log(`Slash command ${commandName} ran`);
            if (commandName == "information") client.api.interactions(interaction.id, interaction.token).callback.post({
                data: {
                    type: 4,
                    data: {
                        content: `Bot created: 2022/2/28
Command cooldown is: Disabled for owner
Owner/Creator: Hecker#1844 
${client.guilds.cache.map((guild) => guild.memberCount).reduce((p, c) => p + c)} users can use this bot
Support server: https://discord.gg/GbjgmffUKj`
 }
       }
        }).catch(() => {})
        }
    });

};