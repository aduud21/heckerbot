const creditCardRegex = /\b(?:\d{4}[ -]?){3}\d{4}\b/g;
const phoneNumberRegex = /(\+\d{1,2}\s?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}\b/g;
const { EmbedBuilder } = require('discord.js');
const { main } = require('../config/colors.json');
const CryptoJS = require('crypto-js');
const fs = require('fs');
const async = require('async');
const key = process.env.DONOTSHARETHIS;
let decryptedData;
const queues = new Map();
const queueTimeouts = new Map();
function delay(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}
function loadDecryptedData() {
    const ciphertext = fs.readFileSync('./database/realmodlogs.txt', 'utf8');
    const bytes = CryptoJS.AES.decrypt(ciphertext, key);
    decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
}
loadDecryptedData();
setInterval(loadDecryptedData, 10 * 1000);
module.exports = async (messageDelete) => {
    if (!messageDelete.content) return;
    if (messageDelete.channel.type === 'dm') return;
    if (messageDelete.author.bot) return;
    try {
        if (messageDelete.content.length < 3711) {
            if (!decryptedData[messageDelete.guild.id]) return;
            const modLogsID = decryptedData[messageDelete.guild.id].channel;
            const text = messageDelete.content;
            const filteredMessage = text
                .replace(creditCardRegex, '[personal info]')
                .replace(phoneNumberRegex, '[redacted]');
            let queue = queues.get(messageDelete.guild.id);
            if (!queue) {
                queue = async.queue(async (task) => {
                    const { messageDelete, modLogsID, EmbedBuilder } = task;
                    try {
                        await delay(2000);
                        await messageDelete.guild.channels.cache
                            .get(modLogsID)
                            .send({ embeds: [EmbedBuilder] });
                    } catch (error) {
                        delete decryptedData[messageDelete.guild.id];
                        console.log(
                            `Kinda Optimized space: Somebody put modlogs for a channel then deleted that channel or the bot no longer has access to the channel ${error}`
                        );
                    }
                }, 1);
                queues.set(messageDelete.guild.id, queue);
            }
            const timeoutId = queueTimeouts.get(messageDelete.guild.id);
            if (timeoutId) {
                await delay(1000);
            }
            queue.push({
                messageDelete,
                modLogsID,
                EmbedBuilder: new EmbedBuilder().setColor(main).setTitle('****Message log****')
                    .setDescription(`
            Message by <@!${messageDelete.author.id}>
            Message deleted in <#${messageDelete.channel.id}> 
            ||${filteredMessage}||
            Message ID: ${messageDelete.id}`),
            });
            const newTimeoutId = setTimeout(() => {
                queueTimeouts.delete(messageDelete.guild.id);
            }, 5000);
            queueTimeouts.set(messageDelete.guild.id, newTimeoutId);
        } else {
            if (!decryptedData[messageDelete.guild.id]) return;
            const modLogsID = decryptedData[messageDelete.guild.id].channel;
            const text = messageDelete.content;
            const filteredMessage = text
                .replace(creditCardRegex, '[personal info]')
                .replace(phoneNumberRegex, '[redacted]');
            let queue = queues.get(messageDelete.guild.id);
            if (!queue) {
                queue = async.queue(async (task) => {
                    const { messageDelete, modLogsID, EmbedBuilder } = task;
                    try {
                        await delay(2000);
                        await messageDelete.guild.channels.cache
                            .get(modLogsID)
                            .send({ embeds: [EmbedBuilder] });
                    } catch (error) {
                        delete decryptedData[messageDelete.guild.id];
                        console.log(
                            `Kinda Optimized space: Somebody put modlogs for a channel then deleted that channel or the bot no longer has access to the channel ${error}`
                        );
                    }
                }, 1);
                queues.set(messageDelete.guild.id, queue);
            }
            const timeoutId = queueTimeouts.get(messageDelete.guild.id);
            if (timeoutId) {
                await delay(1000);
            }
            queue.push({
                messageDelete,
                modLogsID,
                EmbedBuilder: new EmbedBuilder().setColor(main).setTitle('****Message log****')
                    .setDescription(`
            Message by <@${messageDelete.author.id}>
            Message deleted in <#${messageDelete.channel.id}> 
            <Message is too long to show>
            Message ID: ${messageDelete.id}`),
            });
            const newTimeoutId = setTimeout(() => {
                queueTimeouts.delete(messageDelete.guild.id);
            }, 5000);
            queueTimeouts.set(messageDelete.guild.id, newTimeoutId);
        }
    } catch (error) {
        if (decryptedData[messageDelete.guild.id]) {
            delete decryptedData[messageDelete.guild.id];
            console.log(
                `Kinda Optimized space: Somebody put modlogs for a channel then deleted that channel or the bot no longer has access to the channel ${error}`
            );
        }
    }
};
