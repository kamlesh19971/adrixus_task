const express = require("express");
const router = express.Router();
const controller = require("../controllers");
const jwt = require("jsonwebtoken");

const checkAuth = (req, res, next) => {
  const token = req.headers.token;

  try {
    jwt.verify(token, "s4S5e$12DGH", (err, res) => {
      if (err) {
        console.log(err);
        return res.send({ status: false, message: "Session Time Out" });
      }
      next();
    });
  } catch (error) {
    return res.send({ status: false, message: "Session Time Out" });
  }
};

router.post("/signup", controller.signUp);

router.post("/login", controller.login);

router.get("/users", checkAuth, controller.getUsers);

module.exports = router;
