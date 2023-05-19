// Some mega important code for the bot or some useless json files are hidden, if you wish to see them Click Files then the three dots at the top then "Show Hidden Files"
// I ALSO RECOMMEND ENCRYPTING THE TOKEN FOR A BIT MORE SECURITY
/*
https://github.com/aduud21/heckerbot#how-to-run-the-bot-on-replit
https://github.com/aduud21/heckerbot#how-to-run-the-bot-on-replit
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
MAYBE ENCRYPT THE TOKEN FOR A BIT MORE SECURITY AND UNENCRYPT IT WHEN NEED TO LOGIN INTO CLIENT
IF YOU DO NOT HAVE MUCH KNOWLEDGE ABOUT JAVASCRIPT/NODE.JS THEN I HIGHLY HIGHLY HIGHLY RECOMMEND YOU TO LEARN IT BEFIRE USING THIS CODE FOR A BOT
IF YOU DO NOT HAVE MUCH KNOWLEDGE ABOUT JAVASCRIPT/NODE.JS THEN I HIGHLY HIGHLY HIGHLY RECOMMEND YOU TO LEARN IT BEFIRE USING THIS CODE FOR A BOT
IF YOU DO NOT HAVE MUCH KNOWLEDGE ABOUT JAVASCRIPT/NODE.JS THEN I HIGHLY HIGHLY HIGHLY RECOMMEND YOU TO LEARN IT BEFIRE USING THIS CODE FOR A BOT
IF YOU DO NOT HAVE MUCH KNOWLEDGE ABOUT JAVASCRIPT/NODE.JS THEN I HIGHLY HIGHLY HIGHLY RECOMMEND YOU TO LEARN IT BEFIRE USING THIS CODE FOR A BOT
THE REASON WHY I SAID THIS MUTILPLE TIMES IS SO YOU HAVE A HIGHER CHANCE OF SEEING IT

IF YOU DONT USE SECRETS FOR THIS REPLIT LIKE YOU JUST PASTE IN YOUR TOKEN THEN ANYBODY IN THE WORLD WHO CAN GO ON REPLIT CAN HACK YOUR BOT (AND PLEASE KEEP YOUR BOT TOKEN PRIVATE), IF SOMEBODY HAS IT THEN THEY CAN DO WHATEVER THEY WANT TO YOUR BOT SUCH AS MAKING IT A NUKE BOT AND NUKING ALL THE SERVERS ITS IN OR HUGE DM SCAM/SPAM AND CAN GET YOU BANNED OFF DISCORD

https://github.com/aduud21/heckerbot#how-to-run-the-bot-on-replit
https://github.com/aduud21/heckerbot#how-to-run-the-bot-on-replit
https://github.com/aduud21/heckerbot#how-to-run-the-bot-on-replit
*/
// AUTO UPDATE/REMOVE VULNERABILITIES
// yea
const { get } = require('https');
var key = process.env.DONOTSHARETHIS;
const CryptoJS = require('crypto-js');
try {
  console.log(`Node version: ${process.version}`)
    console.log('Checking for vulnerabilities');
    const shell = require('shelljs');
    shell.exec('npm audit fix'); // any possible fixable vulnerabilities? if so fix them, that's what this part of the code does
    console.log('Finished checking for vulnerabilities');
    console.log('Making code look good');
    shell.exec('npm run format'); // incase i forget to format the code when it runs, it will do that automatically here!
    console.log('Code look good');
    /*
catch basically catches any error that occurs when you use it correctly, can be very helpful
*/
} catch (error) {
    console.log(`Startup ERROR: ${error}`);
}
// code for replit
get(`https://discord.com/api/v10/gateway`, ({ statusCode }) => {
    if (statusCode == 429) {
        console.log(`Startup ERROR: ⚠️⚠️⚠️ RATELIMIT DETECTED, RESTARTING... ⚠️⚠️⚠️`);
        process.kill(1);
    }
});
// TOKEN CHECK
if (!process.env.TOKEN) {
    console.log(
        'NO TOKEN FOUND, USE REPLIT SECRETS FOR THIS TO WORK AND IF YOU DONT USE REPLIT SECRETS AND HAVE THIS PROJECT ON REPLIT ITS A MASSIVE SECURITY PROBLEM FOR YOUR BOT'
    );
    return;
}

// code for replit
setInterval(() => {
    get(`https://discord.com/api/v10/gateway`, ({ statusCode }) => {
        if (statusCode == 429) {
            console.log(`⚠️⚠️⚠️ RATELIMIT DETECTED, RESTARTING... ⚠️⚠️⚠️`);
            process.kill(1);
        }
    });
}, 10000); // this is in milliseconds, 1000 milliseconds = 1 second, this uses 10000 milliseconds so every 10 seconds it repeats a thing to do
// PLEASE DO NOT DELETE THE LICENSE FILE, and do not claim you made this bot
const { ShardingManager } = require('discord.js');
const encryptedToken = process.env.TOKEN;
const decryptedBytes = CryptoJS.AES.decrypt(encryptedToken, key);
const decryptedToken = decryptedBytes.toString(CryptoJS.enc.Utf8);
const manager = new ShardingManager('./bot.js', { token: decryptedToken }); /*
For public websites such as replit, use secrets/ENV to secure youe bot token
*/

manager.on('shardCreate', (shard) =>
    console.log(`🇨🇦💫🌟[🔵SHARD🔵]🌟💫🇲🇽 Launched shard 🟢 ${shard.id} 🟢`)
);

manager.spawn();
// make sure to read README.md file
