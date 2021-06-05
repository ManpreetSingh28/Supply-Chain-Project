const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateProfileInput(data) {
  let errors = {};

  data.firstname = !isEmpty(data.firstname)
    ? encodeURIComponent(data.firstname)
    : "";

  data.lastname = !isEmpty(data.lastname)
    ? encodeURIComponent(data.lastname)
    : "";

  if (!Validator.isLength(data.firstname, { min: 2, max: 30 })) {
    errors.firstname = "First Name must be between 2 and 30 characters";
  }
  if (Validator.isEmpty(data.firstname)) {
    errors.firstname = "First Name field is required";
  }

  if (!Validator.isLength(data.lastname, { min: 2, max: 30 })) {
    errors.lastname = "Last Name must be between 2 and 30 characters";
  }
  if (Validator.isEmpty(data.lastname)) {
    errors.lastname = "Last Name field is required";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
