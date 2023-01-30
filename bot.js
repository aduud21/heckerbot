/*
                           
 _____         _             
|  |  |___ ___| |_ ___ ___   
|     | -_|  _| '_| -_|  _|  
|__|__|___|___|_,_|___|_|    
                             
                             
 ____  _                   _ 
|    \|_|___ ___ ___ ___ _| |
|  |  | |_ -|  _| . |  _| . |
|____/|_|___|___|___|_| |___|
                             
                             
 _____     _                 
| __  |___| |_               
| __ -| . |  _|              
|_____|___|_|                

*/

// Bad means adudu21 but I made it like that cuz I want to
// DO NOT DELETE ANY FILES WITHIN THIS BOT AS THAT MOST PROBABLY WILL MAKE THE BOT MALFUNCTION
// Do not delete the client.login since its required for the bot to work, Make sure to read 'README.md'
// Dont share your bot token (its pretty much the password for it)
console.log('⏳-> [LOGINDATA] Checking data...')
const fs = require('fs');
if (!fs.existsSync('./LICENSE')) {
  return;
}
var key = process.env.DONOTSHARETHIS
 
// Create an useless thing lol:
var encryptor = require('simple-encryptor')(key);
const { Intents, Client } = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS,Intents.FLAGS.GUILD_PRESENCES,Intents.FLAGS.GUILD_MESSAGES,Intents.FLAGS.GUILD_MEMBERS ]});
// DO NOT REMOVE THE LINE BELOW!
client.login(encryptor.decrypt(process.env.TOKEN));

// e
console.log('⌛-> [LOGINDATA] Data found, program will try to use it!')
const { keep_alive } = require('./keep_alive');
require('./utils/defines')(client);
require('./utils/structure/registery')(client);
require('./utils/handlers/commands')(client);
require('./utils/handlers/events')(client);
require('./slashcommands/info')(client);
require('./slashcommands/datasxd')(client);
require('./slashcommands/pp')(client);
require('./slashcommands/deldata')(client);
require('./slashcommands/emergencymeeting')(client);
require('./slashcommands/code')(client);
require('./slashcommands/owneronly')(client);
require('./slashcommands/blacklist')(client);
require('./slashcommands/patreon')(client);
require('./slashcommands/uptime')(client);
require('./slashcommands/rps')(client);
require('./slashcommands/checklink')(client);
require('./slashcommands/bloxlinkcheck')(client);
require('./slashcommands/quiz')(client);
const message = 'messageCreate'
client.on('messageCreate', async(message) => {
message.channel.messages.fetch()
require('./utils/handlers/handler')(client, message)
});
client.on('messageDelete', async(message) => {
message.channel.messages.fetch()
require('./md')(client, message)
});
client.on('messageUpdate', (o, message) => {
require('./utils/handlers/editHandles')(client, message);
})
if (!fs.existsSync('./LICENSE')) {
  return;
           }

// adudu21 was here, something: https://replit.com/@AGuyThatLikesFurrys/Hecker-Discord-bot
client.on('guildCreate', (guild) => {
  const { MessageEmbed, Intents } = require('discord.js');
  let channelToSend;
  guild.channels.cache.forEach((channel) => {
    if (
      channel.type === "text" &&
      !channelToSend &&
 guild.me.permissions.has('VIEW_AUDIT_LOG',
        'MANAGE_GUILD',
        'MANAGE_ROLES',
        'MANAGE_CHANNELS',
        'KICK_MEMBERS',
        'BAN_MEMBERS',
        'CHANGE_NICKNAME',
        'MANAGE_NICKNAMES',
        'MANAGE_EMOJIS',
        'VIEW_CHANNEL',
        'SEND_MESSAGES',
        'MANAGE_MESSAGES',
        'EMBED_LINKS',
        'ATTACH_FILES',
        'USE_EXTERNAL_EMOJIS',
        'ADD_REACTIONS')
) channelToSend = channel;
});

  if(!channelToSend) return;
  channelToSend.send(`
Thanks for adding hecker!

❗***Run h!help to view the list of all commands within this bot!***

**❓Need support?**
Join our support server: https://discord.com/invite/GbjgmffUKj

👍 **When your done you can delete this message**

||The bot is currently on discord.js V13||`)
  console.log(`Added to server: ${guild.name}/${guild.id}`)
})
// this is pretty helpful for space
client.on('guildDelete', (guild) => {
  if (!require('./database/modlogs.json')[guild.id]) return;
  const filelog = require('./database/modlogs.json')
  delete filelog[guild.id]
  console.log("Optimized space: bot was removed from a server")
})