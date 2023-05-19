const mongoose = require('mongoose');

const clientSchema = mongoose.Schema({
    name: String,
    email: String,
    phone: String
});

const Client = mongoose.model('Client', clientSchema);
module.exports = Client;