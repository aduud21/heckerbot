module.exports = (client, oldMessage, newMessage) => {
  const CryptoJS = require('crypto-js');
const fs = require('fs');
const async = require('async');
const key = process.env.DONOTSHARETHIS;
const queue = async.queue(async (task) => {
  const { newMessage, modLogsID, content } = task;
  try {
    await newMessage.guild.channels.cache.get(modLogsID).send(content)
  } catch (error) {
    console.log(error)
  }
}, 1)
     let decryptedData
  function loadDecryptedData() {
  const ciphertext = fs.readFileSync('./database/realmodlogs.txt', 'utf8')
  const bytes = CryptoJS.AES.decrypt(ciphertext, key)
  decryptedData = {}
  decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8))
}
  loadDecryptedData()
    setInterval(loadDecryptedData, 10 * 1000)
  const { Client, ClientUser, MessageEmbed, Intents } = require('discord.js');
  client.on('messageUpdate', async(oldMessage, newMessage) => {
    if (newMessage.author.bot) return;
    if (newMessage.content === oldMessage.content) return;
    try {
      var flyMessage = `${oldMessage.content}${newMessage.content}`
      if (flyMessage.length < 1812){
        if (newMessage.channel.type === 'dm') return;
     if (!decryptedData[newMessage.guild.id]) return;
      let modLogsID = decryptedData[newMessage.guild.id].channel
      queue.push({
        newMessage,
        modLogsID, 
        content: `****Message log****

Message by <@${newMessage.author.id}>
Message edited in <#${newMessage.channel.id}> 
Before: 
||${oldMessage.content}||
After: 
||${newMessage.content}||
Message ID: ${newMessage.id}`
                 })
      } else {
        if (newMessage.channel.type === 'dm') return;
  if (!decryptedData[newMessage.guild.id]) return;
      let modLogsID = decryptedData[newMessage.guild.id].channel
      queue.push({
        newMessage,
        modLogsID, 
        content: `****Message log****

Message by <@${newMessage.author.id}>,
Message edited in <#${newMessage.channel.id}> 
<Message is too long to show>
Message ID: ${newMessage.id}`
                 })
      }
    } catch (error) {
      if (decryptedData[newMessage.guild.id]) {
        delete decryptedData[newMessage.guild.id]
        console.log("Kinda Optimized space: Somebody put modlogs for a channel then deleted that channel or the bot no longer has access to the channel")
      }
    }
  })
}