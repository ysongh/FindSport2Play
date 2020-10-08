const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');
const passport = require('passport');

const validateRegisterInput = require('../../validation/register');
const validateLoginInput = require('../../validation/login');

const User = require('../../models/User');
const Notification = require('../../models/Notification');

// POST /api/users/register
// sign up a new user
router.post('/register', (req, res) => {
    const {errors, isValid} = validateRegisterInput(req.body);
    
    if(!isValid){
        return res.status(400).json(errors);
    }
    
    User.findOne({ email: req.body.email })
        .then(user => {
            if(user){
                errors.email = 'Email Already Exists';
                return res.status(400).json(errors);
            }
            else{
                const newUser = new User({
                    name: req.body.name,
                    email: req.body.email,
                    password: req.body.password
                });
                
                const newNotification = new Notification({
                    userID: newUser._id,
                    text: "Welcome to FindSport2Play, please create your profile."
                });
                
                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(newUser.password, salt, (err, hash) => {
                        if(err) throw err;
                        newNotification.save();
                        newUser.password = hash;
                        newUser
                            .save()
                            .then(user => {
                                const payload = {id: user.id, name: user.name};
                                
                                jwt.sign(
                                    payload,
                                    keys.secretOrKey,
                                    {expiresIn: 3600},
                                    (err, token) => {
                                        res.json({
                                            success: true,
                                            token: 'Bearer ' + token
                                        });
                                });
                            })
                            .catch(err => console.log(err));
                    });
                });
            }
        });
});

// PATCH /api/users/login
// login the user
router.patch('/login', (req, res) => {
    const {errors, isValid} = validateLoginInput(req.body);
    if(!isValid){
        return res.status(400).json(errors);
    }
    
    const email = req.body.email;
    const password = req.body.password;
    
    User.findOne({email})
        .then(user => {
            if(!user){
                errors.email = 'User not found';
                return res.status(404).json(errors);
            }
            bcrypt.compare(password, user.password)
                .then(isMatch => {
                    if(isMatch){
                        const payload = {id: user.id, name: user.name};
                        
                        jwt.sign(
                            payload,
                            keys.secretOrKey,
                            {expiresIn: 3600},
                            (err, token) => {
                                res.json({
                                    success: true,
                                    token: 'Bearer ' + token
                                });
                        });
                    }
                    else{
                        errors.password = 'Password Incorrect';
                        return res.status(400).json(errors);
                    }
                });
        });
});

// GET /api/users/current
router.get('/current', passport.authenticate('jwt', {session: false}), (req, res) => {
    res.json({
        id: req.user.id,
        name: req.user.name,
        email: req.user.email
    });
});

// GET /api/users/<:user_id>
router.get('/:id', (req, res) => {
    User.findById(req.params.id)
        .then(user => res.json(user))
        .catch(err =>
            res.status(500).json({error: "Error in get api/users/:id. " + err})
        );
});

module.exports = router;