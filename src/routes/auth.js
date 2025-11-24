const express = require("express");
const authRouter = express.Router();
const User = require("../models/user");
const { validationSignup } = require("../utils/validations");
const bcrypt = require("bcrypt");

authRouter.post("/signup", async (req, res) => {
  try {
    validationSignup(req, res);
    const { email, password } = req.body;
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    req.body.password = hash;
    const user = new User(req.body);
    await user.save();
    res.send("User created successfully!");
  } catch (err) {
    res.status(400).send("ERROR: " + err.message);
  }
});

authRouter.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).send("User not found!");
    }
    const isMatch = await user.validatePassword(password);
    if (!isMatch) {
      return res.status(400).send("Invalid credentials!");
    }
    const token = await user.getJwtToken();
    res.cookie("token", token, { expires: new Date(Date.now() + 3600000) });

    res.send("User logged in successfully!");
  } catch (err) {
    res.status(400).send("ERROR: " + err.message);
  }
});

authRouter.get("/logout", (req, res) => {
    res.cookie("token", null, { expires: new Date(Date.now()) });
    res.send("User logged out successfully!");
})
module.exports = authRouter;
