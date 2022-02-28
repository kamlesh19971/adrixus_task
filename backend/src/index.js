require("dotenv").config();

const express = require("express");
const serverless = require("serverless-http");
const cors = require("cors");
const path = require("path");
const app = express();
const db = require("./models");
const api = require("./routes");

const PORT = parseInt(process.env.PORT) || 4000;

(() => {
  db.then((res) => {
    console.log("database Connected");
  });
})();

app.use(cors());
app.use(express.json());

app.use("/api", api);

app.use(express.static("build"));
app.use("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../build/index.html"));
});

module.exports = app;
module.exports.handler = serverless(app);

// app.listen(PORT, () => {
//   console.log(`Server Listining on ${PORT}`);
// });
