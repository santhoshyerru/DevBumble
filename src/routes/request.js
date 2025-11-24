const express = require("express");
const requestRouter = express.Router();
const { userAuth } = require("../middlewares/auth");
const User = require("../models/user");
const ConnectionRequest = require("../models/connectionRequest");

requestRouter.post(
  "/request/send/:status/:toUserId",
  userAuth,
  async (req, res) => {
    try {
      const user = req.user;
      const fromUserId = user._id;
      const toUserId = req.params.toUserId;
      const status = req.params.status;
      const toUser = await User.findById(toUserId);
      const validStatues = ["interested", "ignored"];
      if (!validStatues.includes(status)) {
        throw new Error("Invalid status");
      }
      if (!toUser) {
        return res.status(400).json({ message: "toUser not found" });
      }
      const connectionExists = await ConnectionRequest.findOne({
        $or: [
          { fromUserId, toUserId },
          { fromUserId: toUserId, toUserId: fromUserId },
        ],
      });
      if (connectionExists) {
        return res.status(400).json({ message: "Connection already exists" });
      }
      const connectionRequest = new ConnectionRequest({
        fromUserId,
        toUserId,
        status,
      });
      const connection = await connectionRequest.save();

      res.send(user.firstName + ", " + status + " in " + toUser.firstName);
    } catch (err) {
      res.status(400).send("ERROR: " + err.message);
    }
  }
);

requestRouter.post(
  "/request/review/:status/:requestId",
  userAuth,
  async (req, res) => {
    try {
      const loggedInUser = req.user;
      const requestId = req.params.requestId;
      const status = req.params.status;
      const validStatues = ["accepted", "rejected"];
      if (!validStatues.includes(status)) {
        throw new Error("Invalid status");
      }
      const request = await ConnectionRequest.findOne({
        _id: requestId,
        toUserId: loggedInUser._id,
        status: "interested",
      });
      if (!request) {
        return res.status(404).json({ message: "Request not found" });
      }
      request.status = status;
      const data = await request.save();
      res.json({ message: "connection request" + status, data });
    } catch (err) {
      res.status(400).send("ERROR: " + err.message);
    }
  }
);

module.exports = requestRouter;
