const bloxlink = require('bloxlink-sdk');
module.exports = async (interaction) => {
    const commandName = interaction.commandName;
    await interaction.reply({ content: 'Checking...' }).catch(() => {});
    try {
        const usersofusersxd = interaction.options._hoistedOptions[0].value.replace(/[<@>]/g, '');
        if (commandName == 'bloxlinkcheck') bloxlink.initialise(process.env.bloxlinkAPIKEY);
        const testxd = await bloxlink.SearchDiscordToRoblox(usersofusersxd);
        if (testxd.success) {
            if (commandName == 'bloxlinkcheck')
                interaction.editReply(`User is verified with bloxlink`).catch(() => {});
        }
    } catch (error) {
        try {
            if (commandName == 'bloxlinkcheck')
                interaction.editReply(`User is not verified with bloxlink`).catch(() => {});
        } catch (error) {
            console.log(`Discord is annoying another time, error: ${error}`);
        }
    }

    if (commandName == 'bloxlinkcheck') console.log(`Slash command ${commandName} ran`);
};

//tottaly not trash code
