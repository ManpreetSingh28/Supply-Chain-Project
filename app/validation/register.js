const Validator = require("validator");
const isEmpty = require("./is-empty");
const enrollEntity = require("./enrollEntity");

module.exports = function validateRegisterInput(data) {
  let errors = {};

switch (data.fcn) {

case 'enrollEntity':

console.log("args: ",data.args[0].basicDetails.emailId);
  data.args[0].basicDetails.emailId = !isEmpty(data.args[0].basicDetails.emailId ) ? data.args[0].basicDetails.emailId  : "";

  if (Validator.isEmpty(data.args[0].basicDetails.emailId)) {
    errors.email = "Email field is required";
  }

  if (!Validator.isEmail(data.args[0].basicDetails.emailId)) {
    errors.email = "Email is invalid";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };

  break;

  case 'enrollSuppliers':

    data.args[0].basicDetails.emailId = !isEmpty(data.args[0].basicDetails.emailId ) ? data.args[0].basicDetails.emailId  : "";

  if (Validator.isEmpty(data.args[0].basicDetails.emailId)) {
    errors.email = "Email field is required";
  }

  if (!Validator.isEmail(data.args[0].basicDetails.emailId)) {
    errors.email = "Email is invalid";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };

  break;

  default:
    return (console.log('Functin not in validation.',data.fcn));
}

};
