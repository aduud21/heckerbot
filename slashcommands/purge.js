const interactionServerCooldownsPreventRL = new Map();
const { PermissionsBitField } = require('discord.js');
module.exports = async (interaction) => {
    const commandName = interaction.commandName;

    if (commandName === 'purge') {
        const serverId = interaction.guild.id;

        // Check if the server is on cooldown
        if (interactionServerCooldownsPreventRL.has(serverId)) {
            const remainingCooldownRL =
                interactionServerCooldownsPreventRL.get(serverId) - Date.now();

            if (remainingCooldownRL > 0) {
                return;
            }
        }

        const cooldownTimeRL = 5000;
        interactionServerCooldownsPreventRL.set(serverId, Date.now() + cooldownTimeRL);
        setTimeout(() => {
            interactionServerCooldownsPreventRL.delete(serverId);
        }, cooldownTimeRL);

        const numMessagesToDelete = interaction.options._hoistedOptions[0].value;

        if (numMessagesToDelete > 100) {
            interaction
                .reply({ content: '❌ -> You cannot delete more than 100 messages' })
                .catch(() => {});
            return;
        }

        if (numMessagesToDelete < 1) {
            interaction
                .reply({ content: '❌ -> You need to specify a number from 1-100' })
                .catch(() => {});
            return;
        }

        try {
            if (!interaction.guild.members.me.permissions.has(PermissionsBitField.Flags.ManageMessages)){
               interaction.reply({
                content: `i do not have Manage Messages permission`,
            });
              return;
            }
            interaction.channel.bulkDelete(numMessagesToDelete, {
                reason: `${interaction.member.user.id} commanded the bot to run bulkDelete`,
            });
            interaction.reply({
                content: `Successfully told discord to delete ${numMessagesToDelete} messages`,
            });
        } catch (err) {
            console.error(`Error bulk delete: ${err}`);
        }
    }
};
