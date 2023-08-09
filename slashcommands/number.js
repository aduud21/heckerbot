module.exports = async (interaction) => {
    try {
        const usersofusersxd = interaction.options._hoistedOptions[0].value;
        if (usersofusersxd.length < 2000) {
            interaction
                .reply('You cannot have over 2000 numbers (Response too long)')
                .catch(() => {});
            return;
        }
        const randomNumber = Math.floor(Math.random() * usersofusersxd) + 1;
        interaction.reply({ content: `${randomNumber}` });
    } catch (error) {}
};
