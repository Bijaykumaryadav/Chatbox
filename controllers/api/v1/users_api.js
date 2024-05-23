const User = require("../../../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const env = require("../../../config/environment");

module.exports.createSession = async function (req, res) {
  try {
    let user = await User.findOne({ email: req.body.email });

    if (!user) {
      return res.status(422).json({
        message: "Invalid User",
      });
    }

    const isPasswordValid = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!isPasswordValid) {
      return res.status(422).json({
        message: "Invalid Password",
      });
    }

    const token = jwt.sign(
      user.toJSON(),
      process.env.JWT_SECRET_OR_KEY || env.jwt_secret_or_key,
      {
        expiresIn: "100000s", // expiresIn accepts strings like '100000s' for seconds
      }
    );

    return res.status(200).json({
      message: "Sign In Successfully!!",
      data: {
        token: token,
      },
    });
  } catch (err) {
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};
