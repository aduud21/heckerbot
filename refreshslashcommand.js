const create_global_command = true; // Set this to true to add/edit global commands, if this is disabled, no global commands will be added or edited
const clientUSERID = '947733660432490506'; // Enter the ApplicationID (formally the clientID of your bot) here else it will NOT create commands
const { readdir } = require('fs/promises');
const { join } = require('path');
module.exports = async (client, rest, Routes) => {
    if (create_global_command) {
        try {
            const folderPath = join(__dirname, 'slashcommands');
            const files = await readdir(folderPath);

            const jsFiles = files.filter((file) => file.endsWith('.js'));
            if (jsFiles.length <= 0) {
                return console.log('No slash commands were found. Please add some!');
            }
            console.log(
                'To create new commands, please go to refreshslashcommand.js and change the data (it must be in json format)'
            );
            //Check out https://discord.com/developers/docs/interactions/application-commands
            const commands = [
                {
                    name: 'number',
                    description: 'Picks a number from 1 to [your choice]',
                    options: [
                        {
                            name: 'number',
                            description: 'Pick a number from 1 to [your choice]',
                            type: 10,
                            required: true,
                        },
                    ],
                    dm_permission: false,
                },
                {
                    name: 'bloxlinkcheck',
                    description: 'Check if a user is verified with bloxlink',
                    options: [
                        {
                            name: 'usertocheck',
                            description: 'Mention a user',
                            type: 6,
                            required: true,
                        },
                    ],
                    dm_permission: false,
                },
                {
                    name: 'coinflip',
                    description: 'Flip a coin. Can be Head or tails',
                    options: [], // No options for this command
                    dm_permission: false,
                },
                {
                    name: 'checklink',
                    description: "Check a link if it's possibly malicious (May be incorrect)",
                    options: [
                        {
                            name: 'link',
                            description: 'Domain or URL allowed',
                            type: 3,
                            required: true,
                        },
                    ],
                    dm_permission: false,
                },
                {
                    name: 'code',
                    description: "View the bot's source code",
                    options: [], // No options for this command
                    dm_permission: false,
                },
                {
                    name: 'information',
                    description: 'View information about this discord bot',
                    options: [], // No options for this command
                    dm_permission: false,
                },
                {
                    name: 'deldata',
                    description:
                        'Clear all the data that bot has collected from your server. May prevent using setmodlog.',
                    options: [], // No options for this command
                    default_member_permissions: '0',
                    dm_permission: false,
                },
                {
                    name: 'membercount',
                    description: 'View total membercount of this server',
                    options: [], // No options for this command
                    dm_permission: false,
                },
                {
                    name: 'setmodlog',
                    description:
                        'Set a logging channel for deleted/edited messages. Server Command cooldown: 15 seconds.',
                    options: [
                        {
                            name: 'channel',
                            description: `Mention a text channel`,
                            type: 7,
                            required: true,
                        },
                    ],
                    default_member_permissions: '0',
                    dm_permission: false,
                },
                {
                    name: 'quiz',
                    description: 'Some random questions',
                    options: [], // No options for this command
                    dm_permission: false,
                },
                {
                    name: 'rps',
                    description: 'Randomly pick from Rock. Paper or Scissors',
                    options: [], // No options for this command
                    dm_permission: false,
                },
                {
                    name: 'uptime',
                    description: 'View the current bot client uptime',
                    options: [], // No options for this command
                    dm_permission: false,
                },
            ];

            console.log(`Started refreshing ${commands.length} application (/) commands.`);

            try {
                const data = await rest.put(Routes.applicationCommands(clientUSERID), {
                    body: commands,
                });

                console.log(`Successfully reloaded ${data.length} application (/) commands.`);
            } catch (error) {
                console.error('[ERROR] Failed to reload application commands.');
                console.error(error);
            }
        } catch (error) {
            console.error('[ERROR] Failed to read command files.');
            console.error(error);
        }
    }
};
