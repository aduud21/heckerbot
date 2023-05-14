// CHANGING THE CODE BELOW CAN RESULT IN THE BOT NOT WORKING
const REALLYMAXHEARINGREALLY1234REAL = 100
require('events').EventEmitter.prototype._maxListeners = REALLYMAXHEARINGREALLY1234REAL;
require('events').defaultMaxListeners = REALLYMAXHEARINGREALLY1234REAL;
// ONLY REMOVE THE ABOVE CODE IF YOU KNOW WHAT YOUE DOING
const { Client } = require('discord.js')
const { owners } = require('../config/bot.json')
const interactionCooldowns = new Map() // get userids for cooldown, should be above module.exports = async (client) => {
module.exports = async(client) => {
    client.ws.on("INTERACTION_CREATE", (interaction) => {
        const commandId = interaction.data.id;
        const commandName = interaction.data.name;
        // startcooldown 
if (commandName === 'information') {
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
        if (commandName == "information") {
          if (commandName == "information") console.log(`Slash command ${commandName} ran`);
            if (commandName == "information") client.api.interactions(interaction.id, interaction.token).callback.post({
                data: {
                    type: 4,
                    data: {
                        content: `Bot created: 2022/2/28
Command cooldown is: Disabled for owner
Owner(s) UserID(s): ${owners}
Support server: https://discord.gg/GbjgmffUKj`
 }
       }
        }).catch(() => {})
        }
    });

};