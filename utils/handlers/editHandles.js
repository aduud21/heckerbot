const { token, prefix: mainPrefix, owners } = require('../../config/bot.json')
const { MessageEmbed } = require('discord.js');

const message = 'messageCreate'

module.exports = async(client, message) => {
if (message.channel.type === 'dm') return;
  //if (message.channel.type !== 'dm') {
       var prePrefix;
    if (require('../../database/prefixes.json')[message.guild.id]) {
        prePrefix = await require('../../database/prefixes.json')[message.guild.id].prefix;

    } else {
        prePrefix = mainPrefix
    }
    var escapeRegex = require('../structure/exports/escapeRegex').escapeRegex
    const prefixRegex = new RegExp(`^(<@!?${client.user.id}>|${escapeRegex(prePrefix)})\\s*`);
	if (!prefixRegex.test(message.content)) return;

	const [, prefix] = message.content.match(prefixRegex);
    if (!message.content.startsWith(prefix)) return;
    if (message.author.bot) return;
    let args = message.content.slice(prefix.length).trim().split(/ +/g);

    const cmm = args.shift().toLocaleLowerCase();

  

        var command = client.commands.get(cmm) || client.commands.get(client.aliases.get(cmm)) //client.commands.get(cmm) || client.commands.get(client.aliases.get(cmm))

        if (!command) return;

        if (command.config.permissions) {
            let neededPerms = [];

            command.config.permissions.forEach((p) => {
                if (!message.member.permissions.has(p)) neededPerms.push('`' + p + '`');
            });

            if (command.config.guildOnly) {
                if (command.config.guildOnly === true) {
                    if (message.channel.type === 'dm') {
                    return message.channel.send(client.guildOnlyCmd);
                }
            }
            }

            try {
                if (require('../../database/perms.json')[command.config.name][message.guild.id] !== 'NONE') {
                if (!message.member.permissions.has(require('../../database/perms.json')[command.config.name][message.guild.id])) {
            neededPerms = [];
           await neededPerms.push('`' + require('../../database/perms.json')[command.config.name][message.guild.id] + '`')
            }
        } else {
            neededPerms = []
        }
        } catch{
            
        }
        let m = new Map()
            if (neededPerms.length) {
                
                try {
                    return await message.reply(`❌-> You need ${neededPerms.join(', ')} permissions to use this command`);
            } catch {
                try {
                return await message.reply(`❌-> I am missing \`VIEW_AUDIT_LOG, MANAGE_GUILD, MANAGE_ROLES, MANAGE_CHANNELS, KICK_MEMBERS, BAN_MEMBERS CHANGE_NICKNAME, MANAGE_NICKNAMES, MANAGE_EMOJIS, VIEW_CHANNEL, SEND_MESSAGES, MANAGE_MESSAGES, EMBED_LINKS, ATTACH_FILES, USE_EXTERNAL_EMOJIS, ADD_REACTIONS\` permissions`);
                } catch {
                    

                    return message.member.send('❌-> I am missing permissions to send messages in **' + message.guild.name + '**')
                }
            }
        }
        }
        if (command.config.ownerOnly) {
            if (command.config.ownerOnly === true) {
                if (!owners.includes(message.author.id)) return               message.react('❌'), message.reply(`❌-> Error 403, only owner(s) can use this command`)
            }
        }

        if (command.config.botperms) {
            let neededPerms = [];

            command.config.botperms.forEach((p) => {
                if (!message.guild.members.me.permissions.has(p)) neededPerms.push('`' + p + '`');
            });




            if (neededPerms.length) {
            
                
                    return await message.reply(`❌-> I am missing ${neededPerms.join(', ')} permissions.`);
                      //  return message.member.send(cantSend);
            }
        
        
        }

        client.main = new MessageEmbed()
            .setColor(client.color)
            .setTitle(`Command: ${command.config.name}`)
            .setDescription(`**Description:** ${command.config.description} \n**Cooldown:** 5 second(s) ${command.config.aliases ? '\n' : ''}${command.config.aliases ? `**Aliases:** ${command.config.aliases.join(', ')}` : ''} \n  **Usage:** ${command.config.usage} \n **Example:** ${command.config.example || "None"}`)
    


    let commandFile = client.commands.get(cmm) || client.commands.get(client.aliases.get(cmm))
    if (commandFile) {
        if (client.cooldown.has(message.author.id)) return message.reply('Hold up there, you using prefix commands too quick!');
        try {
            if (await require('../../database/enables.json')[commandFile.config.name][message.guild.id] === true) {
                return message.reply(client.disabled);
            }
        } catch {
            
        }
if (!message.guild.members.me.permissions.has( 'VIEW_AUDIT_LOG',
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
        'ADD_REACTIONS')) return message.reply('I need \`VIEW_AUDIT_LOG, MANAGE_GUILD, MANAGE_ROLES, MANAGE_CHANNELS, KICK_MEMBERS, BAN_MEMBERS CHANGE_NICKNAME, MANAGE_NICKNAMES, MANAGE_EMOJIS, VIEW_CHANNEL, SEND_MESSAGES, MANAGE_MESSAGES, EMBED_LINKS, ATTACH_FILES, USE_EXTERNAL_EMOJIS, ADD_REACTIONS\` permissions for me to work with all commands or in short i need `ADMINISTRATOR`')
        commandFile.run(client, message, args);
        if (!owners.includes(message.author.id)) {
            client.cooldown.add(message.author.id);
            setTimeout(() => {
                client.cooldown.delete(message.author.id)
            }, 5000)
        };

    };
}