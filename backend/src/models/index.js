const mongoose = require("mongoose");

const options = {
  dbName: "adrixus",
  autoIndex: false,
  maxPoolSize: 10,
  serverSelectionTimeoutMS: 50000,
  socketTimeoutMS: 50000,
  family: 4,
};

module.exports = mongoose.connect(
  "mongodb+srv://kamlesh_thavani:kamlesh1997@cluster0.lvgyb.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
  options
);
