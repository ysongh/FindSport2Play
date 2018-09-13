const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');
const multer = require('multer');

const cAPIKey = require('../../config/keys').cloudinaryAPIKey;
const cAPISecret = require('../../config/keys').cloudinaryAPISecret;

const storage = multer.diskStorage({
    filename: function(req, file, callback) {
        callback(null, Date.now() + file.originalname);
    }
});

const imageFilter = function (req, file, cb) {
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/i)) {
        return cb(new Error('Only image files are allowed!'), false);
    }
    cb(null, true);
};

const upload = multer({ storage: storage, fileFilter: imageFilter});

const cloudinary = require('cloudinary');

cloudinary.config({ 
    cloud_name: 'songweb', 
    api_key: cAPIKey, 
    api_secret: cAPISecret
});

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
            res.status(404).json({error: "Error in get api/events/all. " + err})
        );
});

router.get('/:id', (req, res) => {
    Event.findById(req.params.id)
        .populate('user', ['name'])
        .then(event => res.json(event))
        .catch(err =>
            res.status(404).json({error: "Error in get api/events/:id. " + err})
        );
});


router.post('/', passport.authenticate('jwt', {session: false}), upload.single('image'), (req, res) => {
    const {errors, isValid} = validateEventInput(req.body);
    
    if(!isValid){
        return res.status(400).json(errors);
    }
    
    const eventFields = {};
    eventFields.user = req.user.id;
    
    cloudinary.uploader.upload(req.body.image.file, function(result) {
        eventFields.image = result.secure_url;
        eventFields.image_id = result.public_id;
    });
    
    if(req.body.nameofevent) eventFields.nameofevent = req.body.nameofevent;
    if(req.body.typeofsport) eventFields.typeofsport = req.body.typeofsport;
    if(req.body.numberofplayer) eventFields.numberofplayer = req.body.numberofplayer;
    if(req.body.location) eventFields.location = req.body.location;
    if(req.body.description) eventFields.description = req.body.description;
    
    new Event(eventFields).save().then(event => res.json(event));
});

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