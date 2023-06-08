const { EmbedBuilder } = require('discord.js');
const { main } = require('../config/colors.json');
const CryptoJS = require('crypto-js');
const fs = require('fs');
const async = require('async');
const key = process.env.DONOTSHARETHIS;
const creditCardRegex = /\b(?:\d{4}[ -]?){3}\d{4}\b/g;
const phoneNumberRegex = /(\+\d{1,2}\s?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}\b/g;
let decryptedData;
const queue = async.queue(async (task) => {
    const { message, newMessage, modLogsID, EmbedBuilder } = task;
    try {
        await newMessage.guild.channels.cache.get(modLogsID).send({ embeds: [EmbedBuilder] });
    } catch (error) {
        console.log(error);
    }
}, 1);

function loadDecryptedData() {
    const ciphertext = fs.readFileSync('./database/realmodlogs.txt', 'utf8');
    const bytes = CryptoJS.AES.decrypt(ciphertext, key);
    decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
}

loadDecryptedData();
setInterval(loadDecryptedData, 10 * 1000);

module.exports = (oldMessage, newMessage) => {
    if (newMessage.content === oldMessage.content) return;
    try {
        if (newMessage.author.bot) {
            return;
        }
    } catch {}

    if (oldMessage === null) oldMessage = `unknown message`;

    try {
        let flyMessage = `${oldMessage.content}${newMessage.content}`;
        if (flyMessage.length < 3811) {
            if (newMessage.channel.type === 'dm') return;
            if (!decryptedData[newMessage.guild.id]) return;
            let modLogsID = decryptedData[newMessage.guild.id].channel;
            const text = newMessage.content;
            let filteredMessage = text
                .replace(creditCardRegex, '[personal info]')
                .replace(phoneNumberRegex, '[redacted]');
            let filteredMessageold = oldMessage.content
                .replace(creditCardRegex, '[personal info]')
                .replace(phoneNumberRegex, '[redacted]');
            queue.push({
                newMessage,
                message: filteredMessage,
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
        } else {
            if (!decryptedData[newMessage.guild.id]) return;
            let modLogsID = decryptedData[newMessage.guild.id].channel;
            const text = newMessage.content;
            let filteredMessage = text
                .replace(creditCardRegex, '[personal info]')
                .replace(phoneNumberRegex, '[redacted]');
            queue.push({
                newMessage,
                message: filteredMessage,
                modLogsID,
                EmbedBuilder: new EmbedBuilder().setColor(main).setTitle('****Message log****')
                    .setDescription(`
Message by <@${newMessage.author.id}>
Message edited in <#${newMessage.channel.id}> 
<Message is too long to show>
Message ID: ${newMessage.id}`),
            });
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
