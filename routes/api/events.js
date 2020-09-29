const express = require('express');
const router = express.Router();
const passport = require('passport');

const validateEventInput = require('../../validation/event');

const Event = require('../../models/Event');
const Notification = require('../../models/Notification');

// GET /api/events/all
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

// GET /api/events/events
// or /api/events/events?sport=${sport}
// fetch all events or by type of sport that are not flag
router.get('/events', (req, res) => {
    Event.find(req.query.sport ? {typeofsport: req.query.sport, flag: false} : { flag: false })
        .sort('-date')
        .populate('user', ['name'])
        .then(events => {
            res.json(events);
        })
        .catch(err => 
            res.status(404).json({error: "Error in get api/events/events. " + err})
        );
});

// GET /api/events/<:event_id>
// find an event by Id
router.get('/:id', (req, res) => {
    Event.findById(req.params.id)
        .populate('user', ['name'])
        .then(event => res.json(event))
        .catch(err =>
            res.status(404).json({error: "Error in get api/events/:id. " + err})
        );
});

// POST /api/events
// create or update an event
router.post('/', passport.authenticate('jwt', {session: false}),(req, res) => {
    const {errors, isValid} = validateEventInput(req.body);
    const event_Id = req.query.eventId;
    
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

    Event.findById(event_Id)
        .then(event => {
            // update an event
            if(event){
                if(req.body.nameofevent) event.nameofevent = req.body.nameofevent;
                if(req.body.typeofsport) event.typeofsport = req.body.typeofsport;
                if(req.body.numberofplayer) event.numberofplayer = req.body.numberofplayer;
                if(req.body.location) event.location = req.body.location;
                if(req.body.description) event.description = req.body.description;
                if(req.body.imageURL) event.imageURL = req.body.imageURL;
                if(req.body.start) event.start = req.body.start;

                return event.save().then(event => res.json(event));;
            }
            // create a new event
            else{
                new Event(eventFields).save().then(event => res.json(event));
            }
        })
});

// PUT /api/events/<:event_id>/join
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
                    return res.status(400).json({error: 'You already join this event'});
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
                event: result,
                join: "You are going to this event"
            });
        })
        .catch(err => res.status(500).json({error: "Error in put api/events/:id/join. " + err}));
});

// PUT /api/events/<:event_id>/flag
// flag an event
router.put('/:id/flag', (req, res) => {
    Event.findById(req.params.id)
        .populate('user', ['name'])
        .then(event => {
            if(!event){
                return res.status(404).json({error: 'This event is not found'});
            }

            event.flag = true;
            return event.save();
        })
        .then(result => {
            res.status(200).json({
                msg: 'Success on flagging that event',
                event: result
            });
        })
        .catch(err => res.status(500).json({error: "Error in put api/events/:id/flag. " + err}));
});

// DELETE /api/events/<:event_id>
// delete an event
router.delete('/:id', passport.authenticate('jwt', {session: false}), (req, res) => {
    Event.findById(req.params.id)
        .then(event => {
            if(event.user.toString() !== req.user.id){
                return res.status(401).json({notauthorized: 'User not authorized'});
            }
            event.remove().then(() => res.json({success: true}));
        })
        .catch(err => res.status(500).json({error: "Error in delete api/events/:id. " + err}));
});

module.exports = router;