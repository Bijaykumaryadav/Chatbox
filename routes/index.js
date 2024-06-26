// routes/index.js
const express = require("express");
const router = express.Router();

const homeController = require("../controllers/home_controller");

router.get("/", homeController.entryPage);
router.use("/users", require("./user"));

//to use api
router.use('/api',require('./api/api'));

module.exports = router;
