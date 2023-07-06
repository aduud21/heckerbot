const { PermissionsBitField } = require('discord.js');
const interactionServerCooldownsPreventRL = new Map();
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
            const botMember = interaction.guild.members.cache.get(interaction.client.user.id);
            const userMember = interaction.guild.members.cache.get(interaction.member.user.id);
            if (
                !botMember
                    .permissionsIn(interaction.channel)
                    .has([PermissionsBitField.Flags.ViewChannel]) ||
                !botMember
                    .permissionsIn(interaction.channel)
                    .has([PermissionsBitField.Flags.SendMessages]) ||
                !botMember
                    .permissionsIn(interaction.channel)
                    .has([PermissionsBitField.Flags.ManageMessages])
            ) {
                interaction.reply({
                    content: `❌ -> I need these permissions for this channel to work with this command:
- i need to be able to Send Messages in the channel you picked
- i need to be able to Manage Messages in the channel you picked
- i need to be able to View Channel you picked`,
                });
                return;
            }
            if (
                !userMember
                    .permissionsIn(interaction.channel)
                    .has([PermissionsBitField.Flags.ViewChannel]) ||
                !userMember
                    .permissionsIn(interaction.channel)
                    .has([PermissionsBitField.Flags.SendMessages]) ||
                !userMember
                    .permissionsIn(interaction.channel)
                    .has([PermissionsBitField.Flags.ManageMessages])
            ) {
                interaction.reply({
                    content: `❌ -> You need these permissions for this channel to work with this command:
- You need to be able to Send Messages in the channel you picked
- You need to be able to Manage Messages in the channel you picked
- You need to be able to View Channel you picked`,
                });
                return;
            }

            interaction.channel.bulkDelete(numMessagesToDelete, {
                reason: `${interaction.member.user.id} commanded the bot to run bulkDelete`,
            });

            interaction.reply({
                content: `Successfully told Discord to delete ${numMessagesToDelete} messages`,
            });
        } catch (err) {
            console.error(`Error bulk delete: ${err}`);
        }
    }
};
