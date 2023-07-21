const express = require('express');
const app = express();
const helmet = require('helmet');
const port = 8080;
app.use(helmet());
app.get('/', (req, res) => res.send());
app.listen(port, () => console.log(`✅ -> Keep alive currently active, listen on port: ${port}`));
