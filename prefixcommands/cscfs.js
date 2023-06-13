module.exports.config = {
    name: 'cscfs',
    aliases: ['createslashcommand', 'csc', 'rcsc', 'createslashcommands'],
    group: 'config',
    cooldown: '60000',
    guarded: true,
    permissions: ['ADMINISTRATOR'],
    description:
        'if there are no slash commands in your server after inviting the bot, try this prefix command while the bot is online, command cooldown: 1 minute',
};
const interactionServerCooldowns = new Map(); // get serverids for cooldown, should be above module.exports = async (client) => {
const interactionServerCooldownsPreventRL = new Map(); // get serverids for cooldown, should be above
module.exports.run = async (client, message, args, rest, Routes) => {
    const guild = message.guild;
    const clientUSERID = client.user.id;
    // startcooldown
    const serverId = guild.id;
    if (interactionServerCooldowns.has(serverId)) {
        const remainingCooldown = interactionServerCooldowns.get(serverId) - Date.now();
        const remainingCooldownRL = interactionServerCooldownsPreventRL.get(serverId) - Date.now();
        if (remainingCooldownRL > 0) {
            return;
        }
        if (remainingCooldown > 0) {
            message
                .reply(
                    `Please wait ${remainingCooldown}ms to use this server command as somebody else did in the server...`
                )
                .catch(() => {});
            return;
        }
    }
    const cooldownTimeRL = 5000;
    interactionServerCooldownsPreventRL.set(serverId, Date.now() + cooldownTimeRL);
    setTimeout(() => {
        interactionServerCooldownsPreventRL.delete(serverId);
    }, cooldownTimeRL); // end of col
    const cooldownTime = 60000;
    interactionServerCooldowns.set(serverId, Date.now() + cooldownTime);
    setTimeout(() => {
        interactionServerCooldowns.delete(serverId);
    }, cooldownTime); // end of col
    const commands = [
        {
            name: 'bloxlinkcheck',
            description: 'Check if a user is verified with bloxlink',
            options: [
                {
                    name: 'dcuserid',
                    description: 'Their discord UserID',
                    type: 3,
                    required: true,
                },
            ],
        },
        {
            name: 'checklink',
            description: "Check a link if it's possibly malicious",
            options: [
                {
                    name: 'link',
                    description: 'Domain or URL allowed',
                    type: 3,
                    required: true,
                },
            ],
        },
        {
            name: 'runcode',
            description: 'Only creator of bot can run this command!',
            options: [
                {
                    name: 'code',
                    description: 'The code to run',
                    type: 3,
                    required: true,
                },
            ],
        },
        {
            name: 'code',
            description: "View the bot's source code",
            options: [], // No options for this command
        },
        {
            name: 'information',
            description: 'View information about this discord bot',
            options: [], // No options for this command
        },
        {
            name: 'deldata',
            description:
                'Clear all the data that bot has collected from your server. May prevent using setmodlog.',
            options: [], // No options for this command
            default_member_permissions: '0',
        },
        {
            name: 'membercount',
            description: 'View total membercount of this server',
            options: [], // No options for this command
        },
        {
            name: 'setmodlog',
            description:
                'Set a logging channel for deleted/edited messages. Server Command cooldown: 15 seconds.',
            options: [
                {
                    name: 'channel',
                    description: `Mention a text channel`,
                    type: 3,
                    required: true,
                },
            ],
            default_member_permissions: '0',
        },
        {
            name: 'quiz',
            description: 'Some random questions',
            options: [], // No options for this command
        },
        {
            name: 'rps',
            description: 'This command will randomly pick from Rock Paper Scissors',
            options: [], // No options for this command
        },
        {
            name: 'uptime',
            description: "View the bot's uptime",
            options: [], // No options for this command
        },
    ];
    try {
        rest.put(Routes.applicationGuildCommands(clientUSERID, guild.id), {
            body: commands,
        }).catch((e) => {
            console.log(e);
        });
    } catch (error) {
        message
            .reply(
                `Failed creating slash commands because: 
           ${error}`
            )
            .catch(() => {});
        console.error(`Error creating slash commands: ${error}`);
        return;
    }
    message.reply('✅ -> Created slashcommands').catch(() => {});
    await message.react('✅').catch(() => {});
};
