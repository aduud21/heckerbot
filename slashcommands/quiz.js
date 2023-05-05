// CHANGING THE CODE BELOW CAN RESULT IN THE BOT NOT WORKING
const REALLYMAXHEARINGREALLY1234REAL = 100
require('events').EventEmitter.prototype._maxListeners = REALLYMAXHEARINGREALLY1234REAL;
require('events').defaultMaxListeners = REALLYMAXHEARINGREALLY1234REAL;
// ONLY REMOVE THE ABOVE CODE IF YOU KNOW WHAT YOU'RE DOING
const { Client, ClientUser, MessageEmbed, Intents } = require('discord.js')
const axios = require('axios');
const { blacklisted } = require('../config/bot.json')
async function getq() {
  const apiUrl = 'https://opentdb.com/api.php?amount=1&type=boolean';
  const response = await axios.get(apiUrl);
  return response.data.results[0];
}
const interactionCooldowns = new Map() // get userids for cooldown, should be above module.exports = async (client) => {
module.exports = async (client) => {
  client.ws.on('INTERACTION_CREATE', async (interaction) => {
    const commandName = interaction.data.name;
    // startcooldown 
if (commandName === 'quiz') {
    const userId = interaction.member.user.id;
  if (interactionCooldowns.has(userId)) {
    const remainingCooldown = interactionCooldowns.get(userId) - Date.now();
    if (remainingCooldown > 0) {
      await client.api.interactions(interaction.id, interaction.token).callback.post({
        data: {
          type: 4,
          data: {
            content: `You can use this command again in ${remainingCooldown}ms.`,
          },
        },
      });
      return;
    }
  }
  const cooldownTime = 5000
  interactionCooldowns.set(userId, Date.now() + cooldownTime);
  setTimeout(() => {
    interactionCooldowns.delete(userId);
  }, cooldownTime) // end of col
}
    if (commandName === 'quiz') {
      if (blacklisted.includes(interaction.member.user.id)) {
        return;
      }
      console.log(`Slash command ${commandName} ran`)
      const triviaQuestion = await getq()
      const question = triviaQuestion.question;
      let answers = [triviaQuestion.correct_answer]
      if (answers[0] === 'True') {
        answers[0] += 'e'
      }
      answers = answers.sort()
      const noq = question.replace(/&quot;/g, '"');
      const bruhhowmuch = noq.replace(/&#039;/g, "'");
      const content = `
      Random Question: ${bruhhowmuch} \n\nThink about the answer, then click this => ||${answers}|| to view the correct answer, This data is provided by [opentdb](<https://opentdb.com/>)`
      await client.api.interactions(interaction.id, interaction.token).callback.post({
        data: {
          type: 4,
          data: {
            content: content
          }
        }
      }).catch(() => {})
    }
  })
}