// CHANGING THE CODE BELOW CAN RESULT IN THE BOT NOT WORKING
const REALLYMAXHEARINGREALLY1234REAL = 100
require('events').EventEmitter.prototype._maxListeners = REALLYMAXHEARINGREALLY1234REAL;
require('events').defaultMaxListeners = REALLYMAXHEARINGREALLY1234REAL;
// ONLY REMOVE THE ABOVE CODE IF YOU KNOW WHAT YOUE DOING
const { Client, ClientUser, MessageEmbed, Intents } = require('discord.js')
const { blacklisted } = require('../config/bot.json')
module.exports = async(client) => {
console.log('Making global command: deldata')
client.api.applications('947733660432490506').commands.post({
        data: {
            name: "deldata",
            description: " This will tell you how to delete all the data that the bot has collected about your server"
 }})
  console.log('Created global command: deldata')
    client.ws.on("INTERACTION_CREATE", (interaction) => {
        const commandId = interaction.data.id;
        const commandName = interaction.data.name;
        
        if (commandName == "deldata") {
          if (blacklisted.includes(interaction.member.user.id)){
  return;
          }
          if (commandName == "deldata") console.log(`Slash command ${commandName} ran`);
            if (commandName == "deldata") client.api.interactions(interaction.id, interaction.token).callback.post({
                data: {
                    type: 4,
                    data: {
                        content: "if you wish to delete all the data that the bot has collected about your server say the following text message: h!removeserverdata" 
 }
       }
        });
        }
    });

};