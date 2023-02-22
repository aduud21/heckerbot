const { MessageEmbed, Client, MessageCreate } = require('discord.js');

module.exports.config = {
    name: "help",
            cooldown: '2500',
    group: "info",
    usage: 'help',
    guarded: true,
    example: "h!help",
    description: "Help menu for all commands, command cooldown: 2.5 seconds"
}

/**
 * 
 * @param {Client} client 
 * @param {Message} message 
 * @param {*} args 
 */
const message = 'messageCreate'
module.exports.run = async (client, message, args) => {
  console.log(`[COMMAND LOG] help command ran on: ${message.guild.name} ID: ${message.guild.id}`)
  message.react('✅')

        try {
            let pu = await client.commands.get(args[0]) || await client.commands.get(client.aliases.get(args[0]))

            if (client.commands.has(args[0]) || client.commands.has(client.commands.get(client.aliases.get(args[0]).config.name))) {

                                 return message.reply(`
    
${pu.config.name ? `**Name:** ${pu.config.name}` : ""}${pu.config.description ? '\n' : ""}${pu.config.description ? `**Description:** ${pu.config.description}` : ""}${pu.config.aliases ? '\n' : ""}${pu.config.aliases ? `**Aliases:** ${pu.config.aliases.join(', ')}` : ""}${pu.config.group ? '\n' : ""}${pu.config.group ? `**Group:** ${pu.config.group}` : ""}${pu.config.permissions ? '\n' : ''}${pu.config.permissions ? `**Permissions:** ${pu.config.permissions.join(', ').toLocaleLowerCase()}` : ""}${pu.config.usage ? '\n' : ""}${pu.config.usage ? `**Usage:** ${pu.config.usage}` : ""}${pu.config.example ? "\n" : ""}${pu.config.example ? `**Example:** ${pu.config.example}` : ""}                             

                `)

            } else {

            }
        } catch {
        }
                

    if (!args[0]) {
        
          message.reply(`
All prefix commands were removed execpt the following>
${client.prefix}help
${client.prefix}removeserverdata
${client.prefix}cscicitd
${client.prefix}anh
${client.prefix}setmodlogs
${client.prefix}settings

Run h!cscicitd incase there are no slash commands in your server after a couple minutes

`)
    };
}
// adudu21 was here