const CryptoJS = require('crypto-js');
const fs = require('fs');
const async = require('async');
const key = process.env.DONOTSHARETHIS;
const { EmbedBuilder } = require('discord.js');
const { main } = require('../config/colors.json');
let decryptedData;
function loadDecryptedData() {
    const ciphertext = fs.readFileSync('./database/realmodlogs.txt', 'utf8');
    const bytes = CryptoJS.AES.decrypt(ciphertext, key);
    decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
}

loadDecryptedData();
setInterval(loadDecryptedData, 10 * 1000);
const queue = async.queue(async (task) => {
    const { messageDelete, modLogsID, embeds } = task;
    try {
        await messageDelete.guild.channels.cache.get(modLogsID).send({ embeds: [embeds] });
    } catch (error) {
        console.log(error);
    }
}, 1);
module.exports = (messageDelete) => {
    if (messageDelete.channel.type === 'dm') return;

    try {
        if (messageDelete.author.bot) {
            return;
        }
    } catch {}

    try {
        if (messageDelete.content.length < 3811) {
            if (!decryptedData[messageDelete.guild.id]) return;
            let modLogsID = decryptedData[messageDelete.guild.id].channel;
            queue.push({
                messageDelete,
                modLogsID,
                embeds: new EmbedBuilder().setColor(main).setTitle('****Message log****')
                    .setDescription(`
Message by <@!${messageDelete.author.id}>
Message deleted in <#${messageDelete.channel.id}>
Message:
||${messageDelete.content}||
Message ID: ${messageDelete.id}`),
            });
        } else {
            if (!decryptedData[messageDelete.guild.id]) return;
            let modLogsID = decryptedData[messageDelete.guild.id].channel;
            queue.push({
                messageDelete,
                modLogsID,
                embeds: new EmbedBuilder().setColor(main).setTitle('****Message log****')
                    .setDescription(`
Message by <@${messageDelete.author.id}>
Message deleted in <#${messageDelete.channel.id}> 
<Message is too long to show>
Message ID: ${messageDelete.id}`),
            });
        }
    } catch (error) {
        if (decryptedData[messageDelete.guild.id]) {
            delete decryptedData[messageDelete.guild.id];
            console.log(
                'Kinda Optimized space: Somebody put modlogs for a channel then deleted that channel or the bot no longer has access to the channel'
            );
        }
    }
};
