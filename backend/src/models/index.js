const mongoose = require("mongoose");

const options = {
  dbName: "adrixus",
  autoIndex: false,
  maxPoolSize: 10,
  serverSelectionTimeoutMS: 50000,
  socketTimeoutMS: 50000,
  family: 4,
};

module.exports = mongoose.connect("mongodb://localhost:27017", options);
