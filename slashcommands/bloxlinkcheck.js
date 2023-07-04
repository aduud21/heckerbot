const https = require('https');

module.exports = async (interaction) => {
    const commandName = interaction.commandName;
    if (!process.env.bloxlinkAPIKEY) {
        interaction
            .reply({
                content:
                    'No API key is specified, The developer(s) of this bot must add the API key for this command to work.',
            })
            .catch(() => {});
        return;
    }
    await interaction.reply({ content: `⏳ -> Checking...` }).catch(() => {});

    try {
        const usersofusersxd = interaction.options._hoistedOptions[0].value.replace(/[<@>]/g, '');

        if (!usersofusersxd.match(/^\d+$/g) && !usersofusersxd.match(/^<@!?(\d+)>$/g)) {
            interaction
                .editReply('Invalid input. Please provide a user mention or a userid.')
                .catch(() => {});
            return;
        }

        const options = {
            hostname: 'api.blox.link',
            path: `/v4/public/discord-to-roblox/${usersofusersxd}`,
            headers: { Authorization: process.env.bloxlinkAPIKEY },
        };

        const req = https.get(options, (response) => {
            let data = '';
            response.on('data', (chunk) => {
                data += chunk;
            });
            response.on('end', () => {
                const responseData = JSON.parse(data);
                if (response.statusCode === 200) {
                    if (responseData.robloxID) {
                        interaction
                            .editReply('User is verified with Bloxlink (200)')
                            .catch(() => {});
                        return;
                    } else {
                        interaction.editReply('User is not verified with Bloxlink').catch(() => {});
                        return;
                    }
                } else if (response.statusCode === 404) {
                    interaction
                        .editReply('User is not verified with Bloxlink (404)')
                        .catch(() => {});
                } else {
                    interaction
                        .editReply('An error occurred while processing the command.')
                        .catch(() => {});
                }
            });
        });
        req.on('error', (error) => {
            console.log(`An error occurred: ${error}`);
            interaction
                .editReply('An error occurred while processing the command.')
                .catch(() => {});
        });
    } catch (error) {
        console.log(`An error occurred: ${error}`);
        interaction.editReply('An error occurred while processing the command.').catch(() => {});
    }
};
