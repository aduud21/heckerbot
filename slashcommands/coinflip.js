module.exports = async (interaction) => {
    interaction
        .reply(
            `
🪙 ${
                require('../json/coin.json')[
                    Math.floor(Math.random() * require('../json/coin.json').length)
                ].question
            } 🪙
`
        )
        .catch(() => {});
};
