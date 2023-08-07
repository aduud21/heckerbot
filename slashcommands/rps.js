module.exports = async (interaction) => {
    const commandName = interaction.commandName;
    if (commandName == 'rps') {
        const gamereal = require('../json/game.json');
        const item = gamereal[Math.floor(Math.random() * gamereal.length)];
        const filter = (response) => {
            return item.answers();
        };
        interaction
            .reply(
                `
${item.question}
`
            )
            .catch(() => {});
    }
};
