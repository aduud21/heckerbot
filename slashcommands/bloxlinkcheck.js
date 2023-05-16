const bloxlink = require('bloxlink-sdk');
const { Client } = require('discord.js');
const axios = require('axios');
const interactionCooldowns = new Map(); // get userids for cooldown, should be above module.exports = async (client) => {
module.exports = async (client, interaction) => {
    const commandName = interaction.commandName;
    // startcooldown
    if (commandName === 'bloxlinkcheck') {
        const userId = interaction.member.user.id;
        if (interactionCooldowns.has(userId)) {
            const remainingCooldown = interactionCooldowns.get(userId) - Date.now();
            if (remainingCooldown > 0) {
                return;
            }
        }
        const cooldownTime = 5000;
        interactionCooldowns.set(userId, Date.now() + cooldownTime);
        setTimeout(() => {
            interactionCooldowns.delete(userId);
        }, cooldownTime); // end of col
        await interaction.reply({ content: 'Checking...' });
    }
    try {
        const usersofusersxd = interaction.options._hoistedOptions[0].value.replace(/[<@>]/g, '');
        if (commandName == 'bloxlinkcheck') bloxlink.initialise(process.env.bloxlinkAPIKEY);
        const testxd = await bloxlink.SearchDiscordToRoblox(usersofusersxd);
        if (testxd.success) {
            if (commandName == 'bloxlinkcheck')
                interaction.editReply(`User is verified with bloxlink`).catch(() => {});
        }
    } catch (error) {
        try {
            if (commandName == 'bloxlinkcheck')
                interaction.editReply(`User is not verified with bloxlink`).catch(() => {});
        } catch (error) {
            console.log(`Discord is annoying another time, error: ${error}`);
        }
    }

    if (commandName == 'bloxlinkcheck') console.log(`Slash command ${commandName} ran`);
};

//tottaly not trash code
