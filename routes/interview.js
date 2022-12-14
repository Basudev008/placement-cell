const express = require("express");
const passport = require("passport");
const router = express.Router();

const interviewController = require("../controllers/interview_controller");

router.get(
  "/add-interview",
  passport.checkAuthentication,
  interviewController.addInterview
);
router.post(
  "/create-interview",
  passport.checkAuthentication,
  interviewController.create
);
router.get("/:id", passport.checkAuthentication, interviewController.home);
router.post(
  "/add-student",
  passport.checkAuthentication,
  interviewController.addStudent
);
router.post(
  "/update-result",
  passport.checkAuthentication,
  interviewController.updateResult
);
router.get(
  "/:id/allocate-student",
  passport.checkAuthentication,
  interviewController.allocateStudent
);
router.get(
  "/delete/:id",
  passport.checkAuthentication,
  interviewController.deleteInterview
);

module.exports = router;
