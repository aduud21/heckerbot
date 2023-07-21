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
const debugModeEnabledForRatelimit = true;
const cooldownTimeRL = 5000;
const { ClusterClient, getInfo } = require('discord-hybrid-sharding');
const { GatewayIntentBits, ActivityType, Partials, Client, Routes, Events } = require('discord.js');
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
// e
console.log(
    '⏳ -> [LOGIN] Trying to login with the provided token. If this takes longer than 5 minutes, it might be because you provided an invalid token.'
);
// THIS PART OF THE CODE IS FOR DEBUGGING (MY TIMEZONE)
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
    if (debugModeEnabledForRatelimit) {
        const rateLimitLog = (data) => {
            const currentTime = new Date().toLocaleString('en-US', options);
            console.log('[' + currentTime + '] Client encountered a rate limit:', data);
        };
        client.rest.on('rateLimited', rateLimitLog);
    }
}
client.once(Events.ClientReady, () => {
    const activityText = `servers | Cluster${client.cluster.id}`;
    console.log('⏳ -> [LOGIN] Fetching user tag');
    if (client.user) {
        console.log(`☑️ -> [LOGIN] Logged into token as user ${client.user.tag}`);
        client.user.setActivity(activityText, { type: ActivityType.Watching });
    } else {
        console.log('❌ -> Client user object is null. Failed to login with the provided token.');
    }
});
client.on(Events.InteractionCreate, async (interaction) => {
    if (!interaction.isChatInputCommand()) return;
    if (!interaction.inGuild()) return;
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
        console.log(`Command ${commandName} had a error, Does it exist in files? ${e}`);
    }
});
client.on('messageDelete', async (message) => {
    require('./messageEvents/md')(message);
});
client.on('messageUpdate', async (oldMessage, newMessage) => {
    require('./messageEvents/ed')(oldMessage, newMessage);
});

client.on('guildCreate', async (guild) => {
    let sendMessageToOwner = false; // Should the BOT send a message to the owner og the guild it is invited to?
    if (sendMessageToOwner) {
        require('./guildEvents/guildCreate')(client, guild);
    }
});
// this is pretty helpful for space
client.on('guildDelete', (guild) => {
    require('./guildEvents/guildDelete')(client, guild);
});
