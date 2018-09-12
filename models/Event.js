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
    location: {
        type: String
    },
    description: {
        type: String
    },
    image: {
        type: String
    },
    image_id: {
        type: String
    },
    date:{
        type: Date,
        default: Date.now
    }
});

module.exports = Event = mongoose.model('event', EventSchema);