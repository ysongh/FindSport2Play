const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateProfileInput(data){
    let errors = {};

    data.nameofevent = !isEmpty(data.nameofevent) ? data.nameofevent: '';
    data.typeofsport = !isEmpty(data.typeofsport) ? data.typeofsport: '';
    data.numberofplayer = !isEmpty(data.numberofplayer) ? data.numberofplayer: '';
    
    if(Validator.isEmpty(data.nameofevent)){
        errors.nameofevent = 'Name of event is required';
    }
    
    if(Validator.isEmpty(data.typeofsport)){
        errors.typeofsport = 'Type of sport field is required';
    }
    
    if(!Validator.isNumeric(data.numberofplayer)){
        errors.numberofplayer = 'Must be a number';
    }
    
    if(Validator.isEmpty(data.numberofplayer)){
        errors.numberofplayer = 'Number of player field is required';
    }
    else if(data.numberofplayer <= 1){
        errors.numberofplayer = 'Must be at least 2 players';
    }
    else if(data.numberofplayer > 100){
        errors.numberofplayer = 'Must be less than 100 players';
    }
    
    if(!isEmpty(data.imageURL)){
        if(!Validator.isURL(data.imageURL)){
            errors.imageURL = 'Not a valid URL';
        }
    }
    
    return {
        errors,
        isValid: isEmpty(errors)
    };
};