const User = require("../models/user");
const jsonwebtoken = require("jsonwebtoken");
const adminAuth = (req, res, next) => {
  const token = "abcd";
  if (token === "abcd") {
    next();
  } else {
    res.status(401).send("Unauthorized");
  }
};

const userAuth = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    decodeMsg = jsonwebtoken.verify(token, "secret");
    const user = await User.findOne({ _id: decodeMsg.id });
    req.user = user;
    console.log(user);
    if (!user) {
      res.status(400).send("User not found");
    }
    next();
  } catch (err) {
    res.status(401).send(err.message);
  }
};

module.exports = { adminAuth, userAuth };
