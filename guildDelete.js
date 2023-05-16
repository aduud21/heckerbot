module.exports = async (client, guild) => {
    const CryptoJS = require('crypto-js');
    var key = process.env.DONOTSHARETHIS;
    const fs = require('fs');
    const ciphertext = fs.readFileSync('./database/realmodlogs.txt', 'utf8');
    const bytes = CryptoJS.AES.decrypt(ciphertext, key);
    const filelog = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    if (!filelog[guild.id]) {
        return;
    }
    delete filelog[guild.id];
    const encryptedData = CryptoJS.AES.encrypt(JSON.stringify(filelog), key).toString();
    fs.writeFile('./database/realmodlogs.txt', encryptedData, (err) => {
        if (err) {
            console.error(`Error writing to modlogs file: ${err}`);
        }
    });
    console.log('Optimized space: bot was removed from a server');
};
