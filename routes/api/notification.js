const express = require('express');
const router = express.Router();
const passport = require('passport');

const Notification = require('../../models/Notification');

router.get('/', passport.authenticate('jwt', {session: false}), (req, res) => {
    Notification.find({userID: req.user.id})
        .then(notification => {
            res.json({notification: notification});
        })
        .catch(err =>
            res.status(404).json({error: "Error in get api/notification/. " + err})
        );
});

module.exports = router;