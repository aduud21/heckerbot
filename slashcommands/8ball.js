module.exports = async (interaction) => {
    const usersofusersxd = interaction.options._hoistedOptions[0].value
        .replace(/^https:\/\//, '')
        .replace(/http:\/\/|https:\/\//gi, '');
    if (usersofusersxd.length > 1900) {
        interaction
            .reply('You cannot have over 1900 characters (Response too long)')
            .catch(() => {});
        return;
    }
    interaction
        .reply(
            `
> ${usersofusersxd}
        
🎱 ${
                require('../json/8ball.json')[
                    Math.floor(Math.random() * require('../json/8ball.json').length)
                ].question
            } 🎱`
        )
        .catch(() => {});
};
