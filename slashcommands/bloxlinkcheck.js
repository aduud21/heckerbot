// CHANGING THE CODE BELOW CAN RESULT IN THE BOT NOT WORKING
// latest discord api version https://discord.com/developers/docs/reference
const bloxlink = require('bloxlink-sdk');
const REALLYMAXHEARINGREALLY1234REAL = 100;
require('events').EventEmitter.prototype._maxListeners = REALLYMAXHEARINGREALLY1234REAL;
require('events').defaultMaxListeners = REALLYMAXHEARINGREALLY1234REAL;
// ONLY REMOVE THE ABOVE CODE IF YOU KNOW WHAT YOUE DOING
const { Client } = require('discord.js');
const axios = require('axios');
const interactionCooldowns = new Map(); // get userids for cooldown, should be above module.exports = async (client) => {
module.exports = async (client) => {
    client.ws.on('INTERACTION_CREATE', async (interaction) => {
        const commandId = interaction.data.id;
        const commandName = interaction.data.name;
        // startcooldown
        if (commandName === 'bloxlinkcheck') {
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
            }, cooldownTime); // end of col
        }
        if (commandName == 'bloxlinkcheck') {
            if (commandName == 'bloxlinkcheck')
                client.api.interactions(interaction.id, interaction.token).callback.post({
                    data: {
                        type: 5,
                    },
                });
        }
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
                    return channel.messages.fetch(answer.data.id);
                });
        };
        try {
            const usersofusersxd = interaction.data.options[0].value.replace(/[<@>]/g, '');
            if (commandName == 'bloxlinkcheck') bloxlink.initialise(process.env.bloxlinkAPIKEY);
            const testxd = await bloxlink.SearchDiscordToRoblox(usersofusersxd);
            if (testxd.success) {
                if (commandName == 'bloxlinkcheck')
                    editInteraction(client, interaction, `User is verified with bloxlink`).catch(
                        () => {}
                    );
            }
        } catch (error) {
            try {
                if (commandName == 'bloxlinkcheck')
                    editInteraction(
                        client,
                        interaction,
                        `User is not verified with bloxlink`
                    ).catch(() => {});
            } catch (error) {
                console.log(`Discord is annoying another time, error: ${error}`);
            }
        }

        if (commandName == 'bloxlinkcheck') console.log(`Slash command ${commandName} ran`);
    });
};

//tottaly not trash code
