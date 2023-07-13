const { codelinkwithformat } = require('../config/bot.json');
module.exports = async (interaction) => {
    const commandName = interaction.commandName;
    if (commandName == 'code') {
        interaction
            .reply(
                `
Source code on github: ${codelinkwithformat}                     
`
            )
            .catch(() => {});
    }
};
