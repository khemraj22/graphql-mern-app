const mongoose = require('mongoose')

const ProjectSchema = new mongoose.Schema({
    name: {
        type: String
    },
    description: {
        type: String
    },
    status: {
        type: String,
        enum: ['Not Started', 'In Progress', 'Completed']
    },
    _clientId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Client'
    },
    clientId: {
        type: String,
        ref: 'Client'
    }
})

module.exports = mongoose.model('Project', ProjectSchema)