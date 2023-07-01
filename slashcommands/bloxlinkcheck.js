const bloxlink = require('bloxlink-sdk');
module.exports = async (interaction) => {
    const commandName = interaction.commandName;
    interaction
        .reply({
            content: `Bloxlink API changed today (6/30/2023) which require's all developer which use bloxklink to create a new global API key, Please wait while the developer's of this bot insert the new global API key (when they get it)`,
        })
        .catch(() => {});
    return;
    await interaction.reply({ content: 'Checking...' }).catch(() => {});
    try {
        const usersofusersxd = interaction.options._hoistedOptions[0].value.replace(/[<@>]/g, '');
        if (commandName == 'bloxlinkcheck') bloxlink.initialise(process.env.bloxlinkAPIKEY);
        const testxd = await bloxlink.SearchDiscordToRoblox(usersofusersxd);
        if (testxd.success) {
            interaction.editReply(`User is verified with bloxlink`).catch(() => {});
        }
    } catch (error) {
        try {
            interaction.editReply(`User is not verified with bloxlink`).catch(() => {});
        } catch (error) {
            console.log(`Discord is annoying another time, error: ${error}`);
        }
    }
};

//tottaly not trash code
