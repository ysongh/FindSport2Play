const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateProfileInput(data){
    let errors = {};

    data.handle = !isEmpty(data.handle) ? data.handle: '';
    data.favoriteSport = !isEmpty(data.favoriteSport) ? data.favoriteSport: '';
    
    if(!Validator.isLength(data.handle, {min: 2, max: 40})){
        errors.handle = 'Handle needs to be between 2 and 40 chararcters';
    }
    
    if(Validator.isEmpty(data.handle)){
        errors.handle = 'Profile handle is required';
    }
    
    if(Validator.isEmpty(data.favoriteSport)){
        errors.favoriteSport = 'Favorite Sport is required';
    }
    
    return {
        errors,
        isValid: isEmpty(errors)
    };
};