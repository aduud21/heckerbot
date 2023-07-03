const { owners, support } = require('../config/bot.json');
module.exports = async (interaction, client) => {
    const commandName = interaction.commandName;
    if (commandName == 'information') {
        interaction
            .reply(
                `Bot created: 2022/2/28
Owner(s) UserID(s): ${owners}
Support server: ${support}
ShardId: ${interaction.guild.shardId}
Latency: ${Math.round(client.ws.ping)}ms
`
            )
            .catch(() => {});
    }
};
