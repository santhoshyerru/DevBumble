const validator = require("validator");

const validationSignup = (req, res) => {
  const { firstName, email, password } = req.body;
  if (firstName === "") {
    throw Error("First name is required!");
  }
  if (!validator.isEmail(email)) {
    throw Error("Invalid email address!");
  }
  if (!validator.isStrongPassword(password)) {
    throw Error("Password is not strong enough!");
  }
};

module.exports = { validationSignup };
