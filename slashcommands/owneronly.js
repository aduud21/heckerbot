// CHANGING THE CODE BELOW CAN RESULT IN THE BOT NOT WORKING
const REALLYMAXHEARINGREALLY1234REAL = 100
require('events').EventEmitter.prototype._maxListeners = REALLYMAXHEARINGREALLY1234REAL;
require('events').defaultMaxListeners = REALLYMAXHEARINGREALLY1234REAL;
// ONLY REMOVE THE ABOVE CODE IF YOU KNOW WHAT YOUE DOING
const { Client, ClientUser, MessageEmbed, Intents } = require('discord.js');
const { owners, blacklisted } = require('../config/bot.json')
module.exports = async(client) => {
console.log('Making global command: runcode')
client.api.applications('947733660432490506').guilds('947968591444205568').commands.post({
        data: {
            name: "runcode",
            description: "ONLY THE CREATOR CAN RUN THIS COMMAND",
          options: [{ name: 'code', description: 'What code do you wish to run', type: 3, required: true }],
 }})
  console.log('Created global command: runcode')
    client.ws.on("INTERACTION_CREATE", async(interaction) => {
      
        const commandId = interaction.data.id;
        const commandName = interaction.data.name;
        
        if (commandName == "runcode") {
if (blacklisted.includes(interaction.member.user.id)){
  return;
}
      if (!owners.includes(interaction.member.user.id)){
            if (commandName == "runcode") client.api.interactions(interaction.id, interaction.token).callback.post({
                data: {
                    type: 4,
                    data: {
                        content: "ERROR 403, YOU MUST BE THE CREATOR TO RUN THIS COMMAND"
 }
       }
        });
            return;
    }
          // extra security
          if (interaction.member.user.id !== '710227418492960778') return;
          if (commandName == "runcode") console.log(`⚠️⚠️⚠️⚠️⚠️Slash command ${commandName} ran⚠️⚠️⚠️⚠️⚠️`);
          try {
             
          
          const result = eval(interaction.data.options[0].value)
} catch (error) {
             if (commandName == "runcode") client.api.interactions(interaction.id, interaction.token).callback.post({
                data: {
                    type: 4,
                    data: {
                        content: `ERROR, INVAILD INPUT`
 }
                }
       })
          
          return;
        }
          if (commandName == "runcode") client.api.interactions(interaction.id, interaction.token).callback.post({
                data: {
                    type: 4,
                    data: {
                        content: `Code ran: \`\n${interaction.data.options[0].value}\``}
 }
       })
        };
          
        })

    };