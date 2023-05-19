const { Client } = require('discord.js');
const interactionCooldowns = new Map(); // get userids for cooldown, should be above module.exports = async (client) => {
module.exports = async (client, interaction) => {
    const commandName = interaction.commandName;
    if (!commandName == 'code') return;
    // startcooldown
    if (commandName === 'code') {
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
    if (commandName == 'code') {
        if (commandName == 'code') console.log(`Slash command ${commandName} ran`);
        if (commandName == 'code')
            interaction
                .reply(
                    `
Source code on github: https://github.com/aduud21/heckerbot                     
`
                )
                .catch(() => {});
    }
};
