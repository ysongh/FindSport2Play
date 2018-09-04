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
    
    return {
        errors,
        isValid: isEmpty(errors)
    };
};