const Validator = require('validator');
const isEmpty = require('./is-empty'); // import the variable from other file

module.exports = function validateLoginInput(data) {
  let errors = {};
  data.email = !isEmpty(data.email) ? data.email: '';
  data.password = !isEmpty(data.password) ? data.password: '';

  if(!Validator.isEmail(data.email)) {
    errors.email = 'Email is invalid';
  }
  
  if(Validator.isEmpty(data.email)) {
    errors.email = 'Email field is required';
  }
  
  if(Validator.isEmpty(data.password)) {
    errors.password = 'Password filed is required';
  }
  
  return {
    errors: errors,
    isValid: isEmpty(errors) // check if it is empty
  };
}