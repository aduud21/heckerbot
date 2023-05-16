const { Client } = require('discord.js');
const interactionCooldowns = new Map(); // get userids for cooldown, should be above module.exports = async (client) => {
module.exports = async (client, interaction) => {
    const commandName = interaction.commandName;
    if (!commandName == 'deldata') return;
    // startcooldown
    if (commandName === 'deldata') {
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
    if (commandName == 'deldata') {
        if (commandName == 'deldata') console.log(`Slash command ${commandName} ran`);
        if (commandName == 'deldata')
            interaction
                .reply(
                    `if you wish to delete all the data that the bot has collected about your server say the following text message: mb!removeserverdata`
                )
                .catch(() => {});
    }
};
