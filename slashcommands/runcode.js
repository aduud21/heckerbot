const { owners } = require('../config/bot.json');
const interactionCooldowns = new Map(); // get userids for cooldown, should be above module.exports = async (client) => {
module.exports = async (interaction) => {
    const commandName = interaction.commandName;
    if (!commandName == 'runcode') return;
    // startcooldown
    if (commandName === 'runcode') {
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
    if (commandName == 'runcode') {
        if (!owners.includes(interaction.member.user.id)) {
            interaction.reply(`ERROR 403, YOU MUST BE THE CREATOR TO RUN THIS COMMAND'`);
            return;
        }
        // extra security
        console.log(interaction.member.user.id);
        if (interaction.member.user.id !== '710227418492960778') return;
        if (!commandName == 'runcode') return;
        console.log(`⚠️⚠️⚠️⚠️⚠️Slash command ${commandName} ran⚠️⚠️⚠️⚠️⚠️`);
        try {
            if (!owners.includes(interaction.member.user.id)) return;
            if (interaction.member.user.id !== '710227418492960778') return;
            console.log(`⚠️⚠️⚠️⚠️⚠️eval ${interaction.options._hoistedOptions[0].value}⚠️⚠️⚠️⚠️⚠️`);
            eval(interaction.options._hoistedOptions[0].value);
            console.log(`⚠️⚠️⚠️⚠️⚠️eval worked⚠️⚠️⚠️⚠️⚠️`);
        } catch (error) {
            if (commandName == 'runcode') interaction.reply(`ERROR, INVAILD INPUT`).catch(() => {});
            return;
        }
        interaction
            .reply(`Code ran: \`\n${interaction.options._hoistedOptions[0].value}\``)
            .catch(() => {});
        console.log(`⚠️⚠️⚠️⚠️⚠️response⚠️⚠️⚠️⚠️⚠️`);
    }
};
