module.exports = async(client) => {
  const { Client, ClientUser, MessageEmbed, Intents } = require('discord.js');
client.on('messageUpdate', async(oldMessage, newMessage) => {
    try {
      var flyMessage = `${oldMessage.content}${newMessage.content}`
       if (flyMessage.length < 1816){
          if (newMessage.channel.type === 'dm') return;
        if (!require('./database/modlogs.json')[newMessage.guild.id]) return;
        let modLogsID  = require('./database/modlogs.json')[newMessage.guild.id].channel;
         var ma = newMessage.content.match(/^(http:|https:)/);
  if (ma) {
return;   
  }
         var mao = oldMessage.content.match(/^(http:|https:)/);
  if (mao) {
return;   
  }
      await newMessage.guild.channels.cache.get(modLogsID).send(`
****Message log****

Message by <@${newMessage.author.id}>,
Message edited in <#${newMessage.channel.id}> 
Before: ${oldMessage.content}
After: ${newMessage.content}
UserID: ${newMessage.author.id} | Message ID: ${newMessage.id}`)      }
      else{
        if (newMessage.channel.type === 'dm') return;
        if (!require('./database/modlogs.json')[newMessage.guild.id]) return;
        let modLogsID  = require('./database/modlogs.json')[newMessage.guild.id].channel;
        await newMessage.guild.channels.cache.get(modLogsID).send(`
****Message log****

Message by <@${newMessage.author.id}>,
Message edited in <#${newMessage.channel.id}> 
Message: <Message is too long to show>
UserID: ${newMessage.author.id} | Message ID: ${newMessage.id}`);
      }
    } catch (error) {
      
              if (require('./database/modlogs.json')[newMessage.guild.id]){
      const filelog = require('./database/modlogs.json')
  delete filelog[newMessage.guild.id]
  console.log("Kinda Optimized space: Somebody put modlogs for a channel then deleted that channel or the bot no longer has access to the channel")
              }
        
    }

})}