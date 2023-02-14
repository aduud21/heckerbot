const { MessageEmbed, Intents } = require('discord.js');
module.exports.config = {
  name: "cscicitd",
group: 'config',
cooldown: '300000',
  guarded: true,
  permissions: ['ADMINISTRATOR'],
  description: "if there are no slash commands in your server after inviting the bot, try this prefix command, command cooldown: 300 seconds",
}
const message = 'messageCreate'
module.exports.run = async(client, message, args) => {
const guild = message.guild
  const clientUSERID = client.user.id
    console.log(`[COMMAND LOG] cscicitd command ran on: ${message.guild.name} ID: ${message.guild.id}`)
  let msg = await message.reply('⏳ -> Setting slash command list for this server to noting...');
  try {
    client.api.applications(`${clientUSERID}`).guilds(`${guild.id}`).commands.set([])
  msg.edit('⏳ -> Creating slash commands...')

    // cl
    client.api.applications(`${clientUSERID}`).guilds(`${guild.id}`).commands.post({
        data: {
            name: "deldata",
            description: "Clear all the data that bot has collected from your server, ADMINISTRATOR perm needed"
 }})
  //code
client.api.applications(`${clientUSERID}`).guilds(`${guild.id}`).commands.post({
        data: {
            name: "bloxlinkcheck",
            description: "Check if a user is verified with bloxlink",
          options: [{ name: 'dcuserid', description: 'Their discord UserID', type: 3, required: true }],
 }})
  // cl
    client.api.applications(`${clientUSERID}`).guilds(`${guild.id}`).commands.post({
        data: {
            name: "checklink",
            description: "Check a link if its malicious, please wait up to 1 minute",
          options: [{ name: 'domain', description: 'Domain only, example: google.com', type: 3, required: true }],
 }})
  //code
    client.api.applications(`${clientUSERID}`).guilds(`${guild.id}`).commands.post({
        data: {
            name: "code",
            description: "View the bot's source code"
 }})
  // data
    client.api.applications(`${clientUSERID}`).guilds(`${guild.id}`).commands.post({
        data: {
            name: "information",
            description: "View infomation about this discord bot"
 }})
  // deldata
    client.api.applications(`${clientUSERID}`).guilds(`${guild.id}`).commands.post({
        data: {
            name: "deldata",
            description: " This will tell you how to delete all the data that the bot has collected about your server"
 }})
  // sus
    client.api.applications(`${clientUSERID}`).guilds(`${guild.id}`).commands.post({
        data: {
            name: "emergencymeeting",
            description: "Among us emergency meeting"
 }})
  // info
client.api.applications(`${clientUSERID}`).guilds(`${guild.id}`).commands.post({
        data: {
            name: "tos",
            description: "View the terms of service of this discord bot"
 }})

  // pa
client.api.applications(`${clientUSERID}`).guilds(`${guild.id}`).commands.post({
        data: {
            name: "patreon",
            description: "Want to support the developer/creator of this discord bot?"
 }})

    // pp
    client.api.applications(`${clientUSERID}`).guilds(`${guild.id}`).commands.post({
        data: {
            name: "pp",
            description: "View the privacy policy of this discord bot"
 }})
  // quiz
    client.api.applications(`${clientUSERID}`).guilds(`${guild.id}`).commands.post({
        data: {
            name: "quiz",
            description: "Some random questions"
 }})
    // rps
    client.api.applications(`${clientUSERID}`).guilds(`${guild.id}`).commands.post({
        data: {
            name: "rps",
            description: "This command will randomly pick from Rock Paper Scissors"
 }})
  // uptime
    client.api.applications(`${clientUSERID}`).guilds(`${guild.id}`).commands.post({
        data: {
            name: "uptime",
            description: "View the bot's uptime"
 }})
} catch (err) {
msg.edit('Failed creating slash commands')
  }
  msg.edit('✅ -> Created slashcommands, discord may show them within a couple minutes')
message.react('✅')
 }