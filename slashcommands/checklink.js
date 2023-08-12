const axios = require('axios');

module.exports = async (interaction, client) => {
    const outputLink = interaction.options._hoistedOptions[0].value
        .replace(/^https:\/\//, '')
        .replace(/http:\/\/|https:\/\//gi, '');

    try {
        const regex =
            /^(?:(?:https?):\/\/)?(?:[A-Za-z0-9](?:[A-Za-z0-9-]{0,61}[A-Za-z0-9])?\.)+[A-Za-z0-9][A-Za-z0-9-]{0,61}[A-Za-z0-9](?:\/.*)?$/;
        const match = interaction.options._hoistedOptions[0].value.match(regex);
        if (!match) {
            interaction.reply({
                content: '❌ -> Incorrect link. Please enter a valid link!',
            });
            return;
        }

        if (interaction.options._hoistedOptions[0].value.length > 255) {
            interaction.reply({ content: '❌ -> Link too long! Character limit: 255' });
            return;
        }
        if (!process.env.api) {
            interaction.reply({
                content:
                    '❌ -> The environment file (process.env.api) was not found. This command requires it for Google Safe Browsing.',
            });
            return;
        }

        await interaction.reply({ content: '⏳ -> Checking...' });

        const safeBrowsingResponse = await axios.post(
            `https://safebrowsing.googleapis.com/v4/threatMatches:find?key=${process.env.api}`,
            {
                client: {
                    clientId: `Discord bot ${client.user.tag}`,
                    clientVersion: '1.0.0',
                },
                threatInfo: {
                    threatTypes: [
                        'MALWARE',
                        'SOCIAL_ENGINEERING',
                        'UNWANTED_SOFTWARE',
                        'POTENTIALLY_HARMFUL_APPLICATION',
                        'THREAT_TYPE_UNSPECIFIED',
                    ],
                    platformTypes: ['ANY_PLATFORM', 'PLATFORM_TYPE_UNSPECIFIED'],
                    threatEntryTypes: ['URL'],
                    threatEntries: [{ url: interaction.options._hoistedOptions[0].value }],
                },
            }
        );

        if (
            safeBrowsingResponse.data &&
            safeBrowsingResponse.data.matches &&
            safeBrowsingResponse.data.matches.length > 0
        ) {
            const threatTypes = safeBrowsingResponse.data.matches.map((match) => match.threatType);
            interaction.editReply(
                `**${outputLink}** has been flagged as **${threatTypes}** (Dangerous) by Google Safe Browsing. Data is provided by [anti-fish api](<https://anti-fish.bitflow.dev/>) and [Google Safe Browsing API V4](<https://developers.google.com/terms/api-services-user-data-policy>)`
            );
            return;
        } else {
            const antiFishResponse = await axios.post(
                `https://anti-fish.bitflow.dev/check`,
                {
                    message: interaction.options._hoistedOptions[0].value,
                },
                {
                    headers: {
                        'User-Agent': `Discord bot ${client.user.tag}`,
                    },
                }
            );

            if (antiFishResponse.data.match) {
                interaction.editReply(
                    `**${outputLink}** has been flagged as **dangerous** by Anti-Fish. Data is provided by [anti-fish api](<https://anti-fish.bitflow.dev/>) and [Google Safe Browsing API V4](<https://developers.google.com/terms/api-services-user-data-policy>)`
                );
                return;
            } else {
                interaction.editReply(
                    `**${outputLink}** is safe OR too new to be flagged. Data is provided by [anti-fish api](<https://anti-fish.bitflow.dev/>) and [Google Safe Browsing API V4](<https://developers.google.com/terms/api-services-user-data-policy>)`
                );
                return;
            }
        }
    } catch (e) {
        if (e.response && e.response.status === 404) {
            interaction.editReply(
                `**${outputLink}** is safe OR too new to be flagged. Data is provided by [anti-fish api](<https://anti-fish.bitflow.dev/>) and [Google Safe Browsing API V4](<https://developers.google.com/terms/api-services-user-data-policy>)`
            );
            return;
        }
        console.error(e);
        interaction.editReply('An error occurred while checking the URL.');
    }
};
