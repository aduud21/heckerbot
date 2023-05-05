const start_up_message = true; // Possible values: true, false

const { Client, ClientUser, MessageEmbed, Intents } = require('discord.js')
console.log('⏳ -> [LOGIN] Trying to login with provided token, if this takes longer than 5 minutes it might be cause you provided a invaild token')
const fs = require('fs');
if (!fs.existsSync('./LICENSE')) {
  return;
}
module.exports = async(client) => {
      console.log(`☑️ -> [LOGIN] Logged into token as user ${client.user.tag}`)
client.user.setActivity(`mb!help | ${client.guilds.cache.size} servers`, { type: "LISTENING"})
  try {
    if  (start_up_message){
const channel = client.channels.cache.get('957439649142407248')
channel.send(`<:xd:1073736745872535603> Bot restarted <:xd:1073736745872535603>`)
  }
  } catch (error) {
console.log("Could not send restart message in selected channel, ready.js in events folder")
    return;
  }
   async function checkbotalivedayslol() {
  client.user.setActivity(`mb!help | ${client.guilds.cache.size} servers`, { type: "LISTENING"})
}
setInterval(() => {
    checkbotalivedayslol()
}, 60000)
  }