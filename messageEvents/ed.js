let MONGOFailedattempts = 0;
const { EmbedBuilder } = require('discord.js');
const { main } = require('../config/colors.json');
const async = require('async');
const mongoose = require('mongoose');
const Modlog = require('../models/modlog');
mongoose.connect(process.env.mongodb, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
const creditCardRegex = /\b(?:\d{4}[ -]?){3}\d{4}\b/g;
const phoneNumberRegex = /(\+\d{1,2}\s?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}\b/g;
const queues = new Map();
const queueTimeouts = new Map();
function delay(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}
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
module.exports = async (oldMessage, newMessage) => {
    if (!oldMessage.content) return;
    if (!newMessage.content) return;
    if (newMessage.content === oldMessage.content) return;
    if (newMessage.channel.type === 'dm') return;
    if (newMessage.author.bot) return;
    while (modlogDocuments.length === 0 && MONGOFailedattempts < 4) {
        console.log('Failed Checking for MongoDB (ed.js). Trying again in 5 seconds...');
        await delay(5000);
        MONGOFailedattempts++;
    }

    if (modlogDocuments.length === 0) {
        console.log('Failed to fetch modlog documents after 3 attempts (ed.js)');
        return;
    }
    try {
        if (newMessage.author.bot) {
            return;
        }
    } catch {}
    if (oldMessage === null) oldMessage = 'unknown message';
    try {
        let flyMessage = `${oldMessage.content}${newMessage.content}`;
        if (flyMessage.length < 3711) {
            const existingModlog = modlogDocuments.find(
                (modlog) => modlog.serverID === newMessage.guild.id
            );
            if (!existingModlog) return;
            const modLogsID = existingModlog.channelID;
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
                        await delay(2000);
                        await newMessage.guild.channels.cache
                            .get(modLogsID)
                            .send({ embeds: [EmbedBuilder] });
                    } catch (error) {
                        await Modlog.deleteOne({ serverID: newMessage.guild.id });
                        console.log(
                            `Kinda Optimized space: Somebody put modlogs for a channel then deleted that channel or the bot no longer has access to the channel ${error}`
                        );
                    }
                }, 1);
                queues.set(newMessage.guild.id, queue);
            }
            const timeoutId = queueTimeouts.get(newMessage.guild.id);
            if (timeoutId) {
                await delay(1000);
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
                queues.delete(newMessage.guild.id);
            }, 5000);
            queueTimeouts.set(newMessage.guild.id, newTimeoutId);
        } else {
            const existingModlog = await Modlog.findOne({ serverID: newMessage.guild.id });
            if (!existingModlog) return;
            const modLogsID = existingModlog.channelID;
            const text = newMessage.content;
            const filteredMessage = text
                .replace(creditCardRegex, '[personal info]')
                .replace(phoneNumberRegex, '[redacted]');
            let queue = queues.get(newMessage.guild.id);
            if (!queue) {
                queue = async.queue(async (task) => {
                    const { newMessage, modLogsID, EmbedBuilder } = task;
                    try {
                        await delay(2000);
                        await newMessage.guild.channels.cache
                            .get(modLogsID)
                            .send({ embeds: [EmbedBuilder] });
                    } catch (error) {
                        await Modlog.deleteOne({ serverID: newMessage.guild.id });
                        console.log(
                            `Kinda Optimized space: Somebody put modlogs for a channel then deleted that channel or the bot no longer has access to the channel ${error}`
                        );
                    }
                }, 1);
                queues.set(newMessage.guild.id, queue);
            }
            const timeoutId = queueTimeouts.get(newMessage.guild.id);
            if (timeoutId) {
                await delay(1000);
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
                queues.delete(newMessage.guild.id);
            }, 5000);
            queueTimeouts.set(newMessage.guild.id, newTimeoutId);
        }
    } catch (error) {
        console.log(`error: ${error}`);
    }
};
