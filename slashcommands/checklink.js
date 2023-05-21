const axios = require('axios');
const API_KEY = process.env.api;
const rankThreatLevel = (threatTypes) => {
    if (threatTypes.length === 0) {
        return 'This message is not supposed to be here lol';
    } else if (threatTypes.length <= 2) {
        return 'possibly malicious';
    } else if (threatTypes.length <= 4) {
        return 'likely malicious';
    } else {
        return 'very likely malicious';
    }
};
module.exports = async (interaction, client) => {
    const commandName = interaction.commandName;
    if (commandName == 'checklink') {
        var datareal = `${interaction.options._hoistedOptions[0].value}`;
        const regex = /(?:[A-z0-9](?:[A-z0-9-]{0,61}[A-z0-9])?\.)+[A-z0-9][A-z0-9-]{0,61}[A-z0-9]/;
        const match = datareal.match(regex);
        if (!match) {
            interaction
                .reply({ content: 'incorrect link, Please enter a vaild link!' })
                .catch(() => {});
            return;
        }
        await interaction.reply({ content: 'Checking...' }).catch(() => {});
        try {
            const outputLink = interaction.options._hoistedOptions[0].value
                .replace(/^https:\/\//, '')
                .replace(/http:\/\/|https:\/\//gi, '');
            const response = await axios.post(
                `https://safebrowsing.googleapis.com/v4/threatMatches:find?key=${API_KEY}`,
                {
                    client: {
                        clientId: `Discord ${client.user.username}`,
                        clientVersion: '0.0.1',
                    },
                    threatInfo: {
                        threatTypes: [
                            'MALWARE',
                            'SOCIAL_ENGINEERING',
                            'UNWANTED_SOFTWARE',
                            'POTENTIALLY_HARMFUL_APPLICATION',
                            'THREAT_TYPE_UNSPECIFIED',
                        ],
                        platformTypes: ['ANY_PLATFORM'],
                        threatEntryTypes: ['URL'],
                        threatEntries: [{ url: `${interaction.options._hoistedOptions[0].value}` }],
                    },
                }
            );
            if (response.data && response.data.matches && response.data.matches.length > 0) {
                const threatTypes = response.data.matches.map((match) => match.threatType);
                const rank = rankThreatLevel(threatTypes);

                interaction
                    .editReply(
                        `**${outputLink}** has been flagged as **${rank}**, Data is provided by [Google Safe Browsing API V4](<https://developers.google.com/terms/api-services-user-data-policy>).`
                    )
                    .catch(() => {});
            } else {
                const uAgent = `Discord ${client.user.username}`;
                axios
                    .post(
                        'https://anti-fish.bitflow.dev/check',
                        { message: outputLink },
                        { headers: { 'User-Agent': uAgent } }
                    )
                    .then(function (val) {
                        const a = val.data;
                        if (a.match) {
                            interaction
                                .editReply(
                                    `**${outputLink}** has been flagged as **dangerous**, Data is provided by [Google Safe Browsing API V4](<https://developers.google.com/terms/api-services-user-data-policy>) and was extra checked with anti-fish.` // https://anti-fish.bitflow.dev/
                                )
                                .catch(() => {});
                        } else {
                            interaction
                                .editReply(
                                    `**${outputLink}** is safe OR too new to be flagged, Data is provided by [Google Safe Browsing API V4](<https://developers.google.com/terms/api-services-user-data-policy>) and was extra checked with anti-fish.` // https://anti-fish.bitflow.dev/
                                )
                                .catch(() => {});
                        }
                    })
                    .catch((e) => {
                        if (e.response && e.response.status === 404) {
                            interaction
                                .editReply(
                                    `**${outputLink}** is safe OR too new to be flagged, Data is provided by [Google Safe Browsing API V4](<https://developers.google.com/terms/api-services-user-data-policy>) and was extra checked with anti-fish.`
                                )
                                .catch(() => {});
                            return;
                        }
                        interaction
                            .editReply(
                                `Sorry, an error occurred while checking the URL, This could be that the bot was ratelimited OR you provided a link that does not exist.`
                            )
                            .catch(() => {});
                    });
            }
        } catch {}
    }
};
