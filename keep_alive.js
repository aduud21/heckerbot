// Kinda funny program lol
const express = require('express');
const app = express();
const helmet = require('helmet');
const port = 3000;
app.use(helmet());
app.get('/', (req, res) => res.redirect('https://discord.gg/YSEB7PnHVV'));
app.listen(port, () =>
    console.log(`✅ -> Keep alive currently active, Code (bot) by adudu21 (AGuyThatLikesFurrys)`)
);
