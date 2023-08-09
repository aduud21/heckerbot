module.exports = async (interaction) => {
    interaction.reply(`Members: ${interaction.guild.memberCount}`).catch(() => {});
};
