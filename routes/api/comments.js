const express = require('express');
const router = express.Router();
const passport = require('passport');

const validateCommentInput = require('../../validation/comment');

const Event = require('../../models/Event');

router.get('/:id/comments/test', (req, res) => {
    Event.findById(req.params.id)
        .then(comment => {
            res.json({msg: "Comment Work"});
        })
        .catch(err =>
            res.status(404).json({error: "Error in get api/events/:id/comments/test. " + err})
        );
});

router.post('/:id/comments', passport.authenticate('jwt', {session: false}), (req, res) => {
    Event.findById(req.params.id)
        .then(event => {
            const {errors, isValid} = validateCommentInput(req.body);
            
            if(!isValid){
                return res.status(400).json(errors);
            }
            
            const newComment = {
                text: req.body.text,
                name: req.user.name,
                user: req.user.id
            };
            
            event.comments.unshift(newComment);
            
            event.save()
                .then(event => res.json(event));
        });
});

module.exports = router;