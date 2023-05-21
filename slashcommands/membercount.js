module.exports = async (interaction) => {
    const commandName = interaction.commandName;
    if (commandName == 'membercount') {
        if (commandName == 'membercount') console.log(`Slash command ${commandName} ran`);
        if (commandName == 'membercount')
            interaction.reply(`Members: ${interaction.guild.memberCount}`).catch(() => {});
    }
};
