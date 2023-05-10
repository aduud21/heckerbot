// CHANGING THE CODE BELOW CAN RESULT IN THE BOT NOT WORKING
const REALLYMAXHEARINGREALLY1234REAL = 100
require('events').EventEmitter.prototype._maxListeners = REALLYMAXHEARINGREALLY1234REAL;
require('events').defaultMaxListeners = REALLYMAXHEARINGREALLY1234REAL;
// ONLY REMOVE THE ABOVE CODE IF YOU KNOW WHAT YOUE DOING
const { Client } = require('discord.js');
const { owners, blacklisted } = require('../config/bot.json')
const interactionCooldowns = new Map() // get userids for cooldown, should be above module.exports = async (client) => {
module.exports = async(client) => {
    client.ws.on("INTERACTION_CREATE", async(interaction) => {
        const commandId = interaction.data.id;
        const commandName = interaction.data.name;
        // startcooldown 
if (commandName === 'runcode') {
    const userId = interaction.member.user.id;
  if (interactionCooldowns.has(userId)) {
    const remainingCooldown = interactionCooldowns.get(userId) - Date.now();
    if (remainingCooldown > 0) {
      client.api.interactions(interaction.id, interaction.token).callback.post({
        data: {
          type: 4,
          data: {
            content: `You can use this command again in ${remainingCooldown}ms.`,
          },
        },
      });
      return;
    }
  }
  const cooldownTime = 5000
  interactionCooldowns.set(userId, Date.now() + cooldownTime);
  setTimeout(() => {
    interactionCooldowns.delete(userId);
  }, cooldownTime) // end of col
}
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