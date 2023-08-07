module.exports = async (interaction) => {
    const commandName = interaction.commandName;
    if (commandName == '8ball') {
        const gamereal = require('../json/8ball.json');
        const item = gamereal[Math.floor(Math.random() * gamereal.length)];
        const filter = (response) => {
            return item.answers();
        };
        const usersofusersxd = interaction.options._hoistedOptions[0].value
            .replace(/^https:\/\//, '')
            .replace(/http:\/\/|https:\/\//gi, '');
        if (usersofusersxd.length > 1972) {
            interaction
                .reply('You cannot have over 1972 characters (Response too long)')
                .catch(() => {});
            return;
        }
        interaction
            .reply(
                `
> ${usersofusersxd}
        
🎱 ${item.question} 🎱`
            )
            .catch(() => {});
    }
};
