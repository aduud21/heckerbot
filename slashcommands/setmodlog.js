const fs = require('fs');
const CryptoJS = require('crypto-js');
const key = process.env.DONOTSHARETHIS;
const interactionServerCooldowns = new Map();
const interactionServerCooldownsPreventRL = new Map();
const MAX_MODLOGS_PER_SERVER = 1; // Maximum number of modlogs allowed per server

module.exports = async (interaction, client) => {
    const commandName = interaction.commandName;
    const serverId = interaction.guild.id;

    // startcooldown
    if (commandName === 'setmodlog') {
        if (interactionServerCooldowns.has(serverId)) {
            const remainingCooldown = interactionServerCooldowns.get(serverId) - Date.now();
            const remainingCooldownRL =
                interactionServerCooldownsPreventRL.get(serverId) - Date.now();
            if (remainingCooldownRL > 0) {
                return;
            }
            if (remainingCooldown > 0) {
                interaction
                    .reply(
                        `Please wait ${remainingCooldown}ms to use this server command as somebody else did in the server...`
                    )
                    .catch(() => {});
                return;
            }
        }

        const currentModlogs = interactionServerCooldowns.size;
        if (currentModlogs >= MAX_MODLOGS_PER_SERVER) {
            interaction.reply(
                `The maximum number of modlogs has already been set for this server.`
            );
            return;
        }

        const cooldownTimeRL = 5000;
        interactionServerCooldownsPreventRL.set(serverId, Date.now() + cooldownTimeRL);
        setTimeout(() => {
            interactionServerCooldownsPreventRL.delete(serverId);
        }, cooldownTimeRL);

        const cooldownTime = 15000;
        interactionServerCooldowns.set(serverId, Date.now() + cooldownTime);
        setTimeout(() => {
            interactionServerCooldowns.delete(serverId);
        }, cooldownTime);
    }

    if (commandName === 'setmodlog') {
        try {
            try {
                const input = interaction.options._hoistedOptions[0].value;
                const onlyN = input.match(/\d+/)[0];

                const channelId = onlyN;
                const channel = interaction.guild.channels.cache.get(channelId);

                if (!channel) {
                    try {
                        interaction.reply(
                            `${client.fail} YOU cannot setmodlogs for a other server in this server.`
                        );
                    } catch (error) {
                        console.error('Error replying to interaction:', error);
                    }
                    return;
                }
                let file = {};
                try {
                    const ciphertext = fs.readFileSync('./database/realmodlogs.txt', 'utf8');
                    const plaintext = CryptoJS.AES.decrypt(ciphertext, key).toString(
                        CryptoJS.enc.Utf8
                    );
                    file = JSON.parse(plaintext);
                } catch (err) {
                    console.log(err);
                }
                if (
                    file[interaction.guild.id] &&
                    file[interaction.guild.id].channel == channel.id
                ) {
                    try {
                        interaction.reply(
                            `${client.fail} YOU cannot setmodlogs for a channel that has already been selected for it`
                        );
                    } catch (error) {
                        console.error('Error replying to interaction:', error);
                    }
                    return;
                }
                file[interaction.guild.id] = {
                    channel: channel.id,
                };
                const ciphertext = CryptoJS.AES.encrypt(JSON.stringify(file), key).toString();
                fs.writeFile('./database/realmodlogs.txt', ciphertext, (err) => {
                    if (err) {
                        console.log(err);
                        return;
                    }
                });
                try {
                    interaction
                        .reply(
                            `${client.success} Modlogs have been set to <#${channel.id}>. Please wait about 10 seconds for it to take effect...`
                        )
                        .catch(() => {});
                } catch (err) {}
            } catch (e) {}
        } catch (error) {
            console.error('Error replying to interaction:', error);
        }
    }
};
