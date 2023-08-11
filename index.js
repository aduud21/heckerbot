const isHostedOnReplit = true; // Please change this depending where you host it, if the platform is like replit (which you need to use a webserver to keep it alive) then enable this
const create_global_command = false; // Set this to true to add/edit global commands, if this is disabled, no global commands will be added or edited, Keeping this enabled (true) will consume more RAM
// This bot is designed (made) to run on replit
// Some mega important code for the bot or some useless json files are hidden, if you wish to see them Click Files then the three dots at the top then "Show Hidden Files"
/*
https://github.com/aduud21/heckerbot#how-to-run-the-bot-on-replit

HELLO FELLOW READER
IF YOU PLAN ON HOSTING YOUR BOT ON REPLIT OR OTHER SITES WHICH MAKES IT PUBLIC
USE
SECRETS
OR
ENV
FOR TOKENS AND PRVIATE THINGS (PASSWORDS AND MORE),
ON REPLIT YOU CAN STORE A TOKEN IN A SECRET, 
IF YOU DO IT IN A SECRET ANYBODY WHO FORKS YOUR CODE CANNOT HAVE YOUR SECRET SAVED IN THEIR REPL/REPLIT HOWEVER IF YOU INVITE SOMEBODY TO YOUR REPLIT (EDIT PERMS) THEN THEY CAN VIEW AND EDIT IT (secrets),

IF YOU DONT USE SECRETS FOR THIS REPLIT LIKE YOU JUST PASTE IN YOUR TOKEN THEN ANYBODY IN THE WORLD WHO CAN GO ON REPLIT CAN HACK YOUR BOT (AND PLEASE KEEP YOUR BOT TOKEN PRIVATE), IF SOMEBODY HAS IT THEN THEY CAN DO WHATEVER THEY WANT TO YOUR BOT SUCH AS MAKING IT A NUKE BOT AND NUKING ALL THE SERVERS ITS IN OR HUGE DM SCAM/SPAM AND CAN GET YOU BANNED OFF DISCORD

https://github.com/aduud21/heckerbot#how-to-run-the-bot-on-replit
*/
console.log(`Node version: ${process.version}`);
const { ClusterManager, HeartbeatManager } = require('discord-hybrid-sharding');
const manager = new ClusterManager(`./bot.js`, {
    totalShards: 'auto',
    totalClusters: 'auto',
    shardsPerClusters: 2,
    mode: 'process',
    token: process.env.TOKEN,
});
manager.on('clusterCreate', (cluster) => console.log(`LC ${cluster.id}`));
manager.spawn({ timeout: -1 });
manager.extend(
    new HeartbeatManager({
        interval: 2000,
        maxMissedHeartbeats: 5,
    })
);
if (isHostedOnReplit) {
    require('./keep_alive');
}
// SLASH commands (global) should only be created once (if i put it in bot.js, it will repeat it multiple times too fast) so this is what this does
if (create_global_command) {
    const { GatewayIntentBits, Partials, Client, REST, Routes } = require('discord.js');
    const client = new Client({
        intents: [GatewayIntentBits.Guilds],
        partials: [Partials.Message, Partials.Reaction, Partials.Channel],
    });
    client.login(process.env.TOKEN);
    const rest = new REST({ version: '10' }).setToken(process.env.TOKEN);
    //Slash commands (Register)
    require('./refreshslashcommand')(client, rest, Routes);
}
