module.exports = async (interaction, client) => {
    const commandName = interaction.commandName;
    if (commandName == 'uptime') {
        let totaltime = client.uptime / 1000;
        let days = Math.floor(totaltime / 86400);
        totaltime %= 86400;
        let hours = Math.floor(totaltime / 3600);
        totaltime %= 3600;
        let minutes = Math.floor(totaltime / 60);
        let seconds = Math.floor(totaltime % 60);
        interaction
            .reply(
                `
Client uptime (Shard${interaction.guild.shardId}):
Days: ${days} 
Hours: ${hours} 
Minutes: ${minutes} 
Seconds: ${seconds}

||Restarts are made to be fast incase if it happens||
`
            )
            .catch(() => {});
    }
};
