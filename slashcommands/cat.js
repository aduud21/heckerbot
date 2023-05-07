// CHANGING THE CODE BELOW CAN RESULT IN THE BOT NOT WORKING
const REALLYMAXHEARINGREALLY1234REAL = 100
require('events').EventEmitter.prototype._maxListeners = REALLYMAXHEARINGREALLY1234REAL;
require('events').defaultMaxListeners = REALLYMAXHEARINGREALLY1234REAL;
// ONLY REMOVE THE ABOVE CODE IF YOU KNOW WHAT YOU'RE DOING
const { Client, ClientUser, MessageEmbed, Intents } = require('discord.js')
const axios = require('axios');
const { blacklisted } = require('../config/bot.json')
const interactionCooldowns = new Map() // get userids for cooldown, should be above module.exports = async (client) => {
module.exports = async (client) => {
  client.ws.on('INTERACTION_CREATE', async (interaction) => {
    const commandName = interaction.data.name;
    // startcooldown 
if (commandName === 'cat') {
    const userId = interaction.member.user.id;
  if (interactionCooldowns.has(userId)) {
    const remainingCooldown = interactionCooldowns.get(userId) - Date.now();
    if (remainingCooldown > 0) {
      await client.api.interactions(interaction.id, interaction.token).callback.post({
        data: {
          type: 4,
          data: {
            content: `You can use this command again in ${remainingCooldown}ms.`,
          },
        },
      });
      return;
    }
  }
  const cooldownTime = 5000
  interactionCooldowns.set(userId, Date.now() + cooldownTime);
  setTimeout(() => {
    interactionCooldowns.delete(userId);
  }, cooldownTime) // end of col
}
    if (commandName === 'cat') {
      if (blacklisted.includes(interaction.member.user.id)) {
        return;
      }
       if (commandName === 'cat') client.api.interactions(interaction.id, interaction.token).callback.post({
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
      console.log(`Slash command ${commandName} ran`)
        if (process.env.catapi){
       const response = await axios.get(`https://api.thecatapi.com/v1/images/search?api_key=${process.env.catapi}`).catch(() => {})
      const imageUrl = response.data[0].url;
      const content = `${imageUrl}`
      editInteraction(
          client,
          interaction,
          content
        ).catch(() => {})
          return;
      }
      const response = await axios.get('https://api.thecatapi.com/v1/images/search').catch(() => {})
      const imageUrl = response.data[0].url;
      const content = `${imageUrl}`
      editInteraction(
          client,
          interaction,
          content
        ).catch(() => {})
    }
  })
}