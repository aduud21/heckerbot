module.exports = async (interaction) => {
    const commandName = interaction.commandName;
    if (commandName == 'coinflip') {
        const gamereal = require('../json/coin.json');
        const item = gamereal[Math.floor(Math.random() * gamereal.length)];
        const filter = (response) => {
            return item.answers();
        };
        interaction
            .reply(
                `
🪙 ${item.question} 🪙
`
            )
            .catch(() => {});
    }
};
