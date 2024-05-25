const User = require("../models/user");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

module.exports.userProfile = function (req, res) {
  return res.render("chat_box", {
    title: "Chat",
  });
};

module.exports.SignUp = function (req, res) {
  return res.render("sign_up", {
    title: "Sign Up",
  });
};

module.exports.create = async function (req, res) {
  if (req.body.password !== req.body.confirm_password) {
    return res.redirect("back");
  }
  const user = await User.findOne({ email: req.body.email });
  if (user) {
    return res.redirect("/");
  } else {
    const user = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      token: crypto.randomBytes(16).toString("hex"),
    });
    // await user.save();
    return res.redirect("/");
  }
};

module.exports.createSession = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).send({
        success: false,
        message: "Invalid Email or password",
      });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(402).send({
        success: false,
        message: "Invalid Email",
      });
    }

    const matchPassword = await bcrypt.compare(password, user.password);

    if (!matchPassword) {
      return res.status(401).send({
        success: false,
        message: "Invalid Password",
      });
    }

    const jwtToken = jwt.sign(user.toJSON(), "chatbox", {
      expiresIn: "30d",
    });
    
    // Log user details to the console
    console.log({
      _id: user._id,
      name: user.name,
      email: user.email,
      jwtToken,
    });
    // Render the chat_box view after successful login
    return res.render("chat_box", {
      title: "Chat",
      user: {
        _id: user._id,
        name: user.name,
        email,
        jwtToken,
      },
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error in logging In",
      error,
    });
  }
};

module.exports.forgottenPassword = function (req, res) {
  return res.render("reset_password", {
    title: "Forgot Password",
  });
};
