const { EmbedBuilder } = require('discord.js');
const { main } = require('../config/colors.json');

module.exports = (client, oldMessage, newMessage) => {
    const CryptoJS = require('crypto-js');
    const fs = require('fs');
    const async = require('async');
    const key = process.env.DONOTSHARETHIS;
    const queue = async.queue(async (task) => {
        const { newMessage, modLogsID, EmbedBuilder } = task;
        try {
            await newMessage.guild.channels.cache.get(modLogsID).send({ embeds: [EmbedBuilder] });
        } catch (error) {
            console.log(error);
        }
    }, 1);

    let decryptedData;

    function loadDecryptedData() {
        const ciphertext = fs.readFileSync('./database/realmodlogs.txt', 'utf8');
        const bytes = CryptoJS.AES.decrypt(ciphertext, key);
        decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    }

    loadDecryptedData();
    setInterval(loadDecryptedData, 10 * 1000);

    try {
        if (newMessage.author.bot) {
            return;
        }
    } catch {}

    if (newMessage.content === oldMessage.content) return;
    if (oldMessage === null) oldMessage = `unknown message`;

    try {
        let flyMessage = `${oldMessage.content}${newMessage.content}`;
        if (flyMessage.length < 3811) {
            if (newMessage.channel.type === 'dm') return;
            if (!decryptedData[newMessage.guild.id]) return;
            let modLogsID = decryptedData[newMessage.guild.id].channel;
            queue.push({
                newMessage,
                modLogsID,
                EmbedBuilder: new EmbedBuilder().setColor(main).setTitle('****Message log****')
                    .setDescription(`
Message by <@!${newMessage.author.id}>
Message edited in <#${newMessage.channel.id}> 
Before: 
||${oldMessage.content}||
After: 
||${newMessage.content}||
Message ID: ${newMessage.id}`),
            });
        } else {
            if (newMessage.channel.type === 'dm') return;
            if (!decryptedData[newMessage.guild.id]) return;
            let modLogsID = decryptedData[newMessage.guild.id].channel;
            queue.push({
                newMessage,
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
                'Kinda Optimized space: Somebody put modlogs for a channel then deleted that channel or the bot no longer has access to the channel'
            );
        }
    }
};
