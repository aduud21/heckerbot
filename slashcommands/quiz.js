const axios = require('axios');
const he = require('he');

const badWordsPattern =
    /\b(sex|sexual|heroin|marijuana|cocaine|porn|LSD|MDMA|Ecstasy|PCP|fuck|wank|dyke|frigger|turd|twat|kike|bollocks|shit|kill|cum|arse|suicide|semen|homicide|cunt|hitler|asshole|bitch|dick|bastard|piss|pedophile|zoophile|pussy|slut|whore|cock|nigger|niggar|nigga|faggot)\b/gi;

async function getRandomQuestion() {
    try {
        const urls = require('../json/urls.json');
        const randomUrl = urls[Math.floor(Math.random() * urls.length)];

        const response = await axios.get(randomUrl, {
            headers: {
                'User-Agent': 'Discord bot',
                'Accept-Language': 'en-US',
            },
        });

        return response.data.results[0];
    } catch (error) {
        console.log(error);
    }
}

async function getValidQuestion(interaction) {
    let question;
    let trys = 0;

    while (true) {
        if (trys > 4) {
            await interaction
                .editReply({
                    content: `I failed fetching the question from [opentdb](<https://opentdb.com/>) as I exceeded ${trys} tries.`,
                })
                .catch(() => {});
            return;
        }

        try {
            question = await getRandomQuestion();
            trys++;

            if (!new RegExp(badWordsPattern.source, 'i').test(question.question)) {
                if (!new RegExp(badWordsPattern.source, 'i').test(question.correct_answer)) {
                    break;
                }
            }
        } catch (error) {}
    }

    return question;
}

module.exports = async (interaction) => {
    const commandName = interaction.commandName;

    if (commandName === 'quiz') {
        await interaction.reply({ content: '⏳ -> Loading...' }).catch(() => {});
    }

    try {
        const question = await getValidQuestion(interaction);
        if (!question) return;
        let answers = [he.decode(question.correct_answer)];

        if (answers[0] === 'True') {
            answers[0] += 'e';
        }

        answers.sort();

        const content = `
Random Question:
> ${he.decode(question.question)}

Think about the answer, then click this => ||${answers}|| to view the correct answer. This data is provided by [opentdb](<https://opentdb.com/>)`;

        if (commandName === 'quiz') {
            await interaction.editReply({ content }).catch(() => {});
        }
    } catch (error) {
        console.error(error);
    }
};
