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

const queues = new Map();
const queueTimeouts = new Map();

let modlogDocuments = [];

async function fetchModlogDocuments() {
    try {
        modlogDocuments = await Modlog.find();
    } catch (error) {
        console.log('Error fetching modlog documents:', error);
    }
}

fetchModlogDocuments();
setInterval(fetchModlogDocuments, 10000);

function delay(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

module.exports = async (messageDelete) => {
    if (!messageDelete.content) return;
    if (messageDelete.channel.type === 'dm') return;
    if (messageDelete.author.bot) return;

    try {
        if (messageDelete.content.length < 200) {
            const existingModlog = modlogDocuments.find(
                (modlog) => modlog.serverID === messageDelete.guild.id
            );

            if (!existingModlog) return;

            const modLogsID = existingModlog.channelID;
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
                        await Modlog.deleteOne({ serverID: messageDelete.guild.id });
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
                queues.delete(messageDelete.guild.id);
            }, 5000);

            queueTimeouts.set(messageDelete.guild.id, newTimeoutId);
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
                        await Modlog.deleteOne({ serverID: messageDelete.guild.id });
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
                queues.delete(messageDelete.guild.id);
            }, 5000);

            queueTimeouts.set(messageDelete.guild.id, newTimeoutId);
        }
    } catch (error) {
        console.log(`error: ${error}`);
    }
};
