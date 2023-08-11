const interactionServerCooldowns = new Map();
const interactionServerCooldownsPreventRL = new Map();
const mongoose = require('mongoose');
const Modlog = require('../models/modlog');

mongoose.connect(process.env.mongodb, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

module.exports = async (interaction) => {
    // Check if the server is on cooldown
    if (interactionServerCooldowns.has(interaction.guild.id)) {
        const remainingCooldown = interactionServerCooldowns.get(interaction.guild.id) - Date.now();
        const remainingCooldownRL =
            interactionServerCooldownsPreventRL.get(interaction.guild.id) - Date.now();

        if (remainingCooldownRL > 0) {
            return;
        }

        if (remainingCooldown > 0) {
            interaction
                .reply(
                    `Please wait ${remainingCooldown}ms to use this server command as somebody else did in the server...`
                )
                .catch(() => {});
            return;
        }
    }

    const cooldownTimeRL = 5000;
    interactionServerCooldownsPreventRL.set(interaction.guild.id, Date.now() + cooldownTimeRL);
    setTimeout(() => {
        interactionServerCooldownsPreventRL.delete(interaction.guild.id);
    }, cooldownTimeRL);

    const cooldownTime = 15000;
    interactionServerCooldowns.set(interaction.guild.id, Date.now() + cooldownTime);
    setTimeout(() => {
        interactionServerCooldowns.delete(interaction.guild.id);
    }, cooldownTime);

    try {
        let msg = await interaction.reply(`⏳ -> Checking database (0%)`).catch(() => {});

        const existingModlog = await Modlog.findOne({ serverID: interaction.guild.id }).catch(
            () => {}
        );

        if (!existingModlog) {
            interaction
                .editReply(`❌ -> The bot hasn't collected any data about your server`)
                .catch(() => {});
            return;
        }
        await Modlog.deleteOne({ serverID: interaction.guild.id }).catch(() => {});

        interaction
            .editReply(
                `✅ -> Deleted all the data that the bot has collected from your server. If you do not like the bot please tell me why VIA the support server`
            )
            .catch(() => {});
    } catch (err) {
        console.error(`Error deleting server data: ${err}`);
    }
};
