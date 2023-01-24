const { MessageEmbed, Intents, Client, ClientUser, } = require('discord.js');
module.exports.config = {
    name: "anh",
    cooldown: '1987',
    description: 'Can only be used by Hecker#1844'
    
}
const message = 'messageCreate'
module.exports.run = async(client, message) => {
if (message.author.id === '710227418492960778'){
  console.log(`[COMMAND LOG] anh command ran on: ${message.guild.name} ID: ${message.guild.id}`)
  const channel = client.channels.cache.get('951907964288126997')
    
    channel.send(`📢Announcement: ${message.content}`)
    message.delete()
      message.channel.send(`<@710227418492960778> Successfully sent (anh)`)
  }
  else
  message.reply('You must be Hecker#1844 to use this command'), message.react('❌')
  }