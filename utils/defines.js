module.exports = async (client) => {
    client.color = require('../config/colors.json').main;
    client.cooldown = new Set();
    client.success = require('../config/emojis.json').success;
    client.fail = require('../config/emojis.json').fail;
    client.pending = require('../config/emojis.json').pending;
    client.config = require('../config/bot.json');
};
