const mongoose = require('mongoose');

const clientSchema = mongoose.Schema({
    name: String,
    email: {type: String, unique: true},
    phone: {type: String, unique: true}
});

const Client = mongoose.model('Client', clientSchema);
module.exports = Client;