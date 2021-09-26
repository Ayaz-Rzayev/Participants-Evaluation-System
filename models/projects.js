const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Rates = require('./rates');
const AveragePoints = require('./average');

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

projectSchema.post('findOneAndDelete', async function(doc){
    if(doc){
        await Rates.deleteMany({project: doc._id})
    }
})

module.exports = mongoose.model('Project', projectSchema);