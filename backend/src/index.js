require("dotenv").config();

const express = require("express");
const cors = require("cors");
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

app.listen(PORT, () => {
  console.log(`Server Listining on ${PORT}`);
});
