// Some mega important code for the bot or some useless json files are hidden, if you wish to see them Click Files then the three dots at the top then "Show Hidden Files"
// I ALSO RECOMMEND ENCRYPTING THE TOKEN FOR A BIT MORE SECURITY
// AUTO UPDATE/REMOVE VULNERABILITIES
// yea
var key = process.env.DONOTSHARETHIS
const { get } = require("https");
// Create an encryptor:
try {

var encryptor = require('simple-encryptor')(key);
console.log('Checking for vulnerabilities')
const shell = require('shelljs')
 shell.exec('npm audit fix')
console.log('Finished checking for vulnerabilities')
} catch (error) {
   console.log(`Startup ERROR: ${error}`)
}
// code for replit
get(`https://discord.com/api/v10/gateway`, ({ statusCode }) => {
  if (statusCode == 429) {
    console.log(`Startup ERROR: ⚠️⚠️⚠️ RATELIMIT DETECTED, RESTARTING... ⚠️⚠️⚠️`);
    process.kill(1);
  }
})
// TOKEN CHECK
if (!process.env.TOKEN){
  console.log('NO TOKEN FOUND, USE REPLIT SECRETS FOR THIS TO WORK AND IF YOU DONT USE REPLIT SECRETS AND HAVE THIS PROJECT ON REPLIT ITS A MASSIVE SECURITY PROBLEM FOR YOUR BOT') 
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
}, 10000);
// PLEASE DO NOT DELETE THE LICENSE FILE
const { ShardingManager } = require('discord.js');

const manager = new ShardingManager('./bot.js', { token: encryptor.decrypt(process.env.TOKEN) });

manager.on('shardCreate', shard => console.log(`🇨🇦💫🌟[🔵SHARD🔵]🌟💫🇲🇽 Launched shard 🟢 ${shard.id} 🟢`));

manager.spawn();
// make sure to read README.md file