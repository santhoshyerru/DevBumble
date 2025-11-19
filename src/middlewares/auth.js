const adminAuth = (req, res, next) => {
  const token = "abcd";
  if (token === "abcd") {
    next();
  } else {
    res.status(401).send("Unauthorized");
  }
};

module.exports = { adminAuth };
