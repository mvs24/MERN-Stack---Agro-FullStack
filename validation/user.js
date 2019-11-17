const Validator = require("validator");

const validateUser = data => {
  let validation = [];
  let errors = {};
  let isValid = true;

  if (!data.name || data.name.trim().length < 2) {
    errors.name = "Name must be more than 2 letters";
    isValid = false;        
  }
  if (!data.lastname || data.lastname.trim().length < 2) {
    errors.lastname = "Lastname must be more than 2 letters";
    isValid = false;
  }
  if (data.password.length < 6) {
    errors.password = "Password must be more than 6 letters";
    isValid = false;
  }
  if (!Validator.isEmail(data.email)) {
    errors.email = "Email is invalid";
    isValid = false;
  }

  if (Validator.isEmpty(data.email)) {
    errors.email = "Email field is required";
    isValid = false;
  }

  validation.push(errors);
  validation.push(isValid);

  return validation;
};

module.exports = { validateUser };
