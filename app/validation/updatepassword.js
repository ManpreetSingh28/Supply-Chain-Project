const Validator = require("validator");
const isEmpty = require("./is-empty");
const passwordValidation = require("./passwordvalidation");

module.exports = function validateUpdatePasswdInput(data) {
  let errors = {};

  data.email = !isEmpty(data.email) ? data.email : "";
  data.passkey = !isEmpty(data.passkey) ? data.passkey : "";

  if (Validator.isEmpty(data.email)) {
    errors.email = "Email field is required";
  }

  if (!Validator.isEmail(data.email)) {
    errors.email = "Email is invalid";
  }

  if (Validator.isEmpty(data.passkey)) {
    errors.passkey = "Password reset url is incorrect!";
  }

  if (!Validator.isLength(data.passkey, { min: 6 })) {
    errors.passkey = "Password reset url is incorrect!";
  }

  errors = { ...errors, ...passwordValidation(data).errors };

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
