const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

const validateEventInput = require('../../validation/event');

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

router.post('/', passport.authenticate('jwt', {session: false}),(req, res) => {
    const {errors, isValid} = validateEventInput(req.body);
    
    if(!isValid){
        return res.status(400).json(errors);
    }
    
    const eventFields = {};
    eventFields.user = req.user.id;
    
    if(req.body.nameofevent) eventFields.nameofevent = req.body.nameofevent;
    if(req.body.typeofsport) eventFields.typeofsport = req.body.typeofsport;
    if(req.body.numberofplayer) eventFields.numberofplayer = req.body.numberofplayer;
    if(req.body.location) eventFields.location = req.body.location;
    if(req.body.description) eventFields.description = req.body.description;
    
    new Event(eventFields).save().then(event => res.json(event));
});

module.exports = router;