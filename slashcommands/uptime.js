// CHANGING THE CODE BELOW CAN RESULT IN THE BOT NOT WORKING
const REALLYMAXHEARINGREALLY1234REAL = 100
require('events').EventEmitter.prototype._maxListeners = REALLYMAXHEARINGREALLY1234REAL;
require('events').defaultMaxListeners = REALLYMAXHEARINGREALLY1234REAL;
// ONLY REMOVE THE ABOVE CODE IF YOU KNOW WHAT YOUE DOING
const { Client } = require('discord.js')
const interactionCooldowns = new Map() // get userids for cooldown, should be above module.exports = async (client) => {
module.exports = async(client) => {
    client.ws.on("INTERACTION_CREATE", (interaction) => {
        const commandId = interaction.data.id;
        const commandName = interaction.data.name;
        // startcooldown 
if (commandName === 'uptime') {
    const userId = interaction.member.user.id;
  if (interactionCooldowns.has(userId)) {
    const remainingCooldown = interactionCooldowns.get(userId) - Date.now();
    if (remainingCooldown > 0) {
      return;
    }
  }
  const cooldownTime = 5000
  interactionCooldowns.set(userId, Date.now() + cooldownTime);
  setTimeout(() => {
    interactionCooldowns.delete(userId);
  }, cooldownTime) // end of col
}
        if (commandName == "uptime") {
          if (commandName == "uptime") console.log(`Slash command ${commandName} ran`);   
        let totaltime = (client.uptime / 1000);
        let days = Math.floor(totaltime / 86400);
        totaltime %= 86400;
        let hours = Math.floor(totaltime / 3600);
        totaltime %= 3600;
        let minutes = Math.floor(totaltime / 60);
        let seconds = Math.floor(totaltime % 60);    
          if (commandName == "uptime") client.api.interactions(interaction.id, interaction.token).callback.post({
                data: {
                    type: 4,
                    data: {
                      content: `
Bot uptime:
Days: ${days} 
Hours: ${hours} 
Minutes: ${minutes} 
Seconds: ${seconds}
`
 }
       }
        }).catch(() => {})
        }
    });

};