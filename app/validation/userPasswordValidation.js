const Validator = require("validator");
const isEmpty = require("./is-empty");
const passwordValidation = require("./passwordvalidation");

module.exports = function userPasswordValidation(data) {
  let errors = {};

  data.existingPassword = !isEmpty(data.existingPassword)
    ? data.existingPassword
    : "";

  if (Validator.isEmpty(data.existingPassword)) {
    errors.existingPassword = "Existing Password field is required";
  }

  errors = { ...errors, ...passwordValidation(data).errors };

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
