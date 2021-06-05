const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function emailVerificationValidation(data) {
  // console.log(data);
  let errors = {};

  data.verificationkey = !isEmpty(data.verificationkey)
    ? data.verificationkey
    : "";

  if (Validator.isEmpty(data.verificationkey)) {
    errors.message = "Verification key is invalid!";
  }

  if (!Validator.isLength(data.verificationkey, { min: 5 })) {
    errors.message = "Verification key is invalid!";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
