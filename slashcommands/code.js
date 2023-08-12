const { codelinkwithformat } = require('../config/bot.json');
module.exports = async (interaction) => {
    interaction
        .reply(
            `
Source code: ${codelinkwithformat}                     
`
        )
        .catch(() => {});
};
