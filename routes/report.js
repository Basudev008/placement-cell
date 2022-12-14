const express = require("express");
const passport = require("passport");
const router = express.Router();

const reportController = require("../controllers/report_controller");
// route to add student
router.get(
  "/download",
  passport.checkAuthentication,
  reportController.downloadReport
);

module.exports = router;
