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

const cooldowns = new Map();

const queue = async.queue(async (task, callback) => {
    const { newMessage, modLogsID, EmbedBuilder } = task;
    try {
        await newMessage.guild.channels.cache.get(modLogsID).send({ embeds: [EmbedBuilder] });
    } catch (error) {
        await Modlog.deleteOne({ serverID: newMessage.guild.id });
        console.log(
            `Kinda Optimized space: Somebody put modlogs for a channel then deleted that channel or the bot no longer has access to the channel ${error}`
        );
    }
    callback();
}, 1);

module.exports = async (oldMessage, newMessage) => {
    if (
        !oldMessage.content ||
        newMessage.content === oldMessage.content ||
        !newMessage.content ||
        newMessage.channel.type === 'dm' ||
        newMessage.author.bot
    ) {
        return;
    }

    while (modlogDocuments.length === 0) {
        console.log(
            'modlogDocuments is 0 for MongoDB (ed.js). Trying again in 5 seconds... Possible memory leak if no modlogDocuments are found'
        );
        await delay(5000);
    }

    if (oldMessage === null) {
        oldMessage = 'unknown message';
    }

    try {
        const existingModlog = modlogDocuments.find(
            (modlog) => modlog.serverID === newMessage.guild.id
        );

        if (!existingModlog) {
            return;
        }

        const modLogsID = existingModlog.channelID;
        const flyMessage = `${oldMessage.content}${newMessage.content}`;

        const filteredMessageold = oldMessage.content
            .replace(creditCardRegex, '[personal info]')
            .replace(phoneNumberRegex, '[redacted]');
        const filteredMessage = newMessage.content
            .replace(creditCardRegex, '[personal info]')
            .replace(phoneNumberRegex, '[redacted]');

        if (cooldowns.has(newMessage.guild.id)) {
            //avoid ratelimits, tried finding a way (if 1 message is added to queue, wait 3 seconds then send and if there is 2 messages then wait the total time needed for the 2 message to be sent and so on) but no solution
            return;
        }

        const EmbedBuilderInstance = new EmbedBuilder()
            .setColor(main)
            .setTitle('****Message log****');

        if (flyMessage.length < 3711) {
            EmbedBuilderInstance.setDescription(`
By <@${newMessage.author.id}>
Edited in <#${newMessage.channel.id}> 
Before: 
||${filteredMessageold}||
After: 
||${filteredMessage}||
Message ID: ${newMessage.id}`);
        } else {
            EmbedBuilderInstance.setDescription(`
By <@${newMessage.author.id}>
Edited in <#${newMessage.channel.id}> 
<Message is too long to show>
Message ID: ${newMessage.id}`);
        }

        cooldowns.set(newMessage.guild.id, true);
        setTimeout(() => {
            cooldowns.delete(newMessage.guild.id);
        }, 3000);

        queue.push({
            newMessage,
            modLogsID,
            EmbedBuilder: EmbedBuilderInstance,
        });
    } catch (error) {
        console.log(`error: ${error}`);
    }
};
