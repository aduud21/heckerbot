module.exports = async (client, interaction) => {
    const commandName = interaction.commandName;
    if (commandName == 'uptime') {
        if (commandName == 'uptime') console.log(`Slash command ${commandName} ran`);
        let totaltime = client.uptime / 1000;
        let days = Math.floor(totaltime / 86400);
        totaltime %= 86400;
        let hours = Math.floor(totaltime / 3600);
        totaltime %= 3600;
        let minutes = Math.floor(totaltime / 60);
        let seconds = Math.floor(totaltime % 60);
        if (commandName == 'uptime')
            interaction
                .reply(
                    `
Bot uptime:
Days: ${days} 
Hours: ${hours} 
Minutes: ${minutes} 
Seconds: ${seconds}
`
                )
                .catch(() => {});
    }
};
