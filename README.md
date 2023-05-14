# if you plan on watching this repo, i suggest you put Releases only

## As of 5/4/2023, i needed to rename the bot to MutilpleBot so i can try to verify the discord bot!

[Website for this discord bot](https://hecker-discord-bot-website.aguythatlikesfurrys.repl.co)


[![GitHub release](https://img.shields.io/github/release/aduud21/heckerbot?include_prereleases=&sort=semver)](https://github.com/aduud21/heckerbot/releases/)
[![issues - heckerbot](https://img.shields.io/github/issues/aduud21/heckerbot)](https://github.com/aduud21/heckerbot/issues)

[![stars - heckerbot](https://img.shields.io/github/stars/aduud21/heckerbot?style=social)](https://github.com/aduud21/heckerbot)
[![forks - heckerbot](https://img.shields.io/github/forks/aduud21/heckerbot?style=social)](https://github.com/aduud21/heckerbot)
[![Discord Support Server](https://img.shields.io/badge/Discord_Support_Server-black?logo=discord)](https://discord.gg/YSEB7PnHVV)
[![CodeFactor](https://www.codefactor.io/repository/github/aduud21/heckerbot/badge)](https://www.codefactor.io/repository/github/aduud21/heckerbot)

***This project is hosted on replit (https://replit.com:/@AGuyThatLikesFurrys/Hecker-Discord-bot?s=app), The code of this bot is on replit and github (https://github.com/aduud21/heckerbot).***

**</> Hecker discord bot, On Discord.js V13 as of 13/1/2023 </>**

***<!>Copyright Notice<!>:***

**When taking the code for the bot you agree to the [copyright license](/LICENSE).**

*Discord bot:*

When you use this for a discord bot, make a terms of service and privacy policy if you plan in getting verified for your discord bot

You may use these links as a template:

https://bit.ly/heckerTermsOfService

https://bit.ly/heckerbotPrivacypolicy

information about discord intents:
https://gist.github.com/advaith1/e69bcc1cdd6d0087322734451f15aa2f

*Tiny Note: Please atleast do some modifications and make sure its not too simular (by too simular, don't just add a comment to one line of the code or such*, ex:
```js
//this does this
```


*Prefix Commands:*

You may view the prefix commands of the bot by going into the Files of this replit or saying mb!help on discord when running the bot

*Slash commands:*

You may view the slash commands of the bot by going into slashcommands folder


*Notes:*

1. Many things may not work when you fork (copy the code of the bot)
2. Bot is not made to work 100% if you just fork/copy the bot and may require you quite a good amount of modifications for it to fully for you, if you wish to know when new updates are released join the support server of the bot at https://discord.gg/GbjgmffUKj
3. i have spent over 100 hours on this discod bot SO PLEASE DO NOT CLAIM IT AS YOURS (EX: I MADE THIS BOT),IF YOU DO USE THIS BOT PLEASE LET THE CREDITS/CREDIT ME

****Creator:
https://youtube.com/c/adudu21 or adudu21 (on roblox and some other places too), on replit i am AGuyThatLikesFurrys (my username on replit is a joke), My discord UserID is 710227418492960778 and username with tag Hecker#1844****

# Installation

This bot runs on node.js. You will need at least node 16.

Make sure your bot has Message Content Intent enabled else you'll get a error.

This bot runs on replit (hosted there) so you could run it there if you wish. 

NOTE: IF THERES A ERROR IN YOUR CODE OR SUCH, PLEASE REVIEW YOURSELF AND IF YOU SEE ANY throw new error PAY ATTENTION TO THAT AND SEE THE REASON, MOST COMMON ERROR AS OF 2023/3/5:
```js
throw new Error('key must be at least ' + MIN_KEY_LENGTH + ' characters long');
    ^

Error: key must be at least 16 characters long
```

## How to run the bot on replit

First of all install node@17 if you don't got it (the bot currently runs on node@17.9.1), Run 
```
npm install node@17 
```
in shell.

You'll need your bot token.
 
Export this project to replit (download latest version and put the code in your replit) OR fork https://replit.com:/@AGuyThatLikesFurrys/Hecker-Discord-bot?s=app directly in replit (Note: this way may break sometimes) .
 
Create a secret named TOKEN and value as the token of your bot.

Create a secret named DONOTSHARETHIS and the value should be something long (should be more than 126-256 characters, 16 is minimum), this will be used for encrypting the token and decrypting too and as well encrypting the modlogs (channel ID/Server ID).

For additional security, this bot encrypts the token and decrypts the token when needed so for that:
In index.js add the following code to the top (line 1):
```js
var key = process.env.DONOTSHARETHIS
var encryptor = require('simple-encryptor')(key);
console.log(encryptor.encrypt(process.env.TOKEN))
return;
```
Check the output (via console), 
then copy what it encrypted,
Head back to secrets and replace your token with the encrypted one,
Make sure to remove all content inside "realmodlogs.txt" located in database folder

Not done yet, for some slashcommands via bot.js after line 80 you must replace 947733660432490506 to your bot's userID/APPLICATION ID.

After doing this, in events folder (ready.js) you can turn off/on start_up_message (by default it is on), if you want start up messages then:

Replace 957439649142407248 with the channel you want it to send (channel id)
```js
client.channels.cache.get('957439649142407248')
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
10. Click safe browsing (Not the legacy"
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
