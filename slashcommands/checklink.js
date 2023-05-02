// CHANGING THE CODE BELOW CAN RESULT IN THE BOT NOT WORKING!
// latest discord api version https://discord.com/developers/docs/reference, thanks https://github.com/RixInGithub
const rateLimitTime = 60000
const REALLYMAXHEARINGREALLY1234REAL = 100
require('events').EventEmitter.prototype._maxListeners = REALLYMAXHEARINGREALLY1234REAL;
require('events').defaultMaxListeners = REALLYMAXHEARINGREALLY1234REAL;
// ONLY REMOVE THE ABOVE CODE IF YOU KNOW WHAT YOUE DOING
const { Client, ClientUser, MessageEmbed, Intents } = require('discord.js');
const { blacklisted } = require('../config/bot.json')
const axios = require('axios')
const VirusTotalApi = require("virustotal-api")
const virusTotal = new VirusTotalApi(process.env.api)
let requestCount = 0
var norepert = false
module.exports = async (client) => {
  client.ws.on("INTERACTION_CREATE", async (interaction) => {
    const commandId = interaction.data.id;
    const commandName = interaction.data.name;
    if (commandName == "checklink") {
      if (blacklisted.includes(interaction.member.user.id)) {
        return;
      }

      client.api.interactions(interaction.id, interaction.token).callback.post({
        data: {
          type: 5,
          flags: 64,
        },
      });
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
async function waitrn() {
  requestCount = 0;
norepert = false
}
      async function waitrnone() {
  requestCount = 0;
}
if (requestCount === 1) {
  setTimeout(() => {
    waitrnone();
  }, rateLimitTime);
}

if (requestCount === 4) {
  norepert = true
  editInteraction(
    client,
    interaction,
    "BOT GOT RATELIMITED BY VIRUSTOTAL API KEY, IN 60 SECONDS BOT WILL NO LONGER BE RATELIMITED"
  );
  if (norepert === false){
  setTimeout(() => {
    waitrn();
  }, rateLimitTime);
  }
  return;
}
      var datareal = `${interaction.data.options[0].value}`
     const regex = /^\S+\.\S+$/
    const match = datareal.match(regex);
    if (!match) {
       editInteraction(
    client,
    interaction,
    "incorrect link, Please enter a vaild link!"
  );
      return;
    }
  virusTotal.urlReport(interaction.data.options[0].value, true, 1).then(res => {
    requestCount = requestCount +1
var scan_id = res.scan_id;
var resource = res.resource;
var url = res.url;
var response_code = res.response_code;
var scan_date = res.scan_date;
var permalink = res.permalink;
var verbose_msg = res.verbose_msg;
var filescan_id = res.filescan_id;
var positives = res.positives;
var total = res.total;
var scans = res.scans;
  var datasforlinks = scans
  counts = 0;
     keyValue = 0
    if (datasforlinks) {
  for (key of Object.keys(datasforlinks)) {
    list = datasforlinks[key]["result"];
    if (list === "clean site") {
    }
    if (list === "phishing site") {
      counts = counts + 1;
      keyValue = keyValue +1
    }
     if (list === "malicious site") {
      counts = counts + 2;
      keyValue = keyValue +1
    }
    if (list === "malware site") {
      counts = counts + 2;
     keyValue = keyValue +1
    }
  }
    }

  var malicious = counts;
  if (malicious > 1) var chance = "possibly";
  if (malicious > 4) var chance = "likely";
  if (malicious > 8) var chance = "highly likely";

  if (malicious > 12) var chance = "very highly likely";

  if (malicious > 1) {
    try {
  const outputLink = interaction.data.options[0].value.replace(/^https:\/\//, '').replace(/http:\/\/|https:\/\//gi, '')
      if (commandName == "checklink")
        editInteraction(
          client,
          interaction,
          `${outputLink} is ${chance} malicious. ${keyValue} engines flagged it as malicious, This data is provided by VirusTotal.`
        );
    } catch (error) {
      console.log(`Discord is annoying another time, error: ${error}`);
    }
  } else {
    try {
      const inputLink = interaction.data.options[0].value.replace(/^https:\/\//, '').replace(/http:\/\/|https:\/\//gi, '')
      if (commandName == "checklink")
        editInteraction(
          client,
          interaction,
          `${inputLink} is safe OR too new to be flagged, This data is provided by VirusTotal.`
        );
    } catch (error) {
      console.log(`Discord is annoying another time, error: ${error}`);
    }
  }
  if (commandName == "checklink") {
    console.log(`Slash command ${commandName} ran`);
  }
});
      
    };
        
        })

}