module.exports = async (interaction) => {
    const gamereal = require('../json/game.json');
    const item = gamereal[Math.floor(Math.random() * gamereal.length)];
    interaction
        .reply(
            `
${item.question}
`
        )
        .catch(() => {});
};
