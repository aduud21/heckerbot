// CHANGING THE CODE BELOW CAN RESULT IN THE BOT NOT WORKING
// latest discord api version https://discord.com/developers/docs/reference
const REALLYMAXHEARINGREALLY1234REAL = 100
require('events').EventEmitter.prototype._maxListeners = REALLYMAXHEARINGREALLY1234REAL;
require('events').defaultMaxListeners = REALLYMAXHEARINGREALLY1234REAL;
// ONLY REMOVE THE ABOVE CODE IF YOU KNOW WHAT YOUE DOING
const { Client, ClientUser, MessageEmbed, Intents } = require('discord.js');
const { blacklisted } = require('../config/bot.json')
const axios = require('axios')
module.exports = async(client) => {
console.log('Making global command: checklink')
client.api.applications(`947733660432490506`).commands.post({
        data: {
            name: "checklink",
            description: "Check a link if its malicious, please wait up to 1 minute",
          options: [{ name: 'domain', description: 'Domain only, example: google.com', type: 3, required: true }],
 }})
  // the above code creates slash commands (works on discord.js v12 and v13)
  console.log('Created global command: checklink')

     client.ws.on("INTERACTION_CREATE", async(interaction) => {
      
        const commandId = interaction.data.id;
        const commandName = interaction.data.name;
              if (commandName == "checklink") {
if (blacklisted.includes(interaction.member.user.id)){
  return;
          }
                if (commandName == "checklink") client.api.interactions(interaction.id, interaction.token).callback.post({
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



 if (commandName == "checklink") if (!isratelmitnvt){    
var isratelmitnvt = 0
     }

if (commandName == "checklink") var isratelmitnvt = isratelmitnvt +1

     if (commandName == "checklink") console.log(isratelmitnvt)
     if (commandName == "checklink") if (isratelmitnvt == 4){
        console.log(`Possible ratelimit detected for virus total api`);
       try {
          
       
       
        if (commandName == "checklink") editInteraction(client, interaction, "Hold on, Bot got ratelimited for checking, i will try to check after the ratelimit is no more")
} catch (error) {
          
       
console.log(`Discord is annoying another time, error: ${error}`)
      
       }
        async function waitrn() {
  var isratelmitnvt = 0
      console.log(`Possible ratelimit detected for virus total api should be no more`);
}
setTimeout(() => {
    waitrn()
}, 60000)
  }

                    
       if (commandName == "checklink"){
         require('node-virustotal').makeAPI().setKey(process.env.api), function (err) {
    if (err) {

try {
      editInteraction(client, interaction, `An error occurred while trying to connect`)

   

 
} catch (error) {
console.log(`Discord is annoying another time, error: ${error}`)
      
    }
      return;
    }}
  const nvt = require('node-virustotal');
const request = nvt.makeAPI().setKey(process.env.api);
 if (commandName == "checklink") request.domainLookup(interaction.data.options[0].value, function (err, res) {
    if (err) {
          if (commandName == "checklink") console.log(`Virustotal API did not work because: ${err}`);
      if (commandName == "checklink"){
try {
   

   


              if (commandName == "checklink") editInteraction(client, interaction, `Virustotal API did not work because: ${err}`)

} catch (error) {

console.log(`Discord is annoying another time, error: ${error}`)
      
 }
        
      }
return;
    }
    var road = JSON.parse(res);
   var actualresult = '0'
    if (road.data.attributes.last_analysis_results.Kaspersky.result != "clean") {
        var actualresult = '1'
      console.log('Kaspersky Flagged')
    }
   if (road.data.attributes.last_analysis_results.URLQuery.result != "clean") {
        var actualresult = '1'
     console.log('URLQuery Flagged')
               }
    if (road.data.attributes.last_analysis_results.BitDefender.result != "clean") {
        var actualresult = '1'
      console.log('BitDefender Flagged')
    }
   if (actualresult == '0') {
        var actualresult = `The link is safe OR too new to tell`;
   }
   else{
     var actualresult = `The link could be malicious or unsafe`
   }
console.log(actualresult) 
   
    if (commandName == "checklink") {
    try {
    
    if (commandName == "checklink") editInteraction(client, interaction, `${actualresult}`)
      } catch (error) {
       console.log(`Discord is annoying another time, error: ${error}`)
      
        }
          console.log(`Slash command ${commandName} ran`);
          
    };
          
        })

  };
     })
}


  //tottaly not trash code