/*
                           
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
// Dont share your bot token (it's pretty much the password for it)
console.log('⏳-> [LOGINDATA] Checking data...');
const interactionCooldownsRL = new Map();
const interactionCooldownsRLPrevent = new Map();
const debugModeEnabled = true;
const cooldownTimeRL = 5000;
const { ClusterClient, getInfo } = require('discord-hybrid-sharding');
const { GatewayIntentBits, Partials, Client, REST, Routes, Events } = require('discord.js');
const client = new Client({
    shards: getInfo().SHARD_LIST, // An array of shards that will get spawned
    shardCount: getInfo().TOTAL_SHARDS, // Total number of shards
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMessageReactions,
    ],
    partials: [Partials.Message, Partials.Reaction, Partials.Channel],
});
// DO NOT REMOVE THE LINE BELOW!
client.cluster = new ClusterClient(client); // initialize the Client, so we access the .broadcastEval()
client.login(process.env.TOKEN);
const rest = new REST({ version: '10' }).setToken(process.env.TOKEN);
// e
console.log('⌛-> [LOGINDATA] Data found, program will try to use it!');
// THIS PART OF THE CODE IS FOR DEBUGGING
if (debugModeEnabled) {
    const options = {
        timeZone: 'America/Mexico_City',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
    };
    const logError = (data) => {
        const currentTime = new Date().toLocaleString('en-US', options);
        console.error('[' + currentTime + '] Client encountered an error:', data);
    };
    process.on('uncaughtException', (err) => {
        logError('Uncaught Exception: ' + err.stack);
    });
    process.on('unhandledRejection', (reason) => {
        logError('Unhandled Rejection: ' + reason);
    });
    process.on('exit', (code) => {
        const currentTime = new Date().toLocaleString('en-US', options);
        console.log('[' + currentTime + '] Process exited with code:', code);
    });
    const rateLimitLog = (data) => {
        const currentTime = new Date().toLocaleString('en-US', options);
        console.log('[' + currentTime + '] Client encountered a rate limit:', data);
    };
    client.rest.on('rateLimited', rateLimitLog);
}
require('./utils/defines')(client);
require('./utils/handlers/events')(client);
require('./prefixcommand')(client);
client.on(Events.InteractionCreate, async (interaction) => {
    if (!interaction.isChatInputCommand()) return;
    const userId = interaction.member.user.id;
    if (interactionCooldownsRL.has(userId)) {
        const remainingCooldownRL = interactionCooldownsRL.get(userId) - Date.now();
        const remainingCooldownRLPrevent = interactionCooldownsRLPrevent.get(userId) - Date.now();
        if (remainingCooldownRLPrevent > 0) {
            return;
        }
        if (remainingCooldownRL > 0) {
            interactionCooldownsRLPrevent.set(userId, Date.now() + cooldownTimeRL);
            interaction
                .reply(
                    `Please wait ${
                        remainingCooldownRL + cooldownTimeRL
                    }ms to use a command again, this cooldown is to prevent abuse.`
                )
                .catch(() => {});
            setTimeout(() => {
                interactionCooldownsRLPrevent.delete(userId);
            }, cooldownTimeRL);
            return;
        }
    }
    interactionCooldownsRL.set(userId, Date.now() + cooldownTimeRL);
    setTimeout(() => {
        interactionCooldownsRL.delete(userId);
    }, cooldownTimeRL);
    const commandName = interaction.commandName;
    try {
        require(`./slashcommands/${commandName}`)(interaction, client);
    } catch (e) {
        console.log(e);
    }
});
client.on('messageDelete', async (message) => {
    require('./messageEvents/md')(message);
});
client.on('messageUpdate', async (oldMessage, newMessage) => {
    require('./messageEvents/ed')(oldMessage, newMessage);
});

// adudu21 was here, something: https://replit.com/@AGuyThatLikesFurrys/Hecker-Discord-bot

client.on('guildCreate', async (guild) => {
    require('./guildEvents/guildCreate')(client, guild);
});
// this is pretty helpful for space
client.on('guildDelete', (guild) => {
    require('./guildEvents/guildDelete')(client, guild);
});

client.on('messageCreate', async (message) => {
    require('./handleprefixcommand')(client, message, rest, Routes);
});

//Slash commands
require('./refreshslashcommand')(client, rest, Routes);
