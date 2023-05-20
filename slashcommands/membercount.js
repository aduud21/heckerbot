const interactionCooldowns = new Map(); // get userids for cooldown, should be above module.exports = async (client) => {
module.exports = async (interaction) => {
    const commandName = interaction.commandName;
    // startcooldown
    if (commandName === 'membercount') {
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
    if (commandName == 'membercount') {
        if (commandName == 'membercount') console.log(`Slash command ${commandName} ran`);
        if (commandName == 'membercount')
            interaction.reply(`Members: ${interaction.guild.memberCount}`).catch(() => {});
    }
};
