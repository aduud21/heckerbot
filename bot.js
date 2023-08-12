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
// BOT TOKEN = PASSWORD OF BOT
const interactionCooldownsRL = new Map();
const interactionCooldownsRLPrevent = new Map();
const debugModeEnabled = true;
const sendMessageToOwner = false; // Should bot message owner if it got invited to their server?
const cooldownTimeRL = 5000;
const { ClusterClient, getInfo } = require('discord-hybrid-sharding');
const { GatewayIntentBits, ActivityType, Partials, Client, Routes, Events } = require('discord.js');
const fs = require('fs');
const client = new Client({
    shards: getInfo().SHARD_LIST,
    shardCount: getInfo().TOTAL_SHARDS,
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
    ],
    partials: [Partials.Message, Partials.Channel],
});
client.cluster = new ClusterClient(client); // initialize the Client, so we access the .broadcastEval()
client.login(process.env.TOKEN);
if (debugModeEnabled) {
    const options = {
        timeZone: 'America/Mexico_City',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
    };
    client.rest.on('rateLimited', (data) => {
        fs.appendFileSync(
            'error.txt',
            '[' + new Date().toLocaleString('en-US', options) + '] ' + JSON.stringify(data) + '\n'
        );
        console.log(
            '[' + new Date().toLocaleString('en-US', options) + '] ' + JSON.stringify(data) + '\n'
        );
    });
}
client.once(Events.ClientReady, () => {
    if (client.user) {
        client.user.setActivity(`servers | Cluster${client.cluster.id}`, {
            type: ActivityType.Watching,
        });
    } else {
        console.log('❌ -> Client user object is null. Failed to login with the provided token.');
    }
});
client.on(Events.InteractionCreate, async (interaction) => {
    if (!interaction.isChatInputCommand()) return;
    if (!interaction.inGuild()) return;
    if (interactionCooldownsRL.has(interaction.member.user.id)) {
        const remainingCooldownRL =
            interactionCooldownsRL.get(interaction.member.user.id) - Date.now();
        const remainingCooldownRLPrevent =
            interactionCooldownsRLPrevent.get(interaction.member.user.id) - Date.now();
        if (remainingCooldownRLPrevent > 0) {
            return;
        }
        if (remainingCooldownRL > 0) {
            interactionCooldownsRLPrevent.set(
                interaction.member.user.id,
                Date.now() + cooldownTimeRL
            );
            interaction
                .reply(
                    `Please wait ${
                        remainingCooldownRL + cooldownTimeRL
                    }ms to use a command again, this cooldown is to prevent abuse.`
                )
                .catch(() => {});
            setTimeout(() => {
                interactionCooldownsRLPrevent.delete(interaction.member.user.id);
            }, cooldownTimeRL);
            return;
        }
    }
    interactionCooldownsRL.set(interaction.member.user.id, Date.now() + cooldownTimeRL);
    setTimeout(() => {
        interactionCooldownsRL.delete(interaction.member.user.id);
    }, cooldownTimeRL);
    try {
        require(`./slashcommands/${interaction.commandName}`)(interaction, client);
    } catch (e) {
        console.log(`Command ${interaction.commandName} had a error, Does it exist in files? ${e}`);
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
