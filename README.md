# if you plan on watching this repo, i suggest you put Releases only

## As of 5/4/2023, i needed to rename the bot to MutilpleBot so i can try to verify the discord bot, Orignal name is Hecker!

[Website for this discord bot](https://hecker-discord-bot-website.aguythatlikesfurrys.repl.co)

[![GitHub release](https://img.shields.io/github/release/aduud21/heckerbot?include_prereleases=&sort=semver)](https://github.com/aduud21/heckerbot/releases/)
[![issues - heckerbot](https://img.shields.io/github/issues/aduud21/heckerbot)](https://github.com/aduud21/heckerbot/issues)

[![stars - heckerbot](https://img.shields.io/github/stars/aduud21/heckerbot?style=social)](https://github.com/aduud21/heckerbot)
[![forks - heckerbot](https://img.shields.io/github/forks/aduud21/heckerbot?style=social)](https://github.com/aduud21/heckerbot)
[![Discord Support Server](https://img.shields.io/badge/Discord_Support_Server-black?logo=discord)](https://discord.gg/YSEB7PnHVV)
[![CodeFactor](https://www.codefactor.io/repository/github/aduud21/heckerbot/badge)](https://www.codefactor.io/repository/github/aduud21/heckerbot)

**_This project is hosted on solarhosting (https://solarhosting.cc/)_**

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
https://youtube.com/c/adudu21 or adudu21 (on roblox and some other places too), on replit i am AGuyThatLikesFurrys (my username on replit is a joke), My discord UserID is 710227418492960778_***

# Installation

This bot runs on node.js 18. You will need at least node 17.

Make sure your bot has Message Content Intent enabled else you'll get a error.

NOTE: IF THERES A ERROR IN YOUR CODE OR SUCH, PLEASE REVIEW YOURSELF AND IF YOU SEE ANY throw new error PAY ATTENTION TO THAT AND SEE THE REASON, MOST COMMON ERROR AS OF 2023/3/5:

```js
throw new Error('key must be at least ' + MIN_KEY_LENGTH + ' characters long');
    ^

Error: key must be at least 16 characters long
```

## How to run the bot on solarhosting

Create a account at https://account.solarhosting.cc/register?ref=c9pCINO3 (Make sure your password is long and secure)

Servers > Create Server

Enter whatever name you want > "Software / Games" set to "Bot hosting" > Specification set to NodeJS then Node > FREE (if you don't wanna pay) > Small Bot (Free forever) > Create server

Once your server is created then on servers find your server and click the "Manage" Button

Please enable Two-Step Verification for security purposes at https://panel.solarhosting.cc/account

Download the latest github [![GitHub release](https://img.shields.io/github/release/aduud21/heckerbot?include_prereleases=&sort=semver)](https://github.com/aduud21/heckerbot/releases/) and then import it in your Files via server

Make sure to install the needed modules/packages.

in config/TOKENORAPIKEYS.env, change TOKEN to your bot token 

in config/TOKENORAPIKEYS.env, change DONOTSHARETHIS to a value that should be something long (should be more than 126-256 characters, 16 is minimum), this will be used for encrypting the token and decrypting too and as well encrypting the modlogs (channel ID/Server ID).

Before you proceed, please go to line 34 and 35 in index.js and put // at the start of the line, once you do and finish the additional security step, remove the // that you added in line 34 and 35, ex:
```js
//let key = process.env.DONOTSHARETHIS;
//const CryptoJS = require('crypto-js');
```

For additional security, this bot encrypts the token and decrypts the token when needed so for that:
In index.js add the following code to the top (line 1):

```js
require('dotenv').config({ path: './config/TOKENORAPIKEYS.env' });
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
Head back to in config/TOKENORAPIKEYS.env and replace your token with the encrypted one,

Not done yet, for some slashcommands, go in guildEvents folder then guildCreate file and modify clientUSERID (line 2) to your bot's userID/APPLICATION ID.

After doing this, in events folder (ready.js) you can turn off/on start_up_message (by default it is on), if you want start up messages then:

Replace 957439649142407248 with the channel you want it to send (channel id)

```js
client.channels.cache.get("957439649142407248");
```

For checklink slash command, you must replace api in config/TOKENORAPIKEYS.env to your safe browsing api key

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

For bloxlinkcheck slash command, you'll need to replace bloxlinkAPIKEY in config/TOKENORAPIKEYS.env to your bloxlink api key, to get a api key, go to https://blox.link/dashboard/developer

if you have read all of this and understood (for example you not gonna claim you made this bot), Thank you, Have a great day!

Email: contact-adudu21@proton.me
