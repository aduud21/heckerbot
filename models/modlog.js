const mongoose = require('mongoose');

const mlSC = new mongoose.Schema(
    {
        serverID: {
            type: String,
            required: true,
            unique: true,
        },
        channelID: {
            type: String,
            required: true,
        },
    },
    {
        collection: 'modlogs',
    }
);

const Modlog = mongoose.model('Modlog', mlSC);

module.exports = Modlog;
