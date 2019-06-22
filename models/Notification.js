const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const NotificationSchema = new Schema({
    userID: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    authorID: {
        type: String
    },
    authorName: {
        type: String,
    },
    text: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    read:{
        type: Boolean,
        default: false
    }
});

module.exports = Notification = mongoose.model('notification', NotificationSchema);