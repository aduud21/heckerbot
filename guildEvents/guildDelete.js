const mongoose = require('mongoose');
const Modlog = require('../models/modlog');

mongoose.connect(process.env.mongodb, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
module.exports = async (client, guild) => {
    const existingModlog = await Modlog.findOne({ serverID: guild.id }).catch(() => {});
    if (!existingModlog) return;
    await Modlog.deleteOne({ serverID: guild.id }).catch(() => {});
    console.log('Optimized space: bot was removed from a server');
};
