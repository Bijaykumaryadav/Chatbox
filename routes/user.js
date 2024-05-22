const express = require("express");
const router = express.Router();

const userController = require("../controllers/user_controller");

router.get("/profile", userController.userProfile);
router.get("/sign-up", userController.SignUp);
router.post("/create",userController.create);
router.get("/forgotten-password", userController.forgottenPassword);

module.exports = router;
