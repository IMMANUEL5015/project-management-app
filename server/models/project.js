const mongoose = require('mongoose');

const projectSchema = mongoose.Schema({
    name: String,
    description: String,
    status: String,
    clientId: {type: mongoose.Schema.Types.ObjectId, ref: 'Client'},
});

const Project = mongoose.model('Project', projectSchema);
module.exports = Project;