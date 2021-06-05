const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function EnrollEntity(args) {
  let errors = {};

args.basiceDetails.emailId = !isEmpty(args.basiceDetails.emailId ) ? args.basiceDetails.emailId  : "";

if (Validator.isEmpty(args.basiceDetails.emailId)) {
  errors.email = "Email field is required";
}

if (!Validator.isEmail(args.basiceDetails.emailId)) {
  errors.email = "Email is invalid";
}

return {
  errors,
  isValid: isEmpty(errors)
    };
}
