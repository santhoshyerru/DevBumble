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

const validationEditProfile = (req) => {
  const validFields = [
    "firstName",
    "lastName",
    "age",
    "city",
    "gender",
    "about",
    "photoUrl",
    "skills",
  ];

  return Object.keys(req.body).every((key) => validFields.includes(key));
};

module.exports = { validationSignup, validationEditProfile };
