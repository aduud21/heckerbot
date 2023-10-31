const express = require('express');
const app = express();
const helmet = require('helmet');
function findAvailablePort() {
    const port = Math.floor(Math.random() * (9000 - 4000 + 1)) + 4000;
    return new Promise((resolve, reject) => {
        const server = app.listen(port, () => {
            console.log(`✅ -> Keep alive active, listen on port: ${port}`);
            server.close(() => {
                resolve(port);
            });
        });
        server.on('error', (error) => {
            server.close(() => {
                reject(error);
            });
        });
    });
}
findAvailablePort()
    .then((availablePort) => {
        app.use(helmet());
        app.listen(availablePort);
    })
    .catch((error) => {
        console.error(`Failed to find an available port: ${error}`);
    });
