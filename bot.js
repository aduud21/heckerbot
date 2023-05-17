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
// BOT HAD TO BE RENAMED TO MutilpleBot BECAUSE DISCORD MAY DECLINE MY VERIFY REQUEST!!!! OLD NAME IS Hecker
// Bad means adudu21 but I made it like that cuz I want to
// DO NOT DELETE ANY FILES WITHIN THIS BOT AS THAT MOST PROBABLY WILL MAKE THE BOT MALFUNCTION
// Do not delete the client.login since its required for the bot to work, Make sure to read 'README.md'
// Dont share your bot token (its pretty much the password for it)
console.log('⏳-> [LOGINDATA] Checking data...');
const fs = require('fs');
var key = process.env.DONOTSHARETHIS;
const CryptoJS = require('crypto-js');
const { GatewayIntentBits, Client, Partials, REST, Routes, Events } = require('discord.js');
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMessageReactions,
        GatewayIntentBits.GuildWebhooks,
    ],
    partials: [Partials.Message, Partials.Reaction, Partials.Channel],
});
const encryptedData = process.env.TOKEN;
const decryptedBytes = CryptoJS.AES.decrypt(encryptedData, key);
const decryptedToken = decryptedBytes.toString(CryptoJS.enc.Utf8);
// DO NOT REMOVE THE LINE BELOW!
client.login(decryptedToken);
const rest = new REST({ version: '10' }).setToken(decryptedToken);
// e
console.log('⌛-> [LOGINDATA] Data found, program will try to use it!');
const { keep_alive } = require('./keep_alive');
require('./utils/defines')(client);
require('./utils/handlers/commands')(client);
require('./utils/handlers/events')(client);
client.on(Events.InteractionCreate, async (interaction) => {
    if (!interaction.isChatInputCommand()) return;
    require('./slashcommands/datasxd')(client, interaction);
    require('./slashcommands/deldata')(client, interaction);
    require('./slashcommands/code')(client, interaction);
    require('./slashcommands/owneronly')(client, interaction);
    require('./slashcommands/uptime')(client, interaction);
    require('./slashcommands/rps')(client, interaction);
    require('./slashcommands/checklink')(client, interaction);
    require('./slashcommands/bloxlinkcheck')(client, interaction);
    require('./slashcommands/quiz')(client, interaction);
});
client.on('messageCreate', async (message) => {
    require('./utils/handlers/handler')(client, message);
});
client.on('messageDelete', async (message) => {
    require('./messageEvents/md')(client, message);
});
client.on('messageUpdate', async (oldMessage, newMessage) => {
    require('./messageEvents/ed')(client, oldMessage, newMessage);
});

// adudu21 was here, something: https://replit.com/@AGuyThatLikesFurrys/Hecker-Discord-bot

client.on('guildCreate', async (guild) => {
    require('./guildEvents/guildCreate')(client, guild, rest, Routes);
});
// this is pretty helpful for space
client.on('guildDelete', (guild) => {
    require('./guildEvents/guildDelete')(client, guild);
});
