const fs = require('fs');
module.exports = (client, message, rest, Routes) => {
    fs.readdir('./prefixcommands/', (err, files) => {
        if (err) console.log(err);

        let jsFile = files.filter((f) => f.split('.').pop() === 'js');
        if (jsFile.length <= 0) {
            return console.log(
                'No prefix commands were found, please add some or remove handlers folder in utils'
            );
        }
        jsFile.forEach((file, i) => {
            let pullCmd = require(`./prefixcommands/${file}`);
            client.commands.set(pullCmd.config.name, pullCmd);

            console.log('✅ -> File: ' + pullCmd.config.name + ' successfully loaded');

            if (!pullCmd.config.name) {
                console.log(`❌  -> missing a help.name, or help.name is not a string.`);
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
        });
    });
};
