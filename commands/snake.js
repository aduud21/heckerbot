const { MessageEmbed, Collection } = require('discord.js');
module.exports.config = {
    name: "snake",
            cooldown: '60000',
    description: "Play snake game, Type w to go up, a to go right, d to go left, s to go down, this only works for prefix, h!stop to end game but if sometimes it does not work then say h!stop 3-5 times, if the bot restarts then your currect game session ends, command cooldown: 60 seconds",
    group: 'fun',
}
const message = 'messageCreate'
 module.exports.run = async (client, message, args) => {
    console.log(`[COMMAND LOG] snake command ran on: ${message.guild.name} ID: ${message.guild.id}`)
  message.react('✅')
}
// adudu21 was here