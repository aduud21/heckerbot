const https = require('https');
const interactionCooldownsRL = new Map();
const interactionCooldownsRLPrevent = new Map();
const cooldownTimeRL = 12500;
module.exports = async (interaction) => {
    if (interactionCooldownsRL.has(interaction.member.user.id)) {
        const remainingCooldownRL =
            interactionCooldownsRL.get(interaction.member.user.id) - Date.now();
        const remainingCooldownRLPrevent =
            interactionCooldownsRLPrevent.get(interaction.member.user.id) - Date.now();
        if (remainingCooldownRLPrevent > 0) {
            return;
        }
        if (remainingCooldownRL > 0) {
            interactionCooldownsRLPrevent.set(
                interaction.member.user.id,
                Date.now() + cooldownTimeRL
            );
            interaction
                .reply(
                    `Please wait ${
                        remainingCooldownRL + cooldownTimeRL
                    }ms to use this command again, this cooldown is to prevent special abuse.`
                )
                .catch(() => {});
            setTimeout(() => {
                interactionCooldownsRLPrevent.delete(interaction.member.user.id);
            }, cooldownTimeRL);
            return;
        }
    }
    interactionCooldownsRL.set(interaction.member.user.id, Date.now() + cooldownTimeRL);
    setTimeout(() => {
        interactionCooldownsRL.delete(interaction.member.user.id);
    }, cooldownTimeRL);
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
        if (
            !interaction.options._hoistedOptions[0].value.replace(/[<@>]/g, '').match(/^\d+$/g) &&
            !interaction.options._hoistedOptions[0].value
                .replace(/[<@>]/g, '')
                .match(/^<@!?(\d+)>$/g)
        ) {
            interaction
                .editReply(
                    'Invalid input. Please provide a user mention or a interaction.member.user.id.'
                )
                .catch(() => {});
            return;
        }

        const options = {
            hostname: 'api.blox.link',
            path: `/v4/public/discord-to-roblox/${interaction.options._hoistedOptions[0].value.replace(
                /[<@>]/g,
                ''
            )}`,
            headers: {
                Authorization: process.env.bloxlinkAPIKEY,
                'User-Agent': `Discord bot`,
                'Accept-Language': 'en-US',
            },
        };

        const req = https.get(options, (response) => {
            if (!response.connection.encrypted) {
                console.log('MAJOR SECURITY VUR FOUND: BLOXLINK CONNECTION IS NOT SECURE');
            }
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
                        .editReply('An error occurred while processing the command (429?).')
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
