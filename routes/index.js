const express = require("express");

const router = express.Router();
const homeController = require("../controllers/home_controller");

console.log("router loaded");

router.get("/", homeController.home);
router.use("/user", require("./user"));
router.use("/student", require("./student"));
router.use("/interview", require("./interview"));
router.use("/report", require("./report"));

module.exports = router;
