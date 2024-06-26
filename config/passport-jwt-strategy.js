//config/passport-jwt-strategy.js
const passport = require("passport");
const JWTStrategy = require("passport-jwt").Strategy;
const ExtractJWT = require("passport-jwt").ExtractJwt;

const User = require("../models/user");

let opts = {
  jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
  secretOrKey: "chatbox",
};

passport.use(
  new JWTStrategy(opts, async function (jwtPayload, done) {
    let user = await User.findById(jwtPayload._id);

    try {
      if (user) {
        return done(null, user);
      }
      return done(null, false);
    } catch (err) {
      console.log("Error in finding user by the help of JWT", err);
    }
  })
);

module.exports = passport;
