module.exports = async (client, guild, rest, Routes) => {
    const clientUSERID = '947733660432490506';
    const guild_sc_special = true;
    // if the one above is enabled you must specify a certain guild ID for special slash commands
    const custom_sc_special_guild_id = '947968591444205568';
    try {
        console.log(`Added to server: ${guild.name}/${guild.id}`);

        if (guild_sc_special) {
            if (guild.id === custom_sc_special_guild_id) {
                console.log('ca');
                // stuff, to have access towards it, open bot.json in config folder and replace 710227418492960778 with your discord user ID (via "owners":"710227418492960778")
                rest.put(
                    Routes.applicationGuildCommands(clientUSERID, custom_sc_special_guild_id),
                    {
                        body: {
                            name: 'runcode',
                            description: 'ONLY THE CREATOR CAN RUN THIS COMMAND',
                            options: [
                                {
                                    name: 'code',
                                    description: 'What code do you wish to run',
                                    type: 3,
                                    required: true,
                                },
                            ],
                        },
                    }
                );
            }
        }
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
                    'Clear all the data that bot has collected from your server, server command cooldown: 15 seconds',
                options: [], // No options for this command
                default_member_permissions: '0',
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
            console.error(`Error creating slash commands: ${error}`);
        }
    } catch (err) {
        console.log('guild command did not work making, bot.js line 83 i think');
    }
    try {
        const owner = await guild.fetchOwner();
        await owner.send(`
Thanks for adding MutilpleBot!
_MutilpleBot has been added to ${guild.name} (Server ID: ${guild.id})_
Slash commands should have been made as soonly as you invited the bot
**❓Need support?**
Join our support server: https://discord.com/invite/GbjgmffUKj

||The bot is currently on discord.js V14||`);
    } catch (error) {
        console.log(`Failed to send message to server owner: ${error.message}`);
    }
};
