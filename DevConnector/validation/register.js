const validator = require('validator');

module.exports = function validateRegisterInput(data) {
  let errors = {};
  if(!Validator.isLength(data.name, { min: 2, max: 30 })){
    // if there are errors
    errors.name = 'Name must be between 2 and 30 characters';
  }
  
  return {
    errors: errors,
    isValid: errors // check if it is empty
  }
}