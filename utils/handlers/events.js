const { readdir } = require('fs/promises');
const { join } = require('path');
module.exports = async (client) => {
    try {
        const files = await readdir('./events/');

        for (const file of files) {
            console.log('✅ -> File: ' + file + ' successfully loaded');
            const event = require(join('../../events/', file));
            let eventName = file.split('.')[0];
            client.on(eventName, event.bind(null, client));
        }
    } catch (err) {
        console.error(err);
    }
};
