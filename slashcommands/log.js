const fs = require('fs');
const CryptoJS = require('crypto-js');
const key = process.env.DONOTSHARETHIS;
const interactionServerCooldowns = new Map(); // get serverids for cooldown, should be above module.exports = async (client) => {
const interactionServerCooldownsPreventRL = new Map(); // get serverids for cooldown, should be above
module.exports = async (client, interaction) => {
    const commandName = interaction.commandName;
    if (!commandName == 'setmodlog') return;
    // startcooldown
    if (commandName === 'setmodlog') {
        const serverId = interaction.guild.id;
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
        const cooldownTimeRL = 5000;
        interactionServerCooldownsPreventRL.set(serverId, Date.now() + cooldownTimeRL);
        setTimeout(() => {
            interactionServerCooldownsPreventRL.delete(serverId);
        }, cooldownTimeRL); // end of col
        const cooldownTime = 15000;
        interactionServerCooldowns.set(serverId, Date.now() + cooldownTime);
        setTimeout(() => {
            interactionServerCooldowns.delete(serverId);
        }, cooldownTime); // end of col
    }
    if (commandName == 'setmodlog') {
        if (commandName == 'setmodlog') console.log(`Slash command ${commandName} ran`);
        if (commandName == 'setmodlog')
            try {
                const input = interaction.options._hoistedOptions[0].value;
                const onlyN = input.match(/\d+/)[0];

                const channelId = onlyN;
                const channel = interaction.guild.channels.cache.get(channelId);

                if (!channel) {
                    try {
                        await interaction.reply(
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
                        .reply(`${client.success} Modlogs have been set to <#${channel.id}>.`)
                        .catch(() => {});
                } catch (err) {}
            } catch (e) {}
    }
};
