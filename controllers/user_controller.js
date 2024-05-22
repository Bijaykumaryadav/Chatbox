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

module.exports.forgottenPassword = function (req, res) {
  return res.render("reset_password", {
    title: "Forgot Password",
  });
};
