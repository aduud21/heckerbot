const { EmbedBuilder } = require('discord.js');
const { main } = require('../config/colors.json');
const async = require('async');
const mongoose = require('mongoose');
const Modlog = require('../models/modlog');
const getModlogDocuments = require('../models/modlogs.js');
mongoose.connect(process.env.mongodb, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
let modlogDocuments = [];

async function fetchModlogDocuments() {
    modlogDocuments = getModlogDocuments();
}

fetchModlogDocuments();
setInterval(fetchModlogDocuments, 10000);

const cooldowns = new Map();

const queue = async.queue(async (task, callback) => {
    const { messageDelete, modLogsID, EmbedBuilder } = task;
    try {
        await messageDelete.guild.channels.cache.get(modLogsID).send({ embeds: [EmbedBuilder] });
    } catch (error) {
        await Modlog.deleteOne({ serverID: messageDelete.guild.id });
    }
    callback();
}, 1);

module.exports = async (messageDelete) => {
    if (!messageDelete.content || messageDelete.channel.type === 'dm' || messageDelete.author.bot)
        return;

    while (modlogDocuments.length === 0) {
        await new Promise((resolve) => setTimeout(resolve, 5000));
    }
    try {
        const existingModlog = modlogDocuments.find(
            (modlog) => modlog.serverID === messageDelete.guild.id
        );
        if (!existingModlog) return;

        const modLogsID = existingModlog.channelID;
        const text = messageDelete.content;
        const filteredMessage = text
            .replace(/\b(?:\d{4}[ -]?){3}\d{4}\b/g, '[personal info]')
            .replace(/(\+\d{1,2}\s?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}\b/g, '[redacted]');

        if (cooldowns.has(messageDelete.guild.id)) {
            //avoid ratelimits, tried finding a way (if 1 message is added to queue, wait 3 seconds then send and if there is 2 messages then wait the total time needed for the 2 message to be sent and so on) but no solution
            return;
        }

        const EmbedBuilderInstance = new EmbedBuilder()
            .setColor(main)
            .setTitle('****Message log****');
        if (messageDelete.content.length < 3711) {
            EmbedBuilderInstance.setDescription(`
                By <@${messageDelete.author.id}>
                Deleted in <#${messageDelete.channel.id}> 
                ||${filteredMessage}||
                Message ID: ${messageDelete.id}`);
        } else {
            EmbedBuilderInstance.setDescription(`
                By <@${messageDelete.author.id}>
                Deleted in <#${messageDelete.channel.id}> 
                <Message is too long to show>
                Message ID: ${messageDelete.id}`);
        }

        cooldowns.set(messageDelete.guild.id, true);
        setTimeout(() => {
            cooldowns.delete(messageDelete.guild.id);
        }, 3000);

        queue.push({
            messageDelete,
            modLogsID,
            EmbedBuilder: EmbedBuilderInstance,
        });
    } catch (error) {
        console.log(`error: ${error}`);
    }
};
