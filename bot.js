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
const client = new Client({ intents: [Intents.FLAGS.GUILDS,Intents.FLAGS.GUILD_MESSAGES]});
// DO NOT REMOVE THE LINE BELOW!
client.login(encryptor.decrypt(process.env.TOKEN));

// e
console.log('⌛-> [LOGINDATA] Data found, program will try to use it!')
const { keep_alive } = require('./keep_alive');
require('./utils/defines')(client);
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
require('./ed')(client);
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

client.on('guildCreate', async (guild) => {
  const clientUSERID = '947733660432490506'
  const guild_sc_special = true;
  // if the one above is enabled you must specify a certain guild ID for special slash commands
  const custom_sc_special_guild_id = '947968591444205568'
  try {
  console.log(`Added to server: ${guild.name}/${guild.id}`)

if (guild_sc_special){
  if (guild.id === custom_sc_special_guild_id){
  
// blacklist, to have access towards it, open slashcommands folder then blacklist.js and change every 710227418492960778 to your discord user ID then open config and open bot.json and replace 710227418492960778 with your discord user ID (via "owners":"710227418492960778")
client.api.applications(`${clientUSERID}`).guilds(`${custom_sc_special_guild_id}`).commands.post({
data: {
            name: "runcode",
            description: "ONLY THE CREATOR CAN RUN THIS COMMAND",
          options: [{ name: 'code', description: 'What code do you wish to run', type: 3, required: true }],
     }}).catch(() => {})
client.api.applications(`${clientUSERID}`).guilds(`${custom_sc_special_guild_id}`).commands.post({
        data: {
            name: "blacklist",
            description: "ONLY THE CREATOR CAN RUN THIS COMMAND",
          options: [{ name: 'userid', description: 'Who do you wish to blacklist, HAS TO BE USERID OR ELSE WONT WORK', type: 3, required: true }],
 }}).catch(() => {})
  }}
  try {
const commands = [
  {
    name: "bloxlinkcheck",
    description: "Check if a user is verified with bloxlink",
    options: [{ name: 'dcuserid', description: 'Their discord UserID', type: 3, required: true }]
  },
  {
    name: "checklink",
    description: "Check a link if it's malicious",
    options: [{ name: 'link', description: 'Domain or URL allowed', type: 3, required: true }]
  },
  {
    name: "code",
    description: "View the bot's source code"
  },
  {
    name: "information",
    description: "View information about this discord bot"
  },
  {
    name: "deldata",
    description: "This will tell you how to delete all the data that the bot has collected about your server"
  },
  {
    name: "emergencymeeting",
    description: "Among us emergency meeting"
  },
  {
    name: "quiz",
    description: "Some random questions"
  },
  {
    name: "rps",
    description: "This command will randomly pick from Rock Paper Scissors"
  },
  {
    name: "uptime",
    description: "View the bot's uptime"
  }
];

// Loop through the commands and add a delay between each post request
for (let i = 0; i < commands.length; i++) {
  setTimeout(() => {
    client.api.applications(`${clientUSERID}`).guilds(`${guild.id}`).commands.post({ data: commands[i] }).catch(() => {});
  }, i * 2000);
}
} catch (error) {
  console.error(`Error creating slash commands: ${error}`);
}

        } catch (err){
console.log("guild command did not work making, bot.js line 83 i think")
  }
try {
  const owner = await guild.fetchOwner();
  await owner.send(`
Thanks for adding hecker!
__Hecker has been added to ${guild.name} (Server ID: ${guild.id})__
||Please wait while discord is registering the slash commands in your server||
❗***Run h!help in ${guild.name} to view some of the prefix commands within this bot! (Alot of the prefix commands are now slash commands but if you don't have any slash command from the bot on your server after a while please re-invite the bot to your server)***

**❓Need support?**
Join our support server: https://discord.com/invite/GbjgmffUKj

||The bot is currently on discord.js V13||`)
} catch (error) {
  console.log(`Failed to send message to server owner: ${error.message}`);
}

});
// this is pretty helpful for space
client.on('guildDelete', (guild) => {
  
  if (!require('./database/modlogs.json')[guild.id]) return;
  const filelog = require('./database/modlogs.json')
  delete filelog[guild.id]
  console.log("Optimized space: bot was removed from a server")
})