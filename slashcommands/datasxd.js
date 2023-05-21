const { owners, support } = require('../config/bot.json');
module.exports = async (interaction) => {
    const commandName = interaction.commandName;
    if (commandName == 'information') {
        if (commandName == 'information') console.log(`Slash command ${commandName} ran`);
        if (commandName == 'information')
            interaction
                .reply(
                    `Bot created: 2022/2/28
Owner(s) UserID(s): ${owners}
Support server: ${support}
`
                )
                .catch(() => {});
    }
};
