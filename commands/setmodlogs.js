const { Client } = require("discord.js");
const fs = require('fs');
const CryptoJS = require('crypto-js');
const key = process.env.DONOTSHARETHIS;

module.exports = {
    config: {
        name: "setmodlogs",
        cooldown: 5000,
        aliases: ['setmodlog', 'setmlogs', 'setlogs', 'setlog'],
        description: "Set a channel for modlogs. If a message is deleted/edited, it will be logged into the specified channel. Command cooldown: 5 seconds.",
        usage: "mb!setmodlogs [#channel]",
        permissions: ['MANAGE_GUILD', 'MANAGE_CHANNELS'],
        botperms: ['MANAGE_GUILD', 'MANAGE_CHANNELS'],
        example: 'mb!setmodlogs #mod-logs',
        group: 'config'
    },
    run: async (client, message, args) => {
        console.log(`[COMMAND LOG] setmodlogs command ran on: ${message.guild.name} ID: ${message.guild.id}`);
        try {
            await message.react('✅');
        } catch (error) {
            console.error(`Error reacting to message: ${error}`);
        }
        const channel = message.mentions.channels.first() || message.guild.channels.cache.get(args[0]);
        if (!channel) {
            try { 
                message.reply(`Please mention a channel.`).catch(() => {})
            } catch (err) {}
            return;
        }
        let modLogsID = channel.id
        const lchannel = message.guild.channels.cache.get(modLogsID)
        if (!lchannel) {
            try { 
                message.reply(`YOU cannot setmodlogs for a other server in this server.`).catch(() => {})
                return;
            } catch (err) {}
        }
        let file = {};
        try {
            const ciphertext = fs.readFileSync('./database/realmodlogs.txt', 'utf8')
            const plaintext = CryptoJS.AES.decrypt(ciphertext, key).toString(CryptoJS.enc.Utf8)
            file = JSON.parse(plaintext)
        } catch (err) {
            console.log(err)
        }
        file[message.guild.id] = {
            channel: channel.id
        };
        const ciphertext = CryptoJS.AES.encrypt(JSON.stringify(file), key).toString()
        fs.writeFile('./database/realmodlogs.txt', ciphertext, (err) => {
            if (err) {
                console.log(err);
                return;
            }
            console.log('Modlogs encrypted & saved.')
        });
        try {
            message.reply(`${client.success} Modlogs have been set to <#${channel.id}>.`).catch(() => {})
        } catch (err) {}
    }
}