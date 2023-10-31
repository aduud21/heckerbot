const express = require('express');
const app = express();
const helmet = require('helmet');
function keepalive() {
    const port = Math.floor(Math.random() * (9000 - 4000 + 1)) + 4000;
    app.use(helmet());
    app.listen(port, (err) => {
        if (err) {
            console.error(
                `❌ -> Error: Port ${port} is already in use. Retrying with a new port...`
            );
            keepalive();
        } else {
            console.log(`✅ -> Keep alive active, listen on port: ${port}`);
        }
    });
}
keepalive();
