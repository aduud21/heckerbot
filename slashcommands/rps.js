module.exports = async (interaction) => {
    const commandName = interaction.commandName;
    if (commandName == 'rps') {
        const gamereal = require('../utils/structure/exports/json/game.json');
        const item = gamereal[Math.floor(Math.random() * gamereal.length)];
        const filter = (response) => {
            return item.answers();
        };
        if (commandName == 'rps') console.log(`Slash command ${commandName} ran`);
        if (commandName == 'rps')
            interaction
                .reply(
                    `
${item.question}
`
                )
                .catch(() => {});
    }
};
