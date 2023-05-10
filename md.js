const CryptoJS = require('crypto-js');
const fs = require('fs');
const async = require('async');
const key = process.env.DONOTSHARETHIS;
const queue = async.queue(async (task) => {
  const { messageDelete, modLogsID, content } = task;
  try {
    await messageDelete.guild.channels.cache.get(modLogsID).send(content);
  } catch (error) {
    console.error(error)
  }
}, 1)
module.exports = async (client, messageDelete) => {
  if (messageDelete.author.bot) return;
  try {
    if (messageDelete.content.length < 1830) {
      if (messageDelete.channel.type === 'dm') return;
      const ciphertext = fs.readFileSync('./database/realmodlogs.txt', 'utf8')
      const bytes = CryptoJS.AES.decrypt(ciphertext, key);
      const decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8))
      if (!decryptedData[messageDelete.guild.id]) return;
      let modLogsID = decryptedData[messageDelete.guild.id].channel
      queue.push({
        messageDelete,
        modLogsID,
        content: `****Message log****

Message sent by <@${messageDelete.author.id}>
Message deleted in <#${messageDelete.channel.id}> 
Message: ||${messageDelete.content}||
Message ID: ${messageDelete.id}`
      })
    } else {
      if (messageDelete.channel.type === 'dm') return;
      const ciphertext = fs.readFileSync('./database/realmodlogs.txt', 'utf8')
      const bytes = CryptoJS.AES.decrypt(ciphertext, key);
      const decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8))
      if (!decryptedData[messageDelete.guild.id]) return;
      let modLogsID = decryptedData[messageDelete.guild.id].channel
      queue.push({
        messageDelete,
        modLogsID,
        content: `****Message log****

Message sent by <@${messageDelete.author.id}>,
Message deleted in <#${messageDelete.channel.id}> 
Message: <Message is too long to show>
Message ID: ${messageDelete.id}`
      });
    }
  } catch (error) {
    const ciphertext = fs.readFileSync('./database/realmodlogs.txt', 'utf8')
    const bytes = CryptoJS.AES.decrypt(ciphertext, key);
    const decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8))
    if (decryptedData[messageDelete.guild.id]) {
      delete decryptedData[messageDelete.guild.id]
      console.log("Kinda Optimized space: Somebody put modlogs for a channel then deleted that channel or the bot no longer has access to the channel")
    }
  }
}