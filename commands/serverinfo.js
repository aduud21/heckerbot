module.exports.config = {
    name: "serverinfo",
            cooldown: '2500',
    description: "Shows Information about the server, command cooldown: 2.5 seconds",
    group: 'misc',
  cooldown: '3500',
    usage: 'h!serverinfo',
    example: 'h!serverinfo',   botperms: ['MANAGE_GUILD', 'MANAGE_CHANNELS'],
}
const message = 'messageCreate'
module.exports.run = async(client, message, args) => {
          console.log(`[COMMAND LOG] serverinfo command ran on: ${message.guild.name} ID: ${message.guild.id}`)
  message.react('✅')
    
    const {MessageEmbed} = require('discord.js')
    const owner = message.guild.ownerID
    const cato =        message.guild.channels.cache.filter(ch => ch.type === 'category').size
message.reply(`
${message.guild.name} Information (ID: ${message.guild.id})

**Owner UserID:**
${owner}

Text Channels: ${message.guild.channels.cache.size}

Members:
${message.guild.memberCount}

**Role list:** ${message.guild.roles.cache.size}

**Catogory size:** 
${cato}



${message.author.username} ran this command`)
}