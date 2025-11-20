const express = require("express");
const requestRouter = express.Router();
const { userAuth } = require("../middlewares/auth");
const User = require("../models/user");

requestRouter.get("/sendConnectionRequest", userAuth, async (req, res) => {
  try {
    const user = req.user;

    res.send(user.firstName + " Your Connection request sent successfully!");
  } catch (err) {
    res.status(400).send("ERROR: " + err.message);
  }
});

// app.get("/user", async (req, res) => {
//   const userEmail = req.body.email;
//   try {
//     const users = await User.find({ email: userEmail });
//     if (users.length === 0) {
//       return res.status(404).send("User not found");
//     } else {
//       return res.send(users);
//     }
//   } catch (err) {
//     res.status(500).send("Error while fetching user");
//   }
// });

// app.get("/feed", async (req, res) => {
//   try {
//     const users = await User.find();
//     res.send(users);
//   } catch (err) {
//     res.status(500).send("Error while fetching user");
//   }
// });

// app.delete("/user", async (req, res) => {
//   try {
//     await User.findByIdAndDelete(req.body.id);
//     res.send("User deleted successfully");
//   } catch (err) {
//     res.status(500).send("Error while deleting user");
//   }
// });

// app.patch("/user", async (req, res) => {
//   try {
//     const user = await User.findByIdAndUpdate(req.body.id, req.body, {
//       returnDocument: "after",
//       runValidators: true,
//     });
//     res.send("User patched successfully");
//   } catch (err) {
//     res.status(400).send("update failed" + err.message);
//   }
// });

module.exports = requestRouter;
