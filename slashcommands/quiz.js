const { Client } = require('discord.js');
const axios = require('axios');
const he = require('he');
async function getq() {
    const apiUrl = 'https://opentdb.com/api.php?amount=1&type=boolean';
    const response = await axios.get(apiUrl);
    return response.data.results[0];
}
const interactionCooldowns = new Map(); // get userids for cooldown, should be above module.exports = async (client) => {
module.exports = async (client, interaction) => {
    const commandName = interaction.commandName;
    if (!commandName == 'quiz') return;
    // startcooldown
    if (commandName === 'quiz') {
        const userId = interaction.member.user.id;
        if (interactionCooldowns.has(userId)) {
            const remainingCooldown = interactionCooldowns.get(userId) - Date.now();
            if (remainingCooldown > 0) {
                return;
            }
        }
        const cooldownTime = 5000;
        interactionCooldowns.set(userId, Date.now() + cooldownTime);
        setTimeout(() => {
            interactionCooldowns.delete(userId);
        }, cooldownTime); // end of col
    }
    if (commandName === 'quiz') {
        if (commandName === 'quiz') await interaction.reply({ content: 'Loading...' });
    }
    if (commandName === 'quiz') console.log(`Slash command ${commandName} ran`);
    const triviaQuestion = await getq();
    const question = triviaQuestion.question;
    let answers = [triviaQuestion.correct_answer];
    if (answers[0] === 'True') {
        answers[0] += 'e';
    }
    answers = answers.sort();
    const encodedString = `${question}`;
    const decodedString = he.decode(encodedString);
    const content = `
      Random Question: ${decodedString} \n\nThink about the answer, then click this => ||${answers}|| to view the correct answer, This data is provided by [opentdb](<https://opentdb.com/>)`;
    if (commandName === 'quiz') interaction.editReply({ content: content });
};
