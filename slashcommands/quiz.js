const axios = require('axios');
const he = require('he');
const badWordsPattern =
    /\b(sex|sexual|fuck|shit|kill|suicide|homicide|cunt|hitler|asshole|bitch|dick|bastard|piss|pedophile|zoophile|pussy|slut|whore|cock|nigger|niggar|nigga|faggot)\b/gi; // if there is some type of basic badword while using the api, avoid it and request for a new question is what this is used for
const urls = [
    'https://opentdb.com/api.php?amount=1&category=9&type=boolean', // General Knowledge 1
    'https://opentdb.com/api.php?amount=1&category=9', // General Knowledge 2
    'https://opentdb.com/api.php?amount=1&category=27', // Animals 1
    'https://opentdb.com/api.php?amount=1&category=27&type=boolean', // Animals 2
    'https://opentdb.com/api.php?amount=1&category=18', // Computer 1
    'https://opentdb.com/api.php?amount=1&category=18&type=boolean', // Computer 2
    'https://opentdb.com/api.php?amount=1&category=15&type=boolean', // Video games 1
    'https://opentdb.com/api.php?amount=1&category=15' // Video games 2
];
async function getRandomQuestion() {
    try {
        const randomUrl = urls[Math.floor(Math.random() * urls.length)];
        const response = await axios.get(randomUrl);
        return response.data.results[0];
    } catch (error) {
        throw new Error('Failed to fetch a random question');
    }
}
async function getValidQuestion() {
    let question;
    let isValid = false;
    while (!isValid) {
        try {
            const triviaQuestion = await getRandomQuestion();
            question = triviaQuestion;

            if (!badWordsPattern.test(question.question)) {
                isValid = true;
            }
        } catch (error) {
            console.error('Failed to get a valid question');
        }
    }
    return question;
}
module.exports = async (interaction) => {
    const commandName = interaction.commandName;
    if (commandName === 'quiz') {
        await interaction.reply({ content: 'Loading...' });
    }
    try {
        const question = await getValidQuestion();
        const correctAnswer = question.correct_answer;
        const decodedAnswer = he.decode(correctAnswer);
        let answers = [decodedAnswer];

        if (answers[0] === 'True') {
            answers[0] += 'e';
        }
        answers = answers.sort();
        const decodedString = he.decode(question.question);
        const content = `
Random Question:
${decodedString} \n\nThink about the answer, then click this => ||${answers}|| to view the correct answer. This data is provided by [opentdb](<https://opentdb.com/>)`;
        if (commandName === 'quiz') {
            interaction.editReply({ content: content });
        }
    } catch (error) {
        console.error(error);
    }
};
