const { readdir } = require('fs/promises');
const { join } = require('path');

module.exports = async (client, message, rest, Routes) => {
    try {
        const folderPath = join(__dirname, '.', 'prefixcommands');
        const files = await readdir(folderPath);

        const jsFiles = files.filter((file) => file.endsWith('.js'));
        if (jsFiles.length <= 0) {
            return console.log(
                'No prefix commands were found, please add some or remove handlers folder in utils'
            );
        }

        for (const file of jsFiles) {
            const filePath = join(folderPath, file);
            const pullCmd = require(`${filePath}`);
            client.commands.set(pullCmd.config.name, pullCmd);

            console.log('✅ -> File: ' + pullCmd.config.name + ' successfully loaded');

            if (!pullCmd.config.name) {
                console.log('❌  -> missing a help.name, or help.name is not a string.');
            }
            if (!pullCmd.config.group) {
                console.log("❔ -> Couldn't find any group in " + pullCmd.config.name);
                return;
            } else {
                if (!client.groups.includes(pullCmd.config.group)) {
                    return console.log(
                        '❔ -> Unknown group ' + `${pullCmd.config.group} in ` + pullCmd.config.name
                    );
                }
            }

            try {
                pullCmd.config.aliases.forEach((alias) => {
                    client.aliases.set(alias, pullCmd.config.name);
                });
            } catch {}
        }
    } catch (err) {
        console.error(err);
    }
};
