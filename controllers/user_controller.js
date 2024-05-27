// config/user_controller.js
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
    return res.redirect("/");
  }
};

module.exports.createSession = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      req.flash("error", "Invalid Email or password");
      return res.redirect("/");
    }

    const user = await User.findOne({ email });
    if (!user) {
      req.flash("error", "Invalid Email");
      return res.redirect("/");
    }

    const matchPassword = await bcrypt.compare(password, user.password);
    if (!matchPassword) {
      req.flash("error", "Invalid Password");
      return res.redirect("/");
    }

    const jwtToken = jwt.sign(user.toJSON(), "chatbox", { expiresIn: "30d" });

    req.flash("success", "Logged in successfully");
    return res.render("chat_box", {
      title: "Chat",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        jwtToken,
      },
    });
  } catch (error) {
    console.log(error);
    req.flash("error", "Error in logging In");
    return res.redirect("/");
  }
};


module.exports.createGoogleSession = async (req, res) => {
  try {
    const user = req.user;
    const jwtToken = jwt.sign(user.toJSON(), "chatbox", {
      expiresIn: "30d",
    });

    // Render the profile page after successful login using Google
    return res.render("chat_box", {
      title: "Chat",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        jwtToken,
      },
    });
  } catch (error) {
    console.log(error);
    return res.status(500).render("error_page", {
      title: "Error",
      message: "Error in logging In using Google",
      error,
    });
  }
};

module.exports.forgottenPassword = function (req, res) {
  return res.render("reset_password", {
    title: "Forgot Password",
  });
};
