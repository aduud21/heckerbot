module.exports = async (interaction) => {
    const commandName = interaction.commandName;
    if (commandName == 'code') {
        if (commandName == 'code') console.log(`Slash command ${commandName} ran`);
        if (commandName == 'code')
            interaction
                .reply(
                    `
Source code on github: https://github.com/aduud21/heckerbot                     
`
                )
                .catch(() => {});
    }
};
