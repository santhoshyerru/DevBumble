const express = require("express");
const profileRouter = express.Router();
const { userAuth } = require("../middlewares/auth");
const { validationEditProfile } = require("../utils/validations");

profileRouter.get("/profile", userAuth, async (req, res) => {
  try {
    console.log("user", req.user);
    res.send(req.user);
  } catch (err) {
    res.status(400).send("ERROR: " + err.message);
  }
});

profileRouter.post("/profile/edit", userAuth, async (req, res) => {
  try {
    if (validationEditProfile(req)) {
      const user = req.user;
      Object.keys(req.body).forEach((key) => {
        user[key] = req.body[key];
      });
      await user.save();
      res.send(`${user.firstName} Profile updated successfully!`);
    } else {
      throw new Error("Invalid Edit Request!");
    }
  } catch (err) {
    res.status(400).send("ERROR: " + err.message);
  }
});

module.exports = profileRouter;
