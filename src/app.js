const express = require("express");

const app = express();

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

// app.use("/hello", (req, res) => {
//   res.send("Hello from the server!");
// });
app.listen(3000, () => {
  console.log("Server started on port 3000");
});
