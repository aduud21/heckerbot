const { MessageEmbed, Intents } = require('discord.js');

module.exports.config = {
    name: "number",
            cooldown: '2500',
    aliases: ['randomnumber'],
    description: 'A random number from 1 to 10 will be picked, command cooldown: 2.5 seconds',
    group: 'fun',
    usage: 'h!number',
    example: 'h!number'
    
}
const message = 'messageCreate'
module.exports.run = async(client, message, args) => {
          console.log(`[COMMAND LOG] number command ran on: ${message.guild.name} ID: ${message.guild.id}`)
  message.react('✅')
    const numberreal = require('../utils/structure/exports/json/number.json');
    const item = numberreal[Math.floor(Math.random() * numberreal.length)];
    const filter = response => {
        return item.answers.some(answer => answer.toLowerCase() === response.content.toLowerCase());
    };
    const mainEmbed = message.reply(`
Random Number:
${item.question}

||${message.author.username} ran this command||`)
        message.channel.send(mainEmbed).then(() => {
          console.log(`user said okay to number command: ${message.guild.name} ID: ${message.guild.id}`)
                })
 }
 // adudu21 was here