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
if (!fs.existsSync('./LICENSE')) {
    return;
}
var key = process.env.DONOTSHARETHIS;
const CryptoJS = require('crypto-js');
const { Intents, Client } = require('discord.js');
const client = new Client({
    intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
});
const encryptedData = process.env.TOKEN;
const decryptedBytes = CryptoJS.AES.decrypt(encryptedData, key);
const decryptedToken = decryptedBytes.toString(CryptoJS.enc.Utf8);
// DO NOT REMOVE THE LINE BELOW!
client.login(decryptedToken);
// e
console.log('⌛-> [LOGINDATA] Data found, program will try to use it!');
const { keep_alive } = require('./keep_alive');
require('./utils/defines')(client);
require('./utils/handlers/commands')(client);
require('./utils/handlers/events')(client);
require('./slashcommands/datasxd')(client);
require('./slashcommands/deldata')(client);
require('./slashcommands/code')(client);
require('./slashcommands/owneronly')(client);
require('./slashcommands/uptime')(client);
require('./slashcommands/rps')(client);
require('./slashcommands/checklink')(client);
require('./ed')(client);
require('./slashcommands/bloxlinkcheck')(client);
require('./slashcommands/quiz')(client);
client.on('messageCreate', async (message) => {
    require('./utils/handlers/handler')(client, message);
});
client.on('messageDelete', async (message) => {
    require('./md')(client, message);
});
if (!fs.existsSync('./LICENSE')) {
    return;
}

// adudu21 was here, something: https://replit.com/@AGuyThatLikesFurrys/Hecker-Discord-bot

client.on('guildCreate', async (guild) => {
    const clientUSERID = '947733660432490506';
    const guild_sc_special = true;
    // if the one above is enabled you must specify a certain guild ID for special slash commands
    const custom_sc_special_guild_id = '947968591444205568';
    try {
        console.log(`Added to server: ${guild.name}/${guild.id}`);

        if (guild_sc_special) {
            if (guild.id === custom_sc_special_guild_id) {
                // stuff, to have access towards it, open bot.json in config folder and replace 710227418492960778 with your discord user ID (via "owners":"710227418492960778")
                client.api
                    .applications(`${clientUSERID}`)
                    .guilds(`${custom_sc_special_guild_id}`)
                    .commands.post({
                        data: {
                            name: 'runcode',
                            description: 'ONLY THE CREATOR CAN RUN THIS COMMAND',
                            options: [
                                {
                                    name: 'code',
                                    description: 'What code do you wish to run',
                                    type: 3,
                                    required: true,
                                },
                            ],
                        },
                    })
                    .catch(() => {});
            }
        }
        try {
            const commands = [
                {
                    name: 'bloxlinkcheck',
                    description: 'Check if a user is verified with bloxlink',
                    options: [
                        {
                            name: 'dcuserid',
                            description: 'Their discord UserID',
                            type: 3,
                            required: true,
                        },
                    ],
                },
                {
                    name: 'checklink',
                    description: "Check a link if it's possibly malicious",
                    options: [
                        {
                            name: 'link',
                            description: 'Domain or URL allowed',
                            type: 3,
                            required: true,
                        },
                    ],
                },
                {
                    name: 'code',
                    description: "View the bot's source code",
                },
                {
                    name: 'information',
                    description: 'View information about this discord bot',
                },
                {
                    name: 'deldata',
                    description:
                        'This will tell you how to delete all the data that the bot has collected about your server',
                },
                {
                    name: 'quiz',
                    description: 'Some random questions',
                },
                {
                    name: 'rps',
                    description: 'This command will randomly pick from Rock Paper Scissors',
                },
                {
                    name: 'uptime',
                    description: "View the bot's uptime",
                },
            ];
            for (let i = 0; i < commands.length; i++) {
                setTimeout(() => {
                    client.api
                        .applications(`${clientUSERID}`)
                        .guilds(`${guild.id}`)
                        .commands.post({ data: commands[i] })
                        .catch(() => {});
                }, i * 2000);
            }
        } catch (error) {
            console.error(`Error creating slash commands: ${error}`);
        }
    } catch (err) {
        console.log('guild command did not work making, bot.js line 83 i think');
    }
    try {
        const owner = await guild.fetchOwner();
        await owner.send(`
Thanks for adding MutilpleBot!
_MutilpleBot has been added to ${guild.name} (Server ID: ${guild.id})_
||Please wait while discord is registering the slash commands in your server||
❗***Run mb!help in ${guild.name} to view some of the prefix commands within this bot! (Alot of the prefix commands are now slash commands but if you don't have any slash command from the bot on your server after a while please re-invite the bot to your server)***

**❓Need support?**
Join our support server: https://discord.com/invite/GbjgmffUKj

||The bot is currently on discord.js V13||`);
    } catch (error) {
        console.log(`Failed to send message to server owner: ${error.message}`);
    }
});
// this is pretty helpful for space
client.on('guildDelete', (guild) => {
    const ciphertext = fs.readFileSync('./database/realmodlogs.txt', 'utf8');
    const bytes = CryptoJS.AES.decrypt(ciphertext, key);
    const filelog = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    if (!filelog[guild.id]) {
        return;
    }
    delete filelog[guild.id];
    const encryptedData = CryptoJS.AES.encrypt(JSON.stringify(filelog), key).toString();
    fs.writeFile('./database/realmodlogs.txt', encryptedData, (err) => {
        if (err) {
            console.error(`Error writing to modlogs file: ${err}`);
        }
    });
    console.log('Optimized space: bot was removed from a server');
});
