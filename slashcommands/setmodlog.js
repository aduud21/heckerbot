const fs = require('fs');
const interactionServerCooldowns = new Map();
const interactionServerCooldownsPreventRL = new Map();
const mongoose = require('mongoose');
const Modlog = require('../models/modlog');
mongoose.connect(process.env.mongodb, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
module.exports = async (interaction, client) => {
    const commandName = interaction.commandName;
    const serverId = interaction.guild.id;

    // startcooldown
    if (commandName === 'setmodlog') {
        if (interactionServerCooldowns.has(serverId)) {
            const remainingCooldown = interactionServerCooldowns.get(serverId) - Date.now();
            const remainingCooldownRL =
                interactionServerCooldownsPreventRL.get(serverId) - Date.now();
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
        interactionServerCooldownsPreventRL.set(serverId, Date.now() + cooldownTimeRL);
        setTimeout(() => {
            interactionServerCooldownsPreventRL.delete(serverId);
        }, cooldownTimeRL);

        const cooldownTime = 15000;
        interactionServerCooldowns.set(serverId, Date.now() + cooldownTime);
        setTimeout(() => {
            interactionServerCooldowns.delete(serverId);
        }, cooldownTime);
    }

    if (commandName === 'setmodlog') {
        try {
            try {
                const input = interaction.options._hoistedOptions[0].value;
                const onlyN = input.match(/\d+/)[0];

                const channelId = onlyN;
                const channel = interaction.guild.channels.cache.get(channelId);

                if (!channel) {
                    try {
                        interaction
                            .reply(
                                `${client.fail} You cannot set modlogs for another server in this server.`
                            )
                            .catch(() => {});
                    } catch (error) {
                        console.error('Error replying to interaction:', error);
                    }
                    return;
                }
                await interaction.reply({ content: 'Loading...' }).catch(() => {});
                const existingModlog = await Modlog.findOne({ serverID: serverId }).catch(() => {});

                if (existingModlog) {
                    existingModlog.channelID = channelId;
                    await existingModlog.save().catch(() => {});
                } else {
                    const newModlog = new Modlog({
                        serverID: serverId,
                        channelID: channelId,
                    });
                    await newModlog.save().catch(() => {});
                }

                try {
                    interaction
                        .editReply(
                            `${client.success} Modlogs have been set to <#${channelId}>. Please wait about 10 seconds for it to take effect...`
                        )
                        .catch(() => {});
                } catch (err) {}
            } catch (e) {}
        } catch (error) {
            console.error('Error replying to interaction:', error);
        }
    }
};
