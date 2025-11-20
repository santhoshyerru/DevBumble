const mongoose = require("mongoose");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
    },
    age: {
      type: Number,
      min: 18,
    },
    password: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
      unique: true,
      trim: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("Invalid email address!");
        }
      },
    },
    city: {
      type: String,
    },
    gender: {
      type: String,
      validate(value) {
        if (!["male", "female", "other"].includes(value)) {
          throw new Error("Invalid gender!");
        }
      },
    },
    photoUrl: {
      type: String,
      validate(value) {
        if (!validator.isUrl(value)) {
          throw new Error("Invalid URL!");
        }
      },
    },
    about: {
      type: String,
      default: "This is the default about",
    },
    skills: {
      type: [String],
    },
  },
  {
    timestamps: true,
  }
);

userSchema.methods.getJwtToken = async function () {
  const user = this;
  return jwt.sign({ id: user._id }, "secret", { expiresIn: "1h" });
};

userSchema.methods.validatePassword = async function (password) {
  const user = this;
  const isValidPassword = bcrypt.compare(password, user.password);
  return isValidPassword;
};
module.exports = mongoose.model("User", userSchema);
