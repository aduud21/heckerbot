const fs = require('fs');
const CryptoJS = require('crypto-js');
const key = process.env.DONOTSHARETHIS;
const interactionServerCooldowns = new Map(); // get serverids for cooldown, should be above module.exports = async (client) => {
const interactionServerCooldownsPreventRL = new Map(); // get serverids for cooldown, should be above
module.exports = async (interaction, client) => {
    const commandName = interaction.commandName;
    // startcooldown
    if (commandName === 'deldata') {
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
    if (commandName == 'deldata') {
        try {
            let msg = await interaction
                .reply(`${client.pending} Checking database (0%)`)
                .catch(() => {});
            const ciphertext = fs.readFileSync('./database/realmodlogs.txt', 'utf8');
            const bytes = CryptoJS.AES.decrypt(ciphertext, key);
            const filelog = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
            if (!filelog[interaction.guild.id]) {
                interaction
                    .editReply(
                        `${client.fail} The bot hasn't collected any data about your server yet`
                    )
                    .catch(() => {});
                return;
            }
            delete filelog[interaction.guild.id];
            const encryptedData = CryptoJS.AES.encrypt(JSON.stringify(filelog), key).toString();
            fs.writeFile('./database/realmodlogs.txt', encryptedData, (err) => {
                if (err) {
                    console.error(`Error writing to modlogs file: ${err}`);
                    interaction
                        .editReply(
                            `${client.fail} An error occurred internally in this bot, if this happens too much please let the owner of this bot know`
                        )
                        .catch(() => {});
                }
            });
            interaction
                .editReply(
                    `${client.success} Deleted all the data that the bot has collected from your server. If you do not like the bot please tell me why VIA the support server`
                )
                .catch(() => {});
        } catch (err) {
            console.error(`Error deleting server data: ${err}`);
        }
    }
};
