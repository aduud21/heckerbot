// CHANGING THE CODE BELOW CAN RESULT IN THE BOT NOT WORKING
const REALLYMAXHEARINGREALLY1234REAL = 100
require('events').EventEmitter.prototype._maxListeners = REALLYMAXHEARINGREALLY1234REAL;
require('events').defaultMaxListeners = REALLYMAXHEARINGREALLY1234REAL;
const filelog = require('../database/modlogs.json')
const fs  = require('fs')
// ONLY REMOVE THE ABOVE CODE IF YOU KNOW WHAT YOUE DOING
const { Client, ClientUser, MessageEmbed, Intents } = require('discord.js')
const { blacklisted } = require('../config/bot.json')
module.exports = async(client) => {
    client.ws.on("INTERACTION_CREATE", (interaction) => {
        const commandId = interaction.data.id;
        const commandName = interaction.data.name;
        
        if (commandName == "deldata") {
          if (blacklisted.includes(interaction.member.user.id)){
  return;
          }
          console.log(interaction.member)
          if (commandName == "deldata") {
          if (!interaction.member.permissions.has("ADMINISTRATOR")){
            console.log("user is not an admin to execute deldata slash command")
  return;
          }
            if (!filelog[interaction.guild.id]) {
        return;
      }
            try {
              delete filelog[message.guild.id]
    fs.writeFile('./database/modlogs.json', JSON.stringify(filelog, null , 2), (err) => {
        if (err) {

        }
    })
          if (commandName == "deldata") console.log(`Slash command ${commandName} ran`);       
          if (commandName == "deldata") client.api.interactions(interaction.id, interaction.token).callback.post({
                data: {
                    type: 4,
                    data: {
                        content: `Deleted all the data that the bot has collected from your server, If you do not like the bot please tell me why VIA the support server`
 }
       }
        });
            } catch (err) {
              console.log("a error happened with slashcommand deldata")
              return;
            }
        }
    };

}); 
  }