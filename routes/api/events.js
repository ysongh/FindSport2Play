const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

const Event = require('../../models/Event');

router.get('/test', (req, res) => res.json({msg: "Events Work"}));

router.get('/all', (req, res) => {
    Event.find()
        .populate('user', ['name'])
        .then(events => {
            res.json(events);
        })
        .catch(err => 
            res.status(404).json({error: err})
        );
});

module.exports = router;