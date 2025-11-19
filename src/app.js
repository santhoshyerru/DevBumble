const express = require("express");
const { adminAuth } = require("./middlewares/auth");
const app = express();

app.use("/admin", adminAuth);

app.get("/admin", (req, res) => {
  throw new Error("Admin route error");
  res.send("Admin route");
});

app.get("/user", (req, res) => {
  res.send({
    name: "John",
    age: 20,
    city: "New York",
  });
});

app.post("/user", (req, res) => {
  res.send("User created successfully");
});

app.put("/user", (req, res) => {
  res.send("User updated successfully");
});

app.delete("/user", (req, res) => {
  res.send("User deleted successfully");
});

app.patch("/user", (req, res) => {
  res.send("User patched successfully");
});

//advanced route handling
app.get(/^\/user(s)?$/, (req, res) => {
  res.send("User route");
});

app.use("/", (err, req, res, next) => {
  if (err) {
    res.status(500).send("Internal Server Error");
  }
});

// app.use("/hello", (req, res) => {
//   res.send("Hello from the server!");
// });
app.listen(3000, () => {
  console.log("Server started on port 3000");
});
