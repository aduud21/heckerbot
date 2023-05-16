const { Client } = require('discord.js');
const interactionCooldowns = new Map(); // get userids for cooldown, should be above module.exports = async (client) => {
module.exports = async (client, interaction) => {
    const commandName = interaction.commandName;
    if (!commandName == 'uptime') return;
    // startcooldown
    if (commandName === 'uptime') {
        const userId = interaction.member.user.id;
        if (interactionCooldowns.has(userId)) {
            const remainingCooldown = interactionCooldowns.get(userId) - Date.now();
            if (remainingCooldown > 0) {
                return;
            }
        }
        const cooldownTime = 5000;
        interactionCooldowns.set(userId, Date.now() + cooldownTime);
        setTimeout(() => {
            interactionCooldowns.delete(userId);
        }, cooldownTime); // end of col
    }
    if (commandName == 'uptime') {
        if (commandName == 'uptime') console.log(`Slash command ${commandName} ran`);
        let totaltime = client.uptime / 1000;
        let days = Math.floor(totaltime / 86400);
        totaltime %= 86400;
        let hours = Math.floor(totaltime / 3600);
        totaltime %= 3600;
        let minutes = Math.floor(totaltime / 60);
        let seconds = Math.floor(totaltime % 60);
        if (commandName == 'uptime')
            interaction
                .reply(
                    `
Bot uptime:
Days: ${days} 
Hours: ${hours} 
Minutes: ${minutes} 
Seconds: ${seconds}
`
                )
                .catch(() => {});
    }
};
