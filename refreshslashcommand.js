const { readdir } = require('fs/promises');
const clientUSERID = '947733660432490506';
const { join } = require('path');
module.exports = async (client, rest, Routes) => {
    try {
        const folderPath = join(__dirname, 'slashcommands');
        const files = await readdir(folderPath);

        const jsFiles = files.filter((file) => file.endsWith('.js'));
        if (jsFiles.length <= 0) {
            return console.log('No slash commands were found. Please add some!');
        }

        const commands = [
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
            },
            {
                name: 'coinflip',
                description: 'Flip a coin. Can be Head or tails',
                options: [], // No options for this command
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
};
