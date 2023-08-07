let MONGOFailedattempts = 0;
const { EmbedBuilder } = require('discord.js');
const { main } = require('../config/colors.json');
const async = require('async');
const mongoose = require('mongoose');
const Modlog = require('../models/modlog');
const creditCardRegex = /\b(?:\d{4}[ -]?){3}\d{4}\b/g;
const phoneNumberRegex = /(\+\d{1,2}\s?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}\b/g;
mongoose.connect(process.env.mongodb, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

let modlogDocuments = [];
function delay(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}
async function fetchModlogDocuments() {
    try {
        modlogDocuments = await Modlog.find();
    } catch (error) {
        console.log('Error fetching modlog documents:', error);
    }
}

fetchModlogDocuments();
setInterval(fetchModlogDocuments, 10000);

module.exports = async (messageDelete) => {
    if (!messageDelete.content) return;
    if (messageDelete.channel.type === 'dm') return;
    if (messageDelete.author.bot) return;
    while (modlogDocuments.length === 0 && MONGOFailedattempts < 6) {
        console.log('Failed Checking for MongoDB (md.js). Trying again in 5 seconds...');
        await delay(5000);
        MONGOFailedattempts++;
    }

    if (modlogDocuments.length === 0) {
        console.log('Failed to fetch modlog documents after 5 attempts. (md.js)');
        return;
    }
    try {
        if (messageDelete.content.length < 3711) {
            const existingModlog = modlogDocuments.find(
                (modlog) => modlog.serverID === messageDelete.guild.id
            );

            if (!existingModlog) return;

            const modLogsID = existingModlog.channelID;
            const text = messageDelete.content;
            const filteredMessage = text
                .replace(creditCardRegex, '[personal info]')
                .replace(phoneNumberRegex, '[redacted]');

            queue = async.queue(async (task) => {
                const { messageDelete, modLogsID, EmbedBuilder } = task;
                try {
                    setTimeout(async () => {
                        await messageDelete.guild.channels.cache
                            .get(modLogsID)
                            .send({ embeds: [EmbedBuilder] });
                    }, 5000);
                } catch (error) {
                    await Modlog.deleteOne({ serverID: messageDelete.guild.id });
                    console.log(
                        `Kinda Optimized space: Somebody put modlogs for a channel then deleted that channel or the bot no longer has access to the channel ${error}`
                    );
                }
            }, 1);

            queue.push({
                messageDelete,
                modLogsID,
                EmbedBuilder: new EmbedBuilder().setColor(main).setTitle('****Message log****')
                    .setDescription(`
            By <@${messageDelete.author.id}>
            Deleted in <#${messageDelete.channel.id}> 
            ||${filteredMessage}||
            Message ID: ${messageDelete.id}`),
            });
        } else {
            const existingModlog = modlogDocuments.find(
                (modlog) => modlog.serverID === messageDelete.guild.id
            );

            if (!existingModlog) return;

            const modLogsID = existingModlog.channelID;
            const text = messageDelete.content;
            const filteredMessage = text
                .replace(creditCardRegex, '[personal info]')
                .replace(phoneNumberRegex, '[redacted]');
            queue = async.queue(async (task) => {
                const { messageDelete, modLogsID, EmbedBuilder } = task;
                try {
                    setTimeout(async () => {
                        await messageDelete.guild.channels.cache
                            .get(modLogsID)
                            .send({ embeds: [EmbedBuilder] });
                    }, 5000);
                } catch (error) {
                    await Modlog.deleteOne({ serverID: messageDelete.guild.id });
                    console.log(
                        `Kinda Optimized space: Somebody put modlogs for a channel then deleted that channel or the bot no longer has access to the channel ${error}`
                    );
                }
            }, 1);

            queue.push({
                messageDelete,
                modLogsID,
                EmbedBuilder: new EmbedBuilder().setColor(main).setTitle('****Message log****')
                    .setDescription(`
            By <@${messageDelete.author.id}>
            Deleted in <#${messageDelete.channel.id}> 
            <Message is too long to show>
            Message ID: ${messageDelete.id}`),
            });
        }
    } catch (error) {
        console.log(`error: ${error}`);
    }
};
