const { Client, MessageCreate } = require("discord.js")
const {MessageEmbed} = require('discord.js')


module.exports.config = {
    name: 'serverinvites',
            cooldown: '2500',
    aliases: ['invites'],
    group: 'management',
    botperms: ['MANAGE_GUILD'],
    description: "Get all server invites, command cooldown: 2.5 seconds",
    example: 'h!serverinvites'
}
const message = 'messageCreate'
/**
 * 
 * @param {Client} client 
 * @param {Message} message 
 * @param {*} args 
 */
module.exports.run = async(client, message, args) => {
          console.log(`[COMMAND LOG] serverinvites command ran on: ${message.guild.name} ID: ${message.guild.id}`)
  message.react('✅')
const { guild } = message

guild.fetchInvites().then((invites) => {
    const inviteCount = {}

    invites.forEach((invite) => {
        const { uses, inviter } = invite
        const { username, discriminator } = inviter

        const name = `${username}#${discriminator}`

        inviteCount[name] = (inviteCount[name] || 0) + uses
    })

    let replText = 'Invites:'

     

    for (const invite in inviteCount) {
        const count = inviteCount[invite]
        replText += `\n${invite} has invited ${count} member(s)`
    }
    try {
      const e = message.reply(`${message.author.tag}, ${replText}`)
      
    } catch (e){
    
        message.channel.send("I cannot list all the invites as it is more than 2000 characters to write")
    }

    })

}