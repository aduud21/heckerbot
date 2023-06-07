const axios = require('axios');
const he = require('he');
async function getq() {
    const apiUrl = 'https://opentdb.com/api.php?amount=1&type=boolean';
    const response = await axios.get(apiUrl).catch(() => {});
    return response.data.results[0];
}
module.exports = async (interaction) => {
    const commandName = interaction.commandName;
    if (commandName === 'quiz') {
        await interaction.reply({ content: 'Loading...' }).catch(() => {});
    }
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
    if (commandName === 'quiz') interaction.editReply({ content: content }).catch(() => {});
};
