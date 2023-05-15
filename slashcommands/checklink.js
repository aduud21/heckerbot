// CHANGING THE CODE BELOW CAN RESULT IN THE BOT NOT WORKING!
// latest discord api version https://discord.com/developers/docs/reference
const REALLYMAXHEARINGREALLY1234REAL = 100;
require('events').EventEmitter.prototype._maxListeners = REALLYMAXHEARINGREALLY1234REAL;
require('events').defaultMaxListeners = REALLYMAXHEARINGREALLY1234REAL;
// ONLY REMOVE THE ABOVE CODE IF YOU KNOW WHAT YOUE DOING
const { Client } = require('discord.js');
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
const interactionCooldowns = new Map(); // get userids for cooldown, should be above module.exports = async (client) => {
module.exports = async (client) => {
    client.ws.on('INTERACTION_CREATE', async (interaction) => {
        const commandId = interaction.data.id;
        const commandName = interaction.data.name;
        // startcooldown
        if (commandName === 'checklink') {
            const userId = interaction.member.user.id;
            if (interactionCooldowns.has(userId)) {
                const remainingCooldown = interactionCooldowns.get(userId) - Date.now();
                if (remainingCooldown > 0) {
                    return;
                }
            }
            const cooldownTime = 5000;
            interactionCooldowns.set(userId, Date.now() + cooldownTime);
            setTimeout(() => {
                interactionCooldowns.delete(userId);
            }, cooldownTime); // end of cool
        }
        if (commandName == 'checklink') {
            client.api.interactions(interaction.id, interaction.token).callback.post({
                data: {
                    type: 5,
                    flags: 64,
                },
            });

            const editInteraction = async (client, interaction, response) => {
                const data =
                    typeof response === 'object' ? { embeds: [response] } : { content: response };
                const channel = await client.channels.resolve(interaction.channel_id);
                return axios
                    .patch(
                        `https://discord.com/api/v10/webhooks/${client.user.id}/${interaction.token}/messages/@original`,
                        data
                    )
                    .then((answer) => {
                        try {
                            return channel.messages.fetch(answer.data.id);
                        } catch (err) {
                            console.log(err);
                            return;
                        }
                    });
            };
            var datareal = `${interaction.data.options[0].value}`;
            const regex = /^\S+\.\S+$/;
            const match = datareal.match(regex);
            if (!match) {
                editInteraction(
                    client,
                    interaction,
                    'incorrect link, Please enter a vaild link!'
                ).catch(() => {});
                return;
            }

            try {
                const outputLink = interaction.data.options[0].value
                    .replace(/^https:\/\//, '')
                    .replace(/http:\/\/|https:\/\//gi, '');
                const response = await axios.post(
                    `https://safebrowsing.googleapis.com/v4/threatMatches:find?key=${API_KEY}`,
                    {
                        client: {
                            clientId: 'discord-bot-hecker',
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
                            threatEntries: [{ url: `${interaction.data.options[0].value}` }],
                        },
                    }
                );
                if (response.data && response.data.matches && response.data.matches.length > 0) {
                    const threatTypes = response.data.matches.map((match) => match.threatType);
                    const rank = rankThreatLevel(threatTypes);
                    editInteraction(
                        client,
                        interaction,
                        `**${outputLink}** has been flagged as **${rank}**, Data is provided by [Google Safe Browsing API V4](<https://developers.google.com/terms/api-services-user-data-policy>).`
                    ).catch(() => {});
                } else {
                    const uAgent = `${client.user.username}`;
                    axios
                        .post(
                            'https://anti-fish.bitflow.dev/check',
                            { message: outputLink },
                            { headers: { 'User-Agent': uAgent } }
                        )
                        .then(function (val) {
                            const a = val.data;
                            if (a.match) {
                                editInteraction(
                                    client,
                                    interaction,
                                    `**${outputLink}** has been flagged as **dangerous**, Data is provided by [Google Safe Browsing API V4](<https://developers.google.com/terms/api-services-user-data-policy>) and was extra checked with anti-fish.` // https://anti-fish.bitflow.dev/
                                ).catch(() => {});
                            } else {
                                editInteraction(
                                    client,
                                    interaction,
                                    `**${outputLink}** is safe OR too new to be flagged, Data is provided by [Google Safe Browsing API V4](<https://developers.google.com/terms/api-services-user-data-policy>) and was extra checked with anti-fish.` // https://anti-fish.bitflow.dev/
                                ).catch(() => {});
                            }
                        })
                        .catch((e) => {
                            if (e.response && e.response.status === 404) {
                                editInteraction(
                                    client,
                                    interaction,
                                    `**${outputLink}** is safe OR too new to be flagged, Data is provided by [Google Safe Browsing API V4](<https://developers.google.com/terms/api-services-user-data-policy>) and was extra checked with anti-fish.`
                                ).catch(() => {});
                                return;
                            }
                            editInteraction(
                                client,
                                interaction,
                                `Sorry, an error occurred while checking the URL, This could be that the bot was ratelimited OR you provided a link that does not exist.`
                            ).catch(() => {});
                        });
                }
            } catch {}
        }
    });
};
