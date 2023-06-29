const { prefix: mainPrefix, owners } = require('./config/bot.json');
const TEST_ACTIVE = true; //Please set this value to false for any user that is not adudu21 (aduud21)
const UserPreventRL = new Map(); // get userids for cooldown, should be above module.exports = async (client)
module.exports = async (client, message, rest, Routes) => {
    if (message.channel.type === 'dm') return;
    let escapeRegex = require('./utils/structure/exports/escapeRegex').escapeRegex;
    const prefixRegex = new RegExp(`^(<@!?${client.user.id}>|${escapeRegex(mainPrefix)})\\s*`);
    if (!prefixRegex.test(message.content)) return;
    const [, prefix] = message.content.match(prefixRegex);
    if (!message.content.startsWith(prefix)) return;
    // The code below is for testing replit's uptime (force shutdown repls) after some time of inactively, This test started as of 6/29/2023, this will allow a ping bot to ping the bot via using certain commands.
    //As of 3:02AM in 6/29/2023 i see that REPLIT may have a auto-detecter for such things or simply the ping bot response is too short and counts the repl as being active
    //i have further added extra things to ping bot for this test 3:51AM
    if (message.author.bot) {
        if (TEST_ACTIVE) {
            if (message.author.id !== '1103833717975294072') return;
        } else {
            if (message.author.bot) return;
        }
    }
    //Clear code
    let args = message.content.slice(prefix.length).trim().split(/ +/g);
    const cmm = args.shift().toLocaleLowerCase();
    let command = client.commands.get(cmm) || client.commands.get(client.aliases.get(cmm));
    if (!command) return;
    if (command.config.permissions) {
        let neededPerms = [];
        command.config.permissions.forEach((p) => {
            if (!message.member.permissions.has(p)) neededPerms.push('`' + p + '`');
        });
        if (command.config.guildOnly) {
            if (command.config.guildOnly === true) {
                if (message.channel.type === 'dm') {
                    return message.reply('Guild only command').catch(() => {});
                }
            }
        }
        neededPerms = [];
        if (neededPerms.length) {
            try {
                return await message
                    .reply(
                        `❌-> You need ${neededPerms.join(', ')} permissions to use this command`
                    )
                    .catch(() => {});
            } catch {
                try {
                    return console.log('Cant even speak in ohio');
                } catch {
                    return message.member
                        .send(
                            '❌-> I am missing permissions to send messages in **' +
                                message.guild.name +
                                '**'
                        )
                        .catch(() => {});
                }
            }
        }
    }
    if (command.config.ownerOnly) {
        if (command.config.ownerOnly === true) {
            if (!owners.includes(message.author.id)) return;
            message.react('❌').catch(() => {}),
                message
                    .reply(`❌-> Error 403, only owner(s) of this bot can use this command`)
                    .catch(() => {});
        }
    }
    if (command.config.botperms) {
        let neededPerms = [];
        command.config.botperms.forEach((p) => {
            if (!message.guild.members.me.permissions.has(p)) neededPerms.push('`' + p + '`');
        });
        if (neededPerms.length) {
            return await message.channel
                .send(`❌-> I am missing ${neededPerms.join(', ')} permission.`)
                .catch(() => {});
        }
    }
    let commandFile = client.commands.get(cmm) || client.commands.get(client.aliases.get(cmm));
    if (commandFile) {
        if (client.cooldown.has(message.author.id)) {
            const remainingCooldownRL = UserPreventRL.get(message.author.id) - Date.now();
            if (remainingCooldownRL > 0) {
                return;
            }
            message.reply('Hold up there, you using prefix commands too quick!').catch(() => {});
            const cooldownTimeRL = 5000;
            UserPreventRL.set(message.author.id, Date.now() + cooldownTimeRL);
            setTimeout(() => {
                UserPreventRL.delete(message.author.id);
            }, cooldownTimeRL); // end of col
            return;
        }
        if (
            !message.guild.members.me.permissions.has(
                'VIEW_AUDIT_LOG',
                'MANAGE_CHANNELS',
                'VIEW_CHANNEL',
                'SEND_MESSAGES',
                'MANAGE_MESSAGES',
                'EMBED_LINKS',
                'ATTACH_FILES',
                'USE_EXTERNAL_EMOJIS',
                'ADD_REACTIONS'
            )
        ) {
            message
                .reply(
                    'I need `VIEW_AUDIT_LOG, MANAGE_CHANNELS, VIEW_CHANNEL, SEND_MESSAGES, MANAGE_MESSAGES, EMBED_LINKS, ATTACH_FILES, USE_EXTERNAL_EMOJIS, ADD_REACTIONS` permissions for me to work with all commands or in short i need `ADMINISTRATOR`'
                )
                .catch(() => {});
            return;
        }
        commandFile.run(client, message, args, rest, Routes);
        client.cooldown.add(message.author.id);
        setTimeout(() => {
            client.cooldown.delete(message.author.id);
        }, 5000);
    }
};
