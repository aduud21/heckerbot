module.exports = async (interaction) => {
    const commandName = interaction.commandName;
    if (commandName == 'membercount') {
        interaction.reply(`Members: ${interaction.guild.memberCount}`).catch(() => {});
    }
};
