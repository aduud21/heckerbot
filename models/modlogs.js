const mongoose = require('mongoose');
const Modlog = require('../models/modlog');
mongoose.connect(process.env.mongodb, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

let modlogDocuments = [];

async function fetchModlogDocuments() {
    try {
        modlogDocuments = await Modlog.find();
    } catch (error) {
        console.log('Error fetching modlog documents:', error);
    }
}

fetchModlogDocuments();
setInterval(fetchModlogDocuments, 10000);

module.exports = () => modlogDocuments;
