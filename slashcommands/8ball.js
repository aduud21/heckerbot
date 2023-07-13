module.exports = async (interaction) => {
    const commandName = interaction.commandName;
    if (commandName == '8ball') {
        const gamereal = require('../utils/structure/json/8ball.json');
        const item = gamereal[Math.floor(Math.random() * gamereal.length)];
        const filter = (response) => {
            return item.answers();
        };
        const usersofusersxd = interaction.options._hoistedOptions[0].value;
        if (usersofusersxd.length > 1973) {
            interaction
                .reply('You cannot have over 1973 characters (Response too long)')
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
