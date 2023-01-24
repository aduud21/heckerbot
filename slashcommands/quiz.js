// CHANGING THE CODE BELOW CAN RESULT IN THE BOT NOT WORKING
const REALLYMAXHEARINGREALLY1234REAL = 100
require('events').EventEmitter.prototype._maxListeners = REALLYMAXHEARINGREALLY1234REAL;
require('events').defaultMaxListeners = REALLYMAXHEARINGREALLY1234REAL;
// ONLY REMOVE THE ABOVE CODE IF YOU KNOW WHAT YOUE DOING
const { Client, ClientUser, MessageEmbed, Intents } = require('discord.js')
const { blacklisted } = require('../config/bot.json')
module.exports = async(client) => {
console.log('Making global command: quiz')
client.api.applications('947733660432490506').commands.post({
        data: {
            name: "quiz",
            description: "Some random questions"
 }})
  console.log('Created global command: quiz')
    client.ws.on("INTERACTION_CREATE", (interaction) => {
        const commandId = interaction.data.id;
        const commandName = interaction.data.name;
        
        if (commandName == "quiz") {
          if (blacklisted.includes(interaction.member.user.id)){
  return;
          }
          const quiz = require('../utils/structure/exports/json/quiz.json');
    const item = quiz[Math.floor(Math.random() * quiz.length)];
    const filter = response => {
        return item.answers.some(answer => answer.toLowerCase() === response.content.toLowerCase());
    };
          if (commandName == "quiz") console.log(`Slash command ${commandName} ran`);
            if (commandName == "quiz") client.api.interactions(interaction.id, interaction.token).callback.post({
                data: {
                    type: 4,
                    data: {
                        content: `Random Question:
${item.question}

Think the answer, then click this => ||${item.answers}|| to view the correct answer`
 }
       }
        });
        }
    });

};