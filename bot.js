// Bad means adudu21 but I made it like that cuz I want to
// DO NOT DELETE ANY FILES WITHIN THIS BOT AS THAT MOST PROBABLY WILL MAKE THE BOT MALFUNCTION
// Do not delete the client.login since its required for the bot to work, Make sure to read 'README.md'
// Dont share your bot token (its pretty much the password for it)
console.log('⏳-> [LOGINDATA] Checking data...')
const fs = require('fs');
if (!fs.existsSync('./LICENSE')) {
  return;
}
var key = process.env.DONOTSHARETHIS
 
// Create an useless thing lol:
var encryptor = require('simple-encryptor')(key);
const { Intents, Client } = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS,Intents.FLAGS.GUILD_PRESENCES,Intents.FLAGS.GUILD_MESSAGES,Intents.FLAGS.GUILD_MEMBERS ]});
// DO NOT REMOVE THE LINE BELOW!
client.login(encryptor.decrypt(process.env.TOKEN));

// e
console.log('⌛-> [LOGINDATA] Data found, program will try to use it!')
const { keep_alive } = require('./keep_alive');
require('./utils/defines')(client);
require('./utils/structure/registery')(client);
require('./utils/handlers/commands')(client);
require('./utils/handlers/events')(client);
require('./slashcommands/info')(client);
require('./slashcommands/datasxd')(client);
require('./slashcommands/pp')(client);
require('./slashcommands/deldata')(client);
require('./slashcommands/emergencymeeting')(client);
require('./slashcommands/code')(client);
require('./slashcommands/owneronly')(client);
require('./slashcommands/blacklist')(client);
require('./slashcommands/patreon')(client);
require('./slashcommands/uptime')(client);
require('./slashcommands/rps')(client);
require('./slashcommands/checklink')(client);
require('./slashcommands/bloxlinkcheck')(client);
require('./slashcommands/quiz')(client);
const message = 'messageCreate'
client.on('messageCreate', async(message) => {
message.channel.messages.fetch()
require('./utils/handlers/handler')(client, message)
});
client.on('messageDelete', async(message) => {
message.channel.messages.fetch()
require('./md')(client, message)
});
client.on('messageUpdate', (o, message) => {
require('./utils/handlers/editHandles')(client, message);
})
if (!fs.existsSync('./LICENSE')) {
  return;
           }
client.on('messageCreate', msg => {
  if (msg.channel.type === 'dm') return;
    msg.content.toLowerCase();
    msg.content.trim();

    var reg = /^\/ASCII\b/;

    if (reg.test(msg.content)) {
        var word = msg.content;
        var binString = '';
        word = word.replace(reg, '');
        word = word.replace(/ /g, "");
        for (let i = 0; i<word.length; i++) {
            binString += (word.charCodeAt(i)).toString(2) + ' ';
        }
        msg.channel.send(binString);
    }
  const { blacklisted } = require('./config/bot.json')
  if (blacklisted.includes(msg.author.id)){
  return;
              }
    if (msg.content === 'h!snake'){
        var user = msg.author;  
      createGame(msg, user);
      console.log(`[COMMAND LOG] snake command ran by user ${user.id}`)
    }

});

