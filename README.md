# if you plan on watching this repo, i suggest you put Releases only, There may be often new Releases

## As of 5/4/2023, i needed to rename the bot to MutilpleBot so i can try to verify the discord bot, Orignal name is Hecker!
### EOL (End of life) of MutilpleBot may happen at 2024/1/5
[![GitHub release](https://img.shields.io/github/release/aduud21/heckerbot?include_prereleases=&sort=semver)](https://github.com/aduud21/heckerbot/releases/)
[![issues - heckerbot](https://img.shields.io/github/issues/aduud21/heckerbot)](https://github.com/aduud21/heckerbot/issues)

[![stars - heckerbot](https://img.shields.io/github/stars/aduud21/heckerbot?style=social)](https://github.com/aduud21/heckerbot)
[![forks - heckerbot](https://img.shields.io/github/forks/aduud21/heckerbot?style=social)](https://github.com/aduud21/heckerbot)
[![Discord Support Server](https://img.shields.io/badge/Discord_Support_Server-black?logo=discord)](https://discord.gg/YSEB7PnHVV)

**</> MutilpleBot, On Discord.js V14 as of 5/16/2023 </>**

**_<!>Copyright Notice<!>:_**

**When taking the code for the bot you agree to the [copyright license](/LICENSE).**

_Discord bot:_

information about discord intents:
https://gist.github.com/advaith1/e69bcc1cdd6d0087322734451f15aa2f

_Tiny Note: Please atleast do some modifications and make sure its not too simular (by too simular, don't just add a comment to one line of the code or such, ex:

```js
//this does this
```

_Slash commands:_

You may view the slash commands of the bot by going into slashcommands folder

_Notes:_

1. Bot is not made to work 100% if you just fork/copy the bot and may require you quite a good amount of modifications for it to fully for you
2. if you want to join the support server: https://discord.gg/GbjgmffUKj

# Installation

This bot runs on node.js. You will need at least node 16.18.1

Make sure your bot has Message Content Intent enabled else you'll get a error.

This bot runs on replit (hosted there) and it is recommended to run it there.

NOTE: IF THERES A ERROR IN YOUR CODE OR SUCH, PLEASE REVIEW YOURSELF AND IF YOU SEE ANY throw new error PAY ATTENTION TO THAT AND SEE THE REASON

## How to run the bot on replit
Secrets are environment variables (on replit you can create secrets by using it's bulit-in gui)

You'll need your bot token.

[![Import this project to replit](https://replit.com/badge?caption=Import%20this%20project%20to%20Replit)](https://replit.com/github/aduud21/heckerbot) or download the latest github [![GitHub release](https://img.shields.io/github/release/aduud21/heckerbot?include_prereleases=&sort=semver)](https://github.com/aduud21/heckerbot/releases/) (github release is recommanded as it is likely more stable however if you want to be uptodate with the bot code, then import).

Make sure to run

```js
npm install
```

Create a secret named TOKEN and value as the token of your bot.

## MongoDB:
1. You'll need a [MongoDB](https://mongodb.com/) database set up. Make sure you have 0.0.0.0 whitelisted in the IP addresses so it will work with Replit or such
2. Create a secret called mongodb and put your database's connection URI in there. It should look something like this: mongodb+srv://username:password@cluster0.clusters.mongodb.net/?retryWrites=true&w=majority

Don't use the example I provided, put your own, it won't work. If you don't have a MongoDB, you can create one at [MongoDB](https://mongodb.com/).

## For checklink slash command, you must create a secret named api and the value of your safe browsing api key

1. Go to https://console.cloud.google.com and create a account if you have not
2. Click "Select a project" dropdown box then click "New project"
3. Name the New project anything you want
4. Click "Create"
5. Wait till it's done creating
6. Select the project you made
7. Click "APIs & Services" in the navigation menu
8. Click "Library"
9. Search "safe browsing api"
10. Click safe browsing (Not the legacy)
11. Click "Enable"
12. Click "Create credentials"
13. Make sure it is safe browsing api and set What data will you be accessing? to Public data
14. Click "Next"
15. Your API key should be shown to you!
16. Make sure you copied you api key then click "Done"

i did step 15 but did not save my API key!

1. Step 6 then 7
2. Click "Credentials"
3. Find your API key and click "SHOW key"

## For bloxlinkcheck slash command, you'll need to make a secret named bloxlinkAPIKEY and value as your bloxlink api key, to get a api key, go to https://blox.link/dashboard/developer

if you have read all of this and understood (for example you not gonna claim you made this bot), Thank you, Have a great day!

if you have two slash commands named the exact same, run this (via runcode) to remove the duplicate?:
```js
const { GatewayIntentBits, Partials, Client } = require('discord.js');
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMessageReactions,
  ],
  partials: [Partials.Message, Partials.Reaction, Partials.Channel],
});

client.login(process.env.TOKEN);

client.on('ready', async () => {
  try {
    const guilds = client.guilds.cache;
    const totalGuilds = guilds.size;
    let deletedGuilds = 0;

    for (const guild of guilds.values()) {
      try {
        const commands = await guild.commands.fetch();
        const commandIDs = commands.map((command) => command.id);
        console.log(`Command IDs in guild ${guild.id}: ${commandIDs.join(', ')}`);
        await Promise.all(commandIDs.map((commandID) => guild.commands.delete(commandID)));
        console.log(`Deleted ${commandIDs.length} commands in guild ${guild.id}`);
        deletedGuilds++;
        console.log(`Deleted commands in ${deletedGuilds} out of ${totalGuilds} guilds`);
      } catch (error) {
        console.error(`Failed to delete commands in guild ${guild.id}:`);
        console.error(error);
      }
    }

    console.log(`Total deleted commands: ${deletedGuilds}`);
  } catch (error) {
    console.error('Failed to fetch guilds:');
    console.error(error);
  }
});
```
To delete a specific global command?:
```js
const { GatewayIntentBits, Partials, Client, REST, Routes, Events } = require('discord.js'); 
const client = new Client({ intents: [ GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent, GatewayIntentBits.GuildMessageReactions, ], partials: [Partials.Message, Partials.Reaction, Partials.Channel], }); 
client.login(process.env.TOKEN);
const rest = new REST({ version: '10' }).setToken(process.env.TOKEN); 
client.on('ready', async () => { try { await rest.delete(Routes.applicationCommand('clientid', 'commandid')); console.log('Successfully deleted application command'); } catch (error) { console.error('Failed to delete application command'); console.error(error); } });
```
