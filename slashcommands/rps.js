const { Client } = require('discord.js');
const interactionCooldowns = new Map(); // get userids for cooldown, should be above module.exports = async (client) => {
module.exports = async (interaction) => {
    const commandName = interaction.commandName;
    if (!commandName == 'rps') return;
    // startcooldown
    if (commandName === 'rps') {
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
    if (commandName == 'rps') {
        const gamereal = require('../utils/structure/exports/json/game.json');
        const item = gamereal[Math.floor(Math.random() * gamereal.length)];
        const filter = (response) => {
            return item.answers();
        };
        if (commandName == 'rps') console.log(`Slash command ${commandName} ran`);
        if (commandName == 'rps')
            interaction
                .reply(
                    `
${item.question}
`
                )
                .catch(() => {});
    }
};
