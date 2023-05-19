const { Client } = require('discord.js');
const { owners, support } = require('../config/bot.json');
const interactionCooldowns = new Map(); // get userids for cooldown, should be above module.exports = async (client) => {
module.exports = async (client, interaction) => {
    const commandName = interaction.commandName;
    if (!commandName == 'information') return;
    // startcooldown
    if (commandName === 'information') {
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
    if (commandName == 'information') {
        if (commandName == 'information') console.log(`Slash command ${commandName} ran`);
        if (commandName == 'information')
            interaction
                .reply(
                    `Bot created: 2022/2/28
Owner(s) UserID(s): ${owners}
Support server: ${support}
`
                )
                .catch(() => {});
    }
};
