const { Client } = require('discord.js');
const fs = require('fs');
const CryptoJS = require('crypto-js');
const key = process.env.DONOTSHARETHIS;
const interactionServerCooldowns = new Map(); // get serverids for cooldown, should be above module.exports = async (client) => {
const interactionServerCooldownsPreventRL = new Map(); // get serverids for cooldown, should be above module.exports = async (client) => {
module.exports = {
    config: {
        name: 'setmodlogs',
        cooldown: 15000,
        aliases: ['setmodlog', 'setmlogs', 'setlogs', 'setlog'],
        description:
            'Set a channel for modlogs. If a message is deleted/edited, it will be logged into the specified channel. Server Command cooldown: 15 seconds.',
        usage: 'mb!setmodlogs [#channel]',
        permissions: ['MANAGE_GUILD', 'MANAGE_CHANNELS', 'MANAGE_MESSAGES'],
        botperms: ['MANAGE_GUILD', 'MANAGE_CHANNELS'],
        example: 'mb!setmodlogs #mod-logs',
        group: 'config',
    },
    run: async (client, message, args) => {
        const serverId = message.guild.id;
        if (interactionServerCooldowns.has(serverId)) {
            const remainingCooldown = interactionServerCooldowns.get(serverId) - Date.now();
            const remainingCooldownRL =
                interactionServerCooldownsPreventRL.get(serverId) - Date.now();
            if (remainingCooldownRL > 0) {
                return;
            }
            if (remainingCooldown > 0) {
                message
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
        const cooldownTime = 60000;
        interactionServerCooldowns.set(serverId, Date.now() + cooldownTime);
        setTimeout(() => {
            interactionServerCooldowns.delete(serverId);
        }, cooldownTime); // end of col
        try {
            await message.react('✅');
        } catch (error) {
            console.error(`Error reacting to message: ${error}`);
        }
        const channel =
            message.mentions.channels.first() || message.guild.channels.cache.get(args[0]);
        if (!channel) {
            try {
                message.reply(`${client.fail} Please mention a channel.`).catch(() => {});
            } catch (err) {}
            return;
        }
        let modLogsID = channel.id;
        const lchannel = message.guild.channels.cache.get(modLogsID);
        if (!lchannel) {
            try {
                message
                    .reply(
                        `${client.fail} YOU cannot setmodlogs for a other server in this server.`
                    )
                    .catch(() => {});
                return;
            } catch (err) {}
        }
        let file = {};
        try {
            const ciphertext = fs.readFileSync('./database/realmodlogs.txt', 'utf8');
            const plaintext = CryptoJS.AES.decrypt(ciphertext, key).toString(CryptoJS.enc.Utf8);
            file = JSON.parse(plaintext);
        } catch (err) {
            console.log(err);
        }
        file[message.guild.id] = {
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
            message
                .reply(`${client.success} Modlogs have been set to <#${channel.id}>.`)
                .catch(() => {});
        } catch (err) {}
    },
};
