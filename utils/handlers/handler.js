const { token, prefix: mainPrefix, owners } = require('../../config/bot.json')
const { Client, MessageCreate } = require('discord.js');
module.exports = async(client, message) => {
if (message.channel.type === 'dm') return;
    var escapeRegex = require('../structure/exports/escapeRegex').escapeRegex
    const prefixRegex = new RegExp(`^(<@!?${client.user.id}>|${escapeRegex(mainPrefix)})\\s*`);
	if (!prefixRegex.test(message.content)) return;

	const [, prefix] = message.content.match(prefixRegex);
    if (!message.content.startsWith(prefix)) return;
    if (message.author.bot) return;
    let args = message.content.slice(prefix.length).trim().split(/ +/g);

    const cmm = args.shift().toLocaleLowerCase();

  

        var command = client.commands.get(cmm) || client.commands.get(client.aliases.get(cmm))

        if (!command) return;
        
        if (command.config.permissions) {
            let neededPerms = [];

            command.config.permissions.forEach((p) => {
                if (!message.member.permissions.has(p)) neededPerms.push('`' + p + '`');
            });

            if (command.config.guildOnly) {
                if (command.config.guildOnly === true) {
                    if (message.channel.type === 'dm') {
                    return message.reply("Guild only command");
                }
            }
            }
            neededPerms = []
            if (neededPerms.length) {
                
                try {
                    return await message.reply(`❌-> You need ${neededPerms.join(', ')} permissions to use this command`);
            } catch {
                try {
                return await console.log("Cant even speak in ohio")
                } catch {
                    return message.member.send('❌-> I am missing permissions to send messages in **' + message.guild.name + '**').catch(() => {})
                }
            }
        }
        }
        if (command.config.ownerOnly) {
            if (command.config.ownerOnly === true) {
                if (!owners.includes(message.author.id)) return 
              message.react('❌').catch(() => {}), message.reply(`❌-> Error 403, only owner(s) can use this command`).catch(() => {})
            }
        }

        if (command.config.botperms) {
            let neededPerms = [];

            command.config.botperms.forEach((p) => {
                if (!message.guild.members.me.permissions.has(p)) neededPerms.push('`' + p + '`');
            })
            if (neededPerms.length) {
                    return await message.channel.send(`❌-> I am missing ${neededPerms.join(', ')} permission.`).catch(() => {})
            }
        }
    let commandFile = client.commands.get(cmm) || client.commands.get(client.aliases.get(cmm))
    if (commandFile) {
        if (client.cooldown.has(message.author.id)) return message.reply('Hold up there, you using prefix commands too quick!').catch(() => {})
        if (!message.guild.members.me.permissions.has('VIEW_AUDIT_LOG',
        'MANAGE_CHANNELS',
        'VIEW_CHANNEL',
        'SEND_MESSAGES',
        'MANAGE_MESSAGES',
        'EMBED_LINKS',
        'ATTACH_FILES',
        'USE_EXTERNAL_EMOJIS',
        'ADD_REACTIONS')){ 
          message.reply('I need \`VIEW_AUDIT_LOG, MANAGE_CHANNELS, VIEW_CHANNEL, SEND_MESSAGES, MANAGE_MESSAGES, EMBED_LINKS, ATTACH_FILES, USE_EXTERNAL_EMOJIS, ADD_REACTIONS\` permissions for me to work with all commands or in short i need `ADMINISTRATOR`').catch(() => {})
          return;
        }
        commandFile.run(client, message, args);
        if (!owners.includes(message.author.id)) {
            client.cooldown.add(message.author.id);
            setTimeout(() => {
                client.cooldown.delete(message.author.id)
            }, 5000)
        };

    };
        }