const { MessageEmbed, Intents } = require('discord.js');

module.exports.config = {
    name: "piggie",
    cooldown: '1987',
    description: 'Only 1 special user can use this command',
    
}
const message = 'messageCreate'
module.exports.run = async(client, message, args) => {
if (message.author.id === '764727930991018005'){
     console.log(`[COMMAND LOG] piggie command ran on: ${message.guild.name} ID: ${message.guild.id}`)
  message.react('✅')
message.reply('Piggie: https://cdn.discordapp.com/attachments/730936689547149443/781716288987856916/yes.mp4')
  }
else
  message.reply('You are not the special user'), message.react('❌')
  }