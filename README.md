[![Made with Replit Badge](https://replit.com/badge?caption=Made%20with%20Replit)](https://replit.com/github/aduud21/heckerbot)

# if you plan on watching this repo, i suggest you put Releases only, There may be often new Releases

## As of 5/4/2023, i needed to rename the bot to MutilpleBot so i can try to verify the discord bot, Orignal name is Hecker!

[Website for this discord bot](https://hecker-discord-bot-website.aguythatlikesfurrys.repl.co)

[![GitHub release](https://img.shields.io/github/release/aduud21/heckerbot?include_prereleases=&sort=semver)](https://github.com/aduud21/heckerbot/releases/)
[![issues - heckerbot](https://img.shields.io/github/issues/aduud21/heckerbot)](https://github.com/aduud21/heckerbot/issues)

[![stars - heckerbot](https://img.shields.io/github/stars/aduud21/heckerbot?style=social)](https://github.com/aduud21/heckerbot)
[![forks - heckerbot](https://img.shields.io/github/forks/aduud21/heckerbot?style=social)](https://github.com/aduud21/heckerbot)
[![Discord Support Server](https://img.shields.io/badge/Discord_Support_Server-black?logo=discord)](https://discord.gg/YSEB7PnHVV)
[![CodeFactor](https://www.codefactor.io/repository/github/aduud21/heckerbot/badge)](https://www.codefactor.io/repository/github/aduud21/heckerbot)

**_This project is hosted on replit (https://replit.com/@AGuyThatLikesFurrys/Hecker-Discord-bots), The code of this bot is on replit and github (https://github.com/aduud21/heckerbot)._**

**</> MutilpleBot, On Discord.js V14 as of 5/16/2023 </>**

**_<!>Copyright Notice<!>:_**

**When taking the code for the bot you agree to the [copyright license](/LICENSE).**

_Discord bot:_

When you use this for a discord bot, make a terms of service and privacy policy if you plan in getting verified for your discord bot

You may use these links as a template:

https://bit.ly/heckerTermsOfService

https://bit.ly/heckerbotPrivacypolicy

information about discord intents:
https://gist.github.com/advaith1/e69bcc1cdd6d0087322734451f15aa2f

_Tiny Note: Please atleast do some modifications and make sure its not too simular (by too simular, don't just add a comment to one line of the code or such_, ex:

```js
//this does this
```

_Slash commands:_

You may view the slash commands of the bot by going into slashcommands folder

_Notes:_

1. Bot is not made to work 100% if you just fork/copy the bot and may require you quite a good amount of modifications for it to fully for you
2. if you want to join the support server: https://discord.gg/GbjgmffUKj

\***_Creator:
https://youtube.com/c/adudu21 or adudu21 (on roblox and some other places too), on replit i am AGuyThatLikesFurrys (my username on replit is a joke), My discord UserID is 710227418492960778_**

# Installation

This bot runs on node.js. You will need at least node 17.

Make sure your bot has Message Content Intent enabled else you'll get a error.

This bot runs on replit (hosted there) so you could run it there if you wish.

NOTE: IF THERES A ERROR IN YOUR CODE OR SUCH, PLEASE REVIEW YOURSELF AND IF YOU SEE ANY throw new error PAY ATTENTION TO THAT AND SEE THE REASON, MOST COMMON ERROR AS OF 2023/3/5:

```js
throw new Error('key must be at least ' + MIN_KEY_LENGTH + ' characters long');
    ^

Error: key must be at least 16 characters long
```

## How to run the bot on replit

You'll need your bot token.

[![Import this project to replit](https://replit.com/badge?caption=Import%20this%20project%20to%20Replit)](https://replit.com/github/aduud21/heckerbot) or download the latest github [![GitHub release](https://img.shields.io/github/release/aduud21/heckerbot?include_prereleases=&sort=semver)](https://github.com/aduud21/heckerbot/releases/) (github release is recommanded as it is likely more stable).

Make sure to run

```js
npm install
```

Create a secret named TOKEN and value as the token of your bot.

Create a secret named DONOTSHARETHIS and the value should be something long (should be more than 126-256 characters, 16 is minimum), this will be used for encrypting the token and decrypting too and as well encrypting the modlogs (channel ID/Server ID).

For additional security, this bot encrypts the token and decrypts the token when needed so for that:
In index.js add the following code to the top (line 1):

```js
const CryptoJS = require("crypto-js");
const key = process.env.DONOTSHARETHIS;
const tokenENV = process.env.TOKEN;
const encryptedData = CryptoJS.AES.encrypt(tokenENV, key).toString();
console.log(encryptedData);
// The code below should ONLY be ran once
const fs = require('fs');
 file = {}
 const ciphertext = CryptoJS.AES.encrypt(JSON.stringify(file), key).toString();
        fs.writeFile('./database/realmodlogs.txt', ciphertext, (err) => {
            if (err) {
                console.log(err);
                return;
            }
        });
return;
```
(To avoid issues with database encryption, the code above will write to the database to make it only {} and encrypted)

Check the output (via console),
then copy what it encrypted,
Head back to secrets and replace your token with the encrypted one,

Not done yet, for some slashcommands, go in guildEvents folder then guildCreate file and modify clientUSERID (line 2) to your bot's userID/APPLICATION ID.

After doing this, in events folder (ready.js) you can turn off/on start_up_message (by default it is on), if you want start up messages then:

Replace 957439649142407248 with the channel you want it to send (channel id)

```js
client.channels.cache.get("957439649142407248");
```

For checklink slash command, you must create a secret named api and the value of your safe browsing api key

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

For bloxlinkcheck slash command, you'll need to make a secret named bloxlinkAPIKEY and value as your bloxlink api key, to get a api key, go to https://blox.link/dashboard/developer

if you have read all of this and understood (for example you not gonna claim you made this bot), Thank you, Have a great day!

Email: contact-adudu21@proton.me
