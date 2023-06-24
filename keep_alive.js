const express = require('express');
const app = express();
const helmet = require('helmet');
const port = Math.floor(Math.random() * (9000 - 2000  + 1)) + 2000;
app.use(helmet());
app.get('/', (req, res) => res.redirect('https://discord.gg/YSEB7PnHVV'));
app.listen(port, '0.0.0.0', () =>
    console.log(
        `✅ -> Keep alive currently active, Code (bot) by adudu21 (AGuyThatLikesFurrys), listen on port: ${port}`
    )
);
