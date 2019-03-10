const Validator = require('validator');
const isEmpty = require('./is-empty'); // import the variable from other file

module.exports = function validatePostInput(data) {
  let errors = {};
  data.test = !isEmpty(data.test) ? data.text: '';
  
  if(!Validator.isLength(data.text, {min: 10, max: 300})) {
    errors.text = 'Post must be between 10 and 300 characters';
  }

  if(Validator.isEmpty(data.text)) {
    errors.text = 'Text field is required';
  }

  return {
    errors: errors,
    isValid: isEmpty(errors) // check if it is empty
  };
}