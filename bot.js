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
// Do not delete the client.login since its required for the bot to work, Make sure to read 'README.md'
// BOT TOKEN = PASSWORD OF BOT
console.log('⏳-> [LOGINDATA] Checking data...');
const interactionCooldownsRL = new Map();
const interactionCooldownsRLPrevent = new Map();
const debugModeEnabled = true;
let sendMessageToOwner = false; // Should bot message owner if it got invited to their server?
const cooldownTimeRL = 5000;
const { ClusterClient, getInfo } = require('discord-hybrid-sharding');
const { GatewayIntentBits, ActivityType, Partials, Client, Routes, Events } = require('discord.js');
const client = new Client({
    shards: getInfo().SHARD_LIST,
    shardCount: getInfo().TOTAL_SHARDS,
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMessageReactions,
    ],
    partials: [Partials.Message, Partials.Reaction, Partials.Channel],
});
client.cluster = new ClusterClient(client); // initialize the Client, so we access the .broadcastEval()
client.login(process.env.TOKEN);
console.log(
    '⏳ -> [LOGIN] Trying to login with the provided token. If this takes longer than 5 minutes, it might be because you provided an invalid token.'
);
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
if (sendMessageToOwner) {
    client.on('guildCreate', async (guild) => {
        require('./guildEvents/guildCreate')(client, guild);
    });
}
// this is pretty helpful for space (setmodlog feature)
client.on('guildDelete', (guild) => {
    require('./guildEvents/guildDelete')(client, guild);
});
