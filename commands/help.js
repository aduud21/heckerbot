const { Client } = require('discord.js');

module.exports.config = {
    name: 'help',
    cooldown: '2500',
    group: 'info',
    usage: 'help',
    guarded: true,
    example: 'mb!help',
    description: 'Help menu for all prefix commands, command cooldown: 2.5 seconds',
};

module.exports.run = async (client, message, args) => {
    try {
        await message.react('✅');
    } catch (error) {
        console.error(`Error reacting to message`);
    }
    try {
        let pu =
            (await client.commands.get(args[0])) ||
            (await client.commands.get(client.aliases.get(args[0])));

        if (
            client.commands.has(args[0]) ||
            client.commands.has(client.commands.get(client.aliases.get(args[0]).config.name))
        ) {
            return message
                .reply(
                    `
    
${pu.config.name ? `**Name:** ${pu.config.name}` : ''}${pu.config.description ? '\n' : ''}${
                        pu.config.description ? `**Description:** ${pu.config.description}` : ''
                    }${pu.config.aliases ? '\n' : ''}${
                        pu.config.aliases ? `**Aliases:** ${pu.config.aliases.join(', ')}` : ''
                    }${pu.config.group ? '\n' : ''}${
                        pu.config.group ? `**Group:** ${pu.config.group}` : ''
                    }${pu.config.permissions ? '\n' : ''}${
                        pu.config.permissions
                            ? `**Permissions:** ${pu.config.permissions
                                  .join(', ')
                                  .toLocaleLowerCase()}`
                            : ''
                    }${pu.config.usage ? '\n' : ''}${
                        pu.config.usage ? `**Usage:** ${pu.config.usage}` : ''
                    }${pu.config.example ? '\n' : ''}${
                        pu.config.example ? `**Example:** ${pu.config.example}` : ''
                    }                             

                `
                )
                .catch(() => {});
        } else {
        }
    } catch {}

    if (!args[0]) {
        try {
            message
                .reply(
                    `
All prefix commands were removed execpt the following>
${client.prefix}help
${client.prefix}removeserverdata
${client.prefix}setmodlogs
`
                )
                .catch(() => {});
        } catch (err) {}
    }
};
// adudu21 was here
