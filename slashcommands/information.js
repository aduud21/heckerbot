const { owners, support } = require('../config/bot.json');
module.exports = async (interaction, client) => {
    const commandName = interaction.commandName;
    if (commandName == 'information') {
        let totaltime = client.uptime / 1000;
        let days = Math.floor(totaltime / 86400);
        totaltime %= 86400;
        let hours = Math.floor(totaltime / 3600);
        totaltime %= 3600;
        let minutes = Math.floor(totaltime / 60);
        let seconds = Math.floor(totaltime % 60);
        interaction
            .reply(
                `Bot created: 2022/2/28
Owner(s) UserID(s): ${owners}
Support server: ${support}
ShardId: ${interaction.guild.shardId}
Latency: ${Math.round(client.ws.ping)}ms
Uptime: ${days}d ${hours}h ${minutes}min ${seconds}s
`
            )
            .catch(() => {});
    }
};
