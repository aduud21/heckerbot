const { MessageEmbed, Intents } = require('discord.js');
module.exports.config = {
  name: "heck",
group: 'fun',
cooldown: '1500',
  description: "heck someone?!?!, command cooldown: 1.5 seconds",
}
const message = 'messageCreate'
module.exports.run = async(client, message, args) => {
    console.log(`[COMMAND LOG] heck command ran on: ${message.guild.name} ID: ${message.guild.id}`)
    let userowo =
      message.mentions.members.first() ||
      message.guild.members.cache.get(args[0]);

    if (!userowo) return message.reply(`Please mention a user to heck`);
message.reply(`You hecked ${message.mentions.members.first()}`)
message.react('✅')
 }