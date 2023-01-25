// CHANGING THE CODE BELOW CAN RESULT IN THE BOT NOT WORKING
const REALLYMAXHEARINGREALLY1234REAL = 100
require('events').EventEmitter.prototype._maxListeners = REALLYMAXHEARINGREALLY1234REAL;
require('events').defaultMaxListeners = REALLYMAXHEARINGREALLY1234REAL;
// ONLY REMOVE THE ABOVE CODE IF YOU KNOW WHAT YOUE DOING
const { Client, ClientUser, MessageEmbed, Intents } = require('discord.js')
const { blacklisted } = require('../config/bot.json')
module.exports = async(client) => {
console.log('Making global command: code')
client.api.applications(`947733660432490506`).commands.post({
        data: {
            name: "code",
            description: "View the bot's source code"
 }})
  console.log('Created global command: code')
    client.ws.on("INTERACTION_CREATE", (interaction) => {
        const commandId = interaction.data.id;
        const commandName = interaction.data.name;
        
        if (commandName == "code") {
          if (blacklisted.includes(interaction.member.user.id)){
  return;
          }
          if (commandName == "code") console.log(`Slash command ${commandName} ran`);       
          if (commandName == "code") client.api.interactions(interaction.id, interaction.token).callback.post({
                data: {
                    type: 4,
                    data: {
                        content: `Source code on github: https://github.com/aduud21/heckerbot,
                        
Source code on replit: https://replit.com/@AGuyThatLikesFurrys/Hecker-Discord-bot`
 }
       }
        });
        }
    });

};