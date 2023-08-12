module.exports = async (interaction) => {
    if (interaction.guild.memberCount > 1000000) {
        interaction.reply(`🌟Members: ${interaction.guild.memberCount}🌟`).catch(() => {});
        return;
    }

    if (interaction.guild.memberCount > 100000) {
        interaction.reply(`⭐Members: ${interaction.guild.memberCount}⭐`).catch(() => {});
        return;
    }

    if (interaction.guild.memberCount > 10000) {
        interaction.reply(`💫Members: ${interaction.guild.memberCount}💫`).catch(() => {});
        return;
    }

    if (interaction.guild.memberCount > 1000) {
        interaction.reply(`✅Members: ${interaction.guild.memberCount}✅`).catch(() => {});
        return;
    }

    if (interaction.guild.memberCount > 500) {
        interaction.reply(`👑Members: ${interaction.guild.memberCount}👑`).catch(() => {});
        return;
    }

    if (interaction.guild.memberCount > 1) {
        interaction.reply(`Members: ${interaction.guild.memberCount}`).catch(() => {});
        return;
    }
};
