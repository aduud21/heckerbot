module.exports = async(client, messageDelete) => {
    try {
      if (messageDelete.channel.type === 'dm') return;
        if (!require('./database/modlogs.json')[messageDelete.guild.id]) return;
        let modLogsID  = require('./database/modlogs.json')[messageDelete.guild.id].channel;
        await messageDelete.guild.channels.cache.get(modLogsID).send(`
****Message log****

Message sent by <@${messageDelete.author.id}>,
Message deleted in <#${messageDelete.channel.id}> 
Message: ´${messageDelete.content}´
UserID: ${messageDelete.author.id} | Message ID: ${messageDelete.id}`);
        
    } catch (error) {
      
              if (require('./database/modlogs.json')[messageDelete.guild.id]){
      const filelog = require('./database/modlogs.json')
  delete filelog[messageDelete.guild.id]
  console.log("Kinda Optimized space: Somebody put modlogs for a channel then deleted that channel or the bot no longer has access to the channel")
              }
        
    }

}