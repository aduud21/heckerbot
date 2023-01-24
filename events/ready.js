const { Client, ClientUser, MessageEmbed, Intents } = require('discord.js')
console.log('⏳ -> [LOGIN] Trying to login with provided token, if this takes longer than 5 minutes it might be cause you provided a invaild token')
const fs = require('fs');
if (!fs.existsSync('./LICENSE')) {
  return;
}
module.exports = async(client) => {
      console.log(`☑️ -> [LOGIN] Logged into token as user ${client.user.tag}`)
client.user.setActivity(`h!help | ${client.guilds.cache.size} servers`, { type: "LISTENING"})
const channel = client.channels.cache.get('957439649142407248')
channel.send(`🔃 Bot restarted 🔃`)
   async function checkbotalivedayslol() {
  client.user.setActivity(`h!help | ${client.guilds.cache.size} servers`, { type: "LISTENING"})
}
setInterval(() => {
    checkbotalivedayslol()
}, 60000)
  }