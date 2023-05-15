const { Collection } = require('discord.js');
module.exports = async (client) => {
    client.color = require('../config/colors.json').main;
    client.commands = new Collection();
    client.aliases = new Collection();
    client.cooldown = new Set();
    client.snipes = new Map();
    client.prefix;
    client.success = require('../config/emojis.json').success;
    client.fail = require('../config/emojis.json').fail;
    client.pending = require('../config/emojis.json').pending;
    try {
        await client.on('messageCreate', async (message) => {
            if (message.channel.type === 'dm') return;
            client.prefix = await require('../config/bot.json').prefix;
        });
    } catch {}

    client.groups = ['moderation', 'info', 'misc', 'fun', 'config', 'management', 'owners'];

    client.config = require('../config/bot.json');
};
