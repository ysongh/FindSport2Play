const express = require('express');
const router = express.Router();
const passport = require('passport');

const Notification = require('../../models/Notification');

// GET /api/notification
// fetch all notification
router.get('/', passport.authenticate('jwt', {session: false}), (req, res) => {
    Notification.find({userID: req.user.id, read: false })
        .countDocuments()
        .then(count => {
            Notification.find({userID: req.user.id})
                .sort('-date')
                .then(notification => {
                    res.json({
                        notification: notification,
                        unread: count
                    });
                })
                .catch(err =>
                    res.status(500).json({error: "Error in get api/notification/. " + err})
                );
        });
});

// PUT /api/notification/check
// set notification read to true
router.put('/check', passport.authenticate('jwt', {session: false}), (req, res) => {
    Notification.updateMany({userID: req.user.id, read: false }, {read: true})
        .catch(err =>
            res.status(500).json({error: "Error in get api/notification/check. " + err})
        );
});

// DELETE /api/notification/<:id>
// delete a notification
router.delete('/:id', passport.authenticate('jwt', {session: false}), (req, res) => {
    Notification.findById(req.params.id)
        .then(notification => {
            if(!notification){
                return res.status(404).json({error: 'This notification is not found'});
            }
            notification.remove().then(() => res.json({success: true}));
        })
        .catch(err =>
            res.status(500).json({error: "Error in get api/notification/. " + err})
        );
});

module.exports = router;