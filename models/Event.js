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
            id: {
                type: String,
                required: true
            },
            name: {
                type: String,
                required: true
            }
        }
    ],
    location: {
        type: String
    },
    address: {
        type: {
            type: String,
            enum: ["Point"]
        },
        coordinates: {
            type: [Number],
            index: "2dsphere"
        }
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