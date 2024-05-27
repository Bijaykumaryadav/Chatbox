// routes/user.js
const express = require("express");
const passport = require("passport");
const router = express.Router();

const userController = require("../controllers/user_controller");

router.get("/sign-up", userController.SignUp);
router.post("/create", userController.create);
router.get("/profile", userController.userProfile);
router.post("/create-session", userController.createSession);
router.get("/forgotten-password", userController.forgottenPassword);

router.get("/auth/google", passport.authenticate("google", { scope: ["email", "profile"] }));
router.get(
  "/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/" }),
  userController.createGoogleSession
);

module.exports = router;