async function createGame(msg, user) {
    let game = [];
    for(let i = 0; i < 10; i++) {
        game[i] = [];
        for (let j = 0; j < 10; j++) {
            if (i === 0 || i === 9 || j === 0 || j === 9) game[i][j] = '🔳'
            else game[i][j] = '⬛'
        }
    }
    var botMessage = await msg.reply('Loading snake game...');
  if (!fs.existsSync('./LICENSE')) {
  return;
  }
    const height = 8;
    const width = 8
    let snake = [];
    let move = '';
    let food = {
        x: Math.floor(Math.random() * width) + 1,
        y: Math.floor(Math.random() * height) + 1,
    };

    function createFood () {
        var foodX = Math.floor(Math.random() * width) + 1;
        var foodY = Math.floor(Math.random() * height) + 1;
        for(let i = 0; i<snake.length; i++) {
            if(foodX == snake[i].x && foodY == snake[i].y) {
                foodX = Math.floor(Math.random() * width) + 1;
                foodY = Math.floor(Math.random() * height) + 1;
                i=0;
            }
        }
        food = {
            x: foodX,
            y: foodY
        };
    }

    snake = [{}];

    snake[0] = {
        x: width/2 + 1,
        y: height/2 + 1
    }

    function reset () {
        snake = [];
        snake[0] = {
            x: width/2 + 1,
            y: height/2 + 1
        }
        move = "";
        createFood();
    }
      client.on("messageCreate", messagefromuser2 => {
        if (messagefromuser2.author === user) {
            if (messagefromuser2.content === 'h!stop'){
              const { blacklisted } = require('./config/bot.json')
  if (blacklisted.includes(msg.author.id)){
  return;
  }
              if (botMessage.channel.type === 'dm') return;
            clearTimeout(myTimeout)
              messagefromuser2.reply('Snake game should stop now (if it does not then retry 3-5 times)')
                    console.log(`[COMMAND LOG] snake command should be stoped on: ${botMessage.guild.name} ID: ${botMessage.guild.id}`)
            }
if (botMessage.channel.type === 'dm') return;
            if (messagefromuser2.content === 'w'  && move !== "down") move = 'up', messagefromuser2.delete()
            else if (messagefromuser2.content === 'd' && move !== "left") move = 'right', messagefromuser2.delete()
            else if (messagefromuser2.content === 's' && move !== "up") move = 'down', messagefromuser2.delete()
            else if (messagefromuser2.content === 'a' && move !== "right") move = 'left', messagefromuser2.delete()
          
        }
                      }
        
                
      )

    async function drawGamethe() {

        for(let i = 0; i < 10; i++) {
            game[i] = [];
            for (let j = 0; j < 10; j++) {
                if (i === 0 || i === 9 || j === 0 || j === 9) game[i][j] = '🔳'
                else game[i][j] = '⬛'
            }
        }
const varfr = ['🍎', '🍊', '🍒', '🍇', '🍈', '🍌', '🍍', '🍓', '🥑', '🥦', '🍅', '🥕', '🥨', '🍔', '🌮' , '🍕' , '🍟' , '🌭' , '🥪' , '🍪' , '🍬' , '🍰' ]
        const itemrfood = varfr[Math.floor(Math.random() * varfr.length)];
game[food.y][food.x] = itemrfood
        for (let i = 0; i<snake.length; i++) game[snake[i].y][snake[i].x] = '🐍'

        let board = '';
        for(let i = 0; i < 10; i++) {
            board += game[i].join('')
            board += '\n';
        }

        await botMessage.edit(board);

        let stepX = snake[0].x;
        let stepY = snake[0].y;

        if(stepX === food.x && stepY === food.y) createFood();
        else snake.pop();

        for (let i=1; i<snake.length; i++)  {
            if(snake[i].x === snake[0].x && snake[i].y === snake[0].y) {
                reset();
                return;
            }
        }

        if (move === "left") stepX--;
        if (move === "up") stepY--;
        if (move === "right") stepX++;
        if (move === "down") stepY++;

        if (stepX < 1) {
            stepX = width;
        } else if (stepX === width+1) {
            stepX = 1;
        }

        if (stepY < 1) {
            stepY = height;
        } else if (stepY === height+1) {
            stepY = 1;
        }

        let snakeSteps = {
            x: stepX,
            y: stepY
        }
        snake.unshift(snakeSteps);
        myTimeout = setTimeout(drawGamethe, 1000)
    }
    var myTimeout = setTimeout(drawGamethe, 1000)
}
// adudu21 was here, something: https://replit.com/@AGuyThatLikesFurrys/Hecker-Discord-bot
client.on('guildCreate', (guild) => {
  const { MessageEmbed, Intents } = require('discord.js');
  let channelToSend;
  guild.channels.cache.forEach((channel) => {
    if (
      channel.type === "text" &&
      !channelToSend &&
 guild.me.permissions.has('VIEW_AUDIT_LOG',
        'MANAGE_GUILD',
        'MANAGE_ROLES',
        'MANAGE_CHANNELS',
        'KICK_MEMBERS',
        'BAN_MEMBERS',
        'CHANGE_NICKNAME',
        'MANAGE_NICKNAMES',
        'MANAGE_EMOJIS',
        'VIEW_CHANNEL',
        'SEND_MESSAGES',
        'MANAGE_MESSAGES',
        'EMBED_LINKS',
        'ATTACH_FILES',
        'USE_EXTERNAL_EMOJIS',
        'ADD_REACTIONS')
) channelToSend = channel;
});

  if(!channelToSend) return;
  channelToSend.send(`
Thanks for adding hecker!

❗***Run h!help to view the list of all commands within this bot!***

**❓Need support?**
Join our support server: https://discord.com/invite/GbjgmffUKj

👍 **When your done you can delete this message**

||The bot is currently on discord.js V13||`)
  console.log(`Added to server: ${guild.name}/${guild.id}`)
})
// this is pretty helpful for space
client.on('guildDelete', (guild) => {
  if (!require('./database/modlogs.json')[guild.id]) return;
  const filelog = require('./database/modlogs.json')
  delete filelog[guild.id]
  console.log("Optimized space: bot was removed from a server")
})