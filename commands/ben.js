const { MessageEmbed, Intents } = require('discord.js');

module.exports.config = {
    name: "ben",
            cooldown: '1500',
    description: `Ask talking ben a question, command cooldown: 1.5 seconds`,
    group: 'fun',
  usage: 'h!ben [question]',
    botperms: ['EMBED_LINKS']
}
const message = 'messageCreate'
module.exports.run = async(client, message, args) => {
          console.log(`[COMMAND LOG] ben command ran on: ${message.guild.name} ID: ${message.guild.id}`)
  message.react('✅')
    const ben = require('../utils/structure/exports/json/ben.json');
    const item = ben[Math.floor(Math.random() * ben.length)];
    const filter = response => {
        return item.answers.some(answer => answer.toLowerCase() === response.content.toLowerCase());
    };
    message.reply(`${item.question}`)
            }