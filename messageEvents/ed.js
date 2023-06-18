const { EmbedBuilder } = require('discord.js');
const { main } = require('../config/colors.json');
const CryptoJS = require('crypto-js');
const fs = require('fs');
const async = require('async');
const key = process.env.DONOTSHARETHIS;
const creditCardRegex = /\b(?:\d{4}[ -]?){3}\d{4}\b/g;
const phoneNumberRegex = /(\+\d{1,2}\s?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}\b/g;
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
module.exports = async (oldMessage, newMessage) => {
    if (!oldMessage.content) return;
    if (!newMessage.content) return;
    if (newMessage.content === oldMessage.content) return;
    try {
        if (newMessage.author.bot) {
            return;
        }
    } catch {}
    if (oldMessage === null) oldMessage = 'unknown message';
    try {
        let flyMessage = `${oldMessage.content}${newMessage.content}`;
        if (flyMessage.length < 3711) {
            if (newMessage.channel.type === 'dm') return;
            if (!decryptedData[newMessage.guild.id]) return;
            const modLogsID = decryptedData[newMessage.guild.id].channel;
            const text = newMessage.content;
            const filteredMessage = text
                .replace(creditCardRegex, '[personal info]')
                .replace(phoneNumberRegex, '[redacted]');
            let filteredMessageold = oldMessage.content
                .replace(creditCardRegex, '[personal info]')
                .replace(phoneNumberRegex, '[redacted]');
            let queue = queues.get(newMessage.guild.id);
            if (!queue) {
                queue = async.queue(async (task) => {
                    const { newMessage, modLogsID, EmbedBuilder } = task;
                    try {
                        await newMessage.guild.channels.cache
                            .get(modLogsID)
                            .send({ embeds: [EmbedBuilder] });
                    } catch (error) {
                        console.log(error);
                    }
                }, 1);
                queues.set(newMessage.guild.id, queue);
            }
            const timeoutId = queueTimeouts.get(newMessage.guild.id);
            if (timeoutId) {
                await delay(5000);
                clearTimeout(timeoutId);
            }
            queue.push({
                newMessage,
                modLogsID,
                EmbedBuilder: new EmbedBuilder().setColor(main).setTitle('****Message log****')
                    .setDescription(`
            Message by <@!${newMessage.author.id}>
            Message edited in <#${newMessage.channel.id}> 
            Before: 
            ||${filteredMessageold}||
            After: 
            ||${filteredMessage}||
            Message ID: ${newMessage.id}`),
            });
            const newTimeoutId = setTimeout(() => {
                queueTimeouts.delete(newMessage.guild.id);
            }, 5000);
            queueTimeouts.set(newMessage.guild.id, newTimeoutId);
        } else {
            if (!decryptedData[newMessage.guild.id]) return;
            const modLogsID = decryptedData[newMessage.guild.id].channel;
            const text = newMessage.content;
            const filteredMessage = text
                .replace(creditCardRegex, '[personal info]')
                .replace(phoneNumberRegex, '[redacted]');
            let queue = queues.get(newMessage.guild.id);
            if (!queue) {
                queue = async.queue(async (task) => {
                    const { newMessage, modLogsID, EmbedBuilder } = task;
                    try {
                        await newMessage.guild.channels.cache
                            .get(modLogsID)
                            .send({ embeds: [EmbedBuilder] });
                    } catch (error) {
                        console.log(error);
                    }
                }, 1);
                queues.set(newMessage.guild.id, queue);
            }
            if (timeoutId) {
                await delay(5000);
                clearTimeout(timeoutId);
            }
            queue.push({
                newMessage,
                modLogsID,
                EmbedBuilder: new EmbedBuilder().setColor(main).setTitle('****Message log****')
                    .setDescription(`
            Message by <@!${newMessage.author.id}>
            Message edited in <#${newMessage.channel.id}> 
            <Message is too long to show>
            Message ID: ${newMessage.id}`),
            });
            const newTimeoutId = setTimeout(() => {
                queueTimeouts.delete(newMessage.guild.id);
            }, 5000);
            queueTimeouts.set(newMessage.guild.id, newTimeoutId);
        }
    } catch (error) {
        if (decryptedData[newMessage.guild.id]) {
            delete decryptedData[newMessage.guild.id];
            console.log(
                `Kinda Optimized space: Somebody put modlogs for a channel then deleted that channel or the bot no longer has access to the channel ${error}`
            );
        }
    }
};
