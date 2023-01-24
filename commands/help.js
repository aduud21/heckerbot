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
****You can use the following commands below to check what commands you can use:****

Type \n${client.prefix}help [command]\ for help with a command \n\n ${client.prefix}help moderation - **Moderation related commands** \n ${client.prefix}help fun - **Fun commands, This may include some games and more** \n ${client.prefix}help management - **Management Commands**  \n${client.prefix}help misc - **View all misc Commands** \n ${client.prefix}help info - **View all information commands**  \n ${client.prefix}help config - **View all configuration setting commands**

${message.author.tag} used this command

Note: A lot of prefix commands have became Slash commands

`)
    };

     if (args[0] === 'fun') {
        let fun = [];
        client.commands.forEach((command) => {
            if (command.config.group === 'fun') fun.push(`\`${command.config.name}\` - ${command.config.description}`);
        })
        message.reply(`**_Fun commands_** \n\n ${fun.join('\n')}`)

        
     };

     if (args[0] === 'misc') {
         let misc = [];

         client.commands.forEach((command) => {
            if (command.config.group === 'misc') misc.push(`\`${command.config.name}\` - ${command.config.description}`);
        })
        message.reply(`**_Misc commands_** \n\n ${misc.join('\n')}`)

        

     }

     if (args[0] === 'management') {
        let mnge = [];
     
        client.commands.forEach((command) => {
           if (command.config.group === 'management') mnge.push(`\`${command.config.name}\` - ${command.config.description}`);
       })

       message.reply(`**_Management commands_** \n\n ${mnge.join('\n')}`)

       
     }


     if (args[0] === 'config') {
         let configuration = [];
     
         client.commands.forEach((command) => {
            if (command.config.group === 'config') configuration.push(`\`${command.config.name}\` - ${command.config.description}`);
        })

        message.reply(`**_Configuration commands_** \n\n ${configuration.join('\n')}`)

        

        }

    if (args[0] === 'info' || args[0] === 'information') {
        let infoo = [];
        client.commands.forEach((command) => {
            if (command.config.group === 'info') infoo.push(`\`${command.config.name}\` - ${command.config.description}`);
        })
        message.reply(`**_Info commands_** \n\n ${infoo.join('\n')}`)

        
    }
    if (args[0] === 'moderation') {
        let mod = [];
        client.commands.forEach((command) => {
            if (command.config.group === 'moderation') {
                mod.push(`\`${command.config.name}\` - ${command.config.description}`);
            }
            });

        message.reply(`**_Moderation commands_** \n\n ${mod.join('\n')}`)

        
    }
}
// adudu21 was here