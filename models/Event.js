const mongoose = require('mongoose');
const geocoder = require("../config/geocoder");

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
    date: {
        type: Date,
        default: Date.now
    },
    start: {
        type: Date,
    },
    flag: {
        type: Boolean,
        default: false
    }
});

EventSchema.pre("save", async function(next){
    if(this.location){
        const data = await geocoder.geocode(this.location);
        this.address = {
            type: "Point",
            coordinates: [data[0].longitude, data[0].latitude]
        }
    }
    
    next();
})

module.exports = Event = mongoose.model('event', EventSchema);