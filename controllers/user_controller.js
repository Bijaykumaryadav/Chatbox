const User = require("../models/user");
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
    const newUser = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    });
    // await newUser.save();
    return res.redirect("/");
  }
};

module.exports.forgottenPassword = function (req, res) {
  return res.render("reset_password", {
    title: "Forgot Password",
  });
};
