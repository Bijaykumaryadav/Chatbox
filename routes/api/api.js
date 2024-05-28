const express = require("express");
const router = express.Router();
const userApiController = require("../../controllers/user_api_controller");

// Route to get all users
router.get("/data", userApiController.getAllUsers);

module.exports = router;

// http://127.0.0.1:8000/api/data