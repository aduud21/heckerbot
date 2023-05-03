// CHANGING THE CODE BELOW CAN RESULT IN THE BOT NOT WORKING
// latest discord api version https://discord.com/developers/docs/reference
const bloxlink = require('bloxlink-sdk');
const REALLYMAXHEARINGREALLY1234REAL = 100
require('events').EventEmitter.prototype._maxListeners = REALLYMAXHEARINGREALLY1234REAL;
require('events').defaultMaxListeners = REALLYMAXHEARINGREALLY1234REAL;
// ONLY REMOVE THE ABOVE CODE IF YOU KNOW WHAT YOUE DOING
const { Client, ClientUser, MessageEmbed, Intents } = require('discord.js');
const { blacklisted } = require('../config/bot.json')
const axios = require('axios')
module.exports = async(client) => {
     client.ws.on("INTERACTION_CREATE", async(interaction) => {
      
        const commandId = interaction.data.id;
        const commandName = interaction.data.name;
              if (commandName == "bloxlinkcheck") {
if (blacklisted.includes(interaction.member.user.id)){
  return;
          }
                if (commandName == "bloxlinkcheck") client.api.interactions(interaction.id, interaction.token).callback.post({
        data: {
            type: 5
        }
    })
};
        const editInteraction = async (client, interaction, response) => {
    const data = typeof response === 'object' ? { embeds: [ response ] } : { content: response };
    const channel = await client.channels.resolve(interaction.channel_id);
    return axios
        .patch(`https://discord.com/api/v10/webhooks/${client.user.id}/${interaction.token}/messages/@original`, data)
        .then((answer) => {
            return channel.messages.fetch(answer.data.id)
        })
};
try {

       
if (commandName == "bloxlinkcheck") bloxlink.initialise(process.env.bloxlinkAPIKEY);
   const testxd = await bloxlink.SearchDiscordToRoblox(interaction.data.options[0].value)
    if (testxd.success){
if (commandName == "bloxlinkcheck") editInteraction(client, interaction, `User is verified with bloxlink`).catch(() => {})

      
      }
} catch (error) {
  try {
     

  
      if (commandName == "bloxlinkcheck") editInteraction(client, interaction, `User is not verified with bloxlink`).catch(() => {})
  } catch (error) {
     console.log(`Discord is annoying another time, error: ${error}`)
  }

    }
   
    
         if (commandName == "bloxlinkcheck") console.log(`Slash command ${commandName} ran`);
          
    });
          
}

                        



  //tottaly not trash code