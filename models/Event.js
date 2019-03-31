const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const EventSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    nameofevent: {
        type: String,
        required: true
    },
    typeofsport: {
        type: String,
        required: true
    },
    numberofplayer: {
        type: Number,
        required: true
    },
    listofplayer: [
        {
            user: {
                type: Schema.Types.ObjectId,
                ref: 'users'
            }
        }
    ],
    location: {
        type: String
    },
    description: {
        type: String
    },
    imageURL: {
        type: String
    },
    comments: [
        {
            user: {
                type: Schema.Types.ObjectId,
                ref: 'users'
            },
            text: {
                type: String,
                required: true
            },
            name: {
                type: String
            },
            date:{
                type: Date,
                default: Date.now
            }
        }
    ],
    date:{
        type: Date,
        default: Date.now
    },
    start: {
        type: Date,
    }
});

module.exports = Event = mongoose.model('event', EventSchema);