// This command has been deprecated, it will stay however slash commands will not automatically be made for this
const { owners } = require('../config/bot.json');
module.exports = async (interaction) => {
    const commandName = interaction.commandName;
    if (commandName == 'runcode') {
        if (!owners.includes(interaction.member.user.id)) {
            interaction.reply(`ERROR 403, YOU MUST BE THE CREATOR TO RUN THIS COMMAND'`);
            return;
        }
        // extra security
        console.log(interaction.member.user.id);
        if (!interaction.member.user.id === '710227418492960778') return;
        if (!commandName == 'runcode') return;
        console.log(`⚠️⚠️⚠️⚠️⚠️Slash command ${commandName} ran⚠️⚠️⚠️⚠️⚠️`);
        try {
            if (!owners.includes(interaction.member.user.id)) return;
            if (!interaction.member.user.id === '710227418492960778') return;
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
