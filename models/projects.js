const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const projectSchema = new Schema({
    name: {
        type: String
    },
    projectId: {
        type: String,
        required: true
    },
    pm: [
        {
            type: Schema.Types.ObjectId, ref: 'User' 
        }
    ],
    sponsor: {
        type: String
    },
    priority: {
        type: Number,
        min:1,
        max:10
    },
    participants: [
        {
            type: Schema.Types.ObjectId, ref: 'User' 
        }
    ]
})

module.exports = mongoose.model('Project', projectSchema);