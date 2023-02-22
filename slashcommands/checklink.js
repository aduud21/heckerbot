// CHANGING THE CODE BELOW CAN RESULT IN THE BOT NOT WORKING
// latest discord api version https://discord.com/developers/docs/reference, thanks https://github.com/RixInGithub
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
              if (commandName == "checklink") {
if (blacklisted.includes(interaction.member.user.id)){
  return;
          }
            
                if (commandName == "checklink") client.api.interactions(interaction.id, interaction.token).callback.post({
        data: {
            type: 5
        }
    })
}; // de
       
        const editInteraction = async (client, interaction, response) => {
          
    const data = typeof response === 'object' ? { embeds: [ response ] } : { content: response };
    const channel = await client.channels.resolve(interaction.channel_id);          
    return axios
        .patch(`https://discord.com/api/v10/webhooks/${client.user.id}/${interaction.token}/messages/@original`, data)
        .then((answer) => {
          try {
            return channel.messages.fetch(answer.data.id)
                } catch (err) {
       console.log(err)
         return;
                  }

        })
};
              

 if (commandName == "checklink") if (!isratelmitnvt){    
var isratelmitnvt = 0
     }

if (commandName == "checklink") var isratelmitnvt = isratelmitnvt +1

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
   
 var datasforlinks = road.data.attributes.last_analysis_results

   counts = 0
                            
 for (key of Object.keys(datasforlinks)) { 
  list = datasforlinks[key]["result"]
   
   if (list === 'clean'){
     
   }
   if (list === 'phishing'){
    counts = counts +1
   }
     if (list === 'malicious'){
   counts = counts +2
  }
 }
                var malicious = counts        
  if (malicious > 1) var chance = "possibly"                                                                  
   if (malicious > 4) var chance =  "likely"

  if (malicious > 10) var chance =  "highly likely"

  if (malicious > 25) var chance =  "very highly likely"
   
if (malicious > 1){
  try {
    if (commandName == "checklink") editInteraction(client, interaction, `${interaction.data.options[0].value} is ${chance} malicious. ${malicious} engines flagged it as malicious`)  
      } catch (error) {
       console.log(`Discord is annoying another time, error: ${error}`)
  }
}
   else{
     try {
    if (commandName == "checklink") editInteraction(client, interaction, `${interaction.data.options[0].value} is safe OR too new to be flagged`)  
      } catch (error) {
       console.log(`Discord is annoying another time, error: ${error}`)
     }
   }
  if (commandName == "checklink") {      
          console.log(`Slash command ${commandName} ran`);
          
    };
          
        })

  };
     })
}


  //tottaly not trash code