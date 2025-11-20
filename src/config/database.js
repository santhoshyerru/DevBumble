const mongoose = require("mongoose");

const connectDB = async () => {
  await mongoose.connect(
    "mongodb+srv://santhoshnaidu345:M2okLSv0vMihX8gi@namastenode.0j0zl.mongodb.net/DevBumble"
  );
};

module.exports = connectDB;
