module.exports.config = {
    name: 'help',
    cooldown: '5000',
    group: 'info',
    usage: 'help',
    guarded: true,
    example: 'mb!help',
    description: 'Help menu for all prefix commands',
};

module.exports.run = async (client, message, args) => {
    await message.react('✅').catch(() => {});
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
                            ? `**Permission(s) required:** ${pu.config.permissions
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
Most prefix commands were removed as of 6/10/2023 and were replaced with slash commands but i might start making prefix commands again, left prefix commands:
${client.prefix}help

To gain information on a certain prefix command please do ${client.prefix}help [prefix command name here]
||obviously replace [prefix command name here] with the name of the prefix command||
`
                )
                .catch(() => {});
        } catch (err) {}
    }
};
// adudu21 was here
