const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.signUp = async (req, res) => {
  try {
    const body = req.body;

    const exists = await User.findOne({ email: body.email }).lean();

    if (exists) {
      return res.send({
        status: false,
        message: "User With that email already exists",
      });
    }

    const user = new User({
      first_name: body.first_name,
      last_name: body.last_name,
      email: body.email,
      password: bcrypt.hashSync(body.password, 10),
    });

    user.save((err, result) => {
      if (err) {
        return res.send({ status: false, message: err.message });
      }

      return res.send({ status: true, message: "User Sign up Successful" });
    });
  } catch (err) {
    console.log(err);
    return res.send({ status: false, message: err.message });
  }
};

exports.login = async (req, res) => {
  try {
    const body = req.body;
    console.log(body);
    const user = await User.findOne(
      { email: body.email },
      { created_at: 0, updated_at: 0, __v: 0 }
    ).lean();
    console.log(user);

    if (!user) {
      return res.send({ status: false, message: "User does not exists" });
    }

    if (!bcrypt.compareSync(body.password, user.password)) {
      return res.send({ status: false, message: "Wrong Password" });
    }

    delete user.password;

    const access_token = jwt.sign({ userId: user._id }, "s4S5e$12DGH");
    if (!res.headersSent)
      return res.send({
        status: true,
        message: "Login SuccessFul",
        access_token,
        user,
      });
  } catch (err) {
    return res.send({ status: false, message: err.message });
  }
};

exports.getUsers = async (req, res) => {
  try {
    const users = await User.find(
      {},
      { __v: 0, created_at: 0, updated_at: 0, password: 0 }
    ).lean();

    return res.send({ status: true, users });
  } catch (error) {
    return res.send({ status: false, message: err.message });
  }
};
