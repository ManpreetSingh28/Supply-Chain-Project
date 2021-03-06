const Validator = require("validator");
const isEmpty = require("./is-empty");

const owasp = require("owasp-password-strength-test");
owasp.config({
  allowPassphrases: false,
  maxLength: 128,
  minLength: 6,
  minPhraseLength: 10,
  minOptionalTestsToPass: 3
});

module.exports = function passwordValidation(data) {
  let errors = {};

  data.password = !isEmpty(data.password) ? data.password : "";
  data.password2 = !isEmpty(data.password2) ? data.password2 : "";

  if (Validator.isEmpty(data.password)) {
    errors.password = "Password field is required";
  }

  if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
    errors.password = "Password must be between 6 and 30 characters";
  }

  let passwdTestResult = owasp.test(data.password);
  if (passwdTestResult.errors.length > 0) {
    errors.password = passwdTestResult.errors[0];
  }

  if (Validator.isEmpty(data.password2)) {
    errors.password2 = "Confirm Password field is required";
  }
  if (!Validator.equals(data.password, data.password2)) {
    errors.password2 = "Passwords must match";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
