// CHANGING THE CODE BELOW CAN RESULT IN THE BOT NOT WORKING
const REALLYMAXHEARINGREALLY1234REAL = 100;
require('events').EventEmitter.prototype._maxListeners = REALLYMAXHEARINGREALLY1234REAL;
require('events').defaultMaxListeners = REALLYMAXHEARINGREALLY1234REAL;
// ONLY REMOVE THE ABOVE CODE IF YOU KNOW WHAT YOUE DOING
const { Client } = require('discord.js');
const interactionCooldowns = new Map(); // get userids for cooldown, should be above module.exports = async (client) => {
module.exports = async (client) => {
    client.ws.on('INTERACTION_CREATE', (interaction) => {
        const commandId = interaction.data.id;
        const commandName = interaction.data.name;
        // startcooldown
        if (commandName === 'rps') {
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
        if (commandName == 'rps') {
            const gamereal = require('../utils/structure/exports/json/game.json');
            const item = gamereal[Math.floor(Math.random() * gamereal.length)];
            const filter = (response) => {
                return item.answers();
            };
            if (commandName == 'rps') console.log(`Slash command ${commandName} ran`);
            if (commandName == 'rps')
                client.api
                    .interactions(interaction.id, interaction.token)
                    .callback.post({
                        data: {
                            type: 4,
                            data: {
                                content: `${item.question}`,
                            },
                        },
                    })
                    .catch(() => {});
        }
    });
};
