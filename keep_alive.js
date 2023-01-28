// Kinda funny program lol
const express = require('express');
const app = express();
const helmet = require('helmet');
const port = 3000;
let ddosProtection = require('./ddosProtection.js'); //DDoS protection.
let protect_urls = ["/", "/error"]; 
let ddos_log = false;
app.use(helmet(), async function(req, res, next) {
    let url = req.originalUrl;
    if (protect_urls.includes(url)) {
        let ddos = await ddosProtection(req, ddos_log)
        if (ddos == "GLOBAL_DDOS") {
            res.status(429).json({
                WARNING: "Global DDOS Detected, ERROR 429, Please try again later"
            });
            return;
        }
        if (ddos == "USER_DDOS") { //Blocks IP addresses that perform DDoS.
            res.status(429).json({
                USERWARNING: "USER DDOS DETECTED, ERROR 429, PLEASE TRY AGAIN LATER"
            });
            return;
        }
    }
    next();
});

app.get('/', (req, res) => res.redirect("https://discord.gg/YSEB7PnHVV"))
app.listen(port, () => console.log(`✅ -> Keep alive currently active, Code (bot) by adudu21 (AGuyThatLikesFurrys)`));