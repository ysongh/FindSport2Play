const express = require('express');
const router = express.Router();
const passport = require('passport');

const validateEventInput = require('../../validation/event');

const Event = require('../../models/Event');
const Notification = require('../../models/Notification');

// testing
router.get('/test', (req, res) => res.json({msg: "Events Work"}));

// fetch all events
router.get('/all', (req, res) => {
    Event.find()
        .sort('-date')
        .populate('user', ['name'])
        .then(events => {
            res.json(events);
        })
        .catch(err => 
            res.status(404).json({error: "Error in get api/events/all. " + err})
        );
});

// find an event by Id
router.get('/:id', (req, res) => {
    Event.findById(req.params.id)
        .populate('user', ['name'])
        .then(event => res.json(event))
        .catch(err =>
            res.status(404).json({error: "Error in get api/events/:id. " + err})
        );
});

// create an event
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
    if(req.body.imageURL) eventFields.imageURL = req.body.imageURL;
    if(req.body.start) eventFields.start = req.body.start;
    
    new Event(eventFields).save().then(event => res.json(event));
});

// add player to the event
router.put('/:id/join', passport.authenticate('jwt', {session: false}), (req, res) => {
    let newNotification;
    Event.findById(req.params.id)
        .populate('user', ['name'])
        .then(event => {
            if(!event){
                return res.status(404).json({error: 'This event is not found'});
            }
            
            let count = 0;
            
            for(let i of event.listofplayer){
                if(i["id"] === req.user.id){
                    return res.status(400).json({alreadyJoin: 'You already join this event'});
                }
                count++;
            }
            
            if(count >= event.numberofplayer){
                return res.status(400).json({error: 'This event is full'});
            }
            
            const userName = req.user.name;
            
            const newPlayer = {
                id: req.user.id,
                name: userName
            };
            
            newNotification = new Notification({
                userID: event.user._id,
                authorID: req.user.id,
                authorName: userName,
                text: "join your event"
            });
            
            event.listofplayer.push(newPlayer);
            return event.save();
        })
        .then(result => {
            newNotification.save();
            res.status(200).json({
                msg: 'Success on joining that event',
                event: result
            });
        })
        .catch(err => res.status(404).json({error: "Error in put api/events/:id/join. " + err}));
});

// delete an event
router.delete('/:id', passport.authenticate('jwt', {session: false}), (req, res) => {
    Event.findById(req.params.id)
        .then(event => {
            if(event.user.toString() !== req.user.id){
                return res.status(401).json({notauthorized: 'User not authorized'});
            }
            event.remove().then(() => res.json({success: true}));
        })
        .catch(err => res.status(404).json({error: "Error in delete api/events/:id. " + err}));
});

module.exports = router;