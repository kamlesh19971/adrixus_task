const data = require("./dummyData/data.json");
const User = require("./models/user");
const bcrypt = require("bcrypt");
const db = require("./models");

let query = [];

for (let d of data) {
  d.password = bcrypt.hashSync(d.password, 10);
  query.push({ insertOne: { document: d } });
}

(() => {
  db.then(async (res) => {
    console.log("database Connected");
    User.bulkWrite(query).then((result) => {
      console.log(result);
      process.exit(1);
    });
  });
})();
