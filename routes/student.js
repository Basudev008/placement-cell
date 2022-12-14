const express = require("express");
const passport = require("passport");
const router = express.Router();

const studentController = require("../controllers/student_controller");
// route to add student
router.get(
  "/add-student",
  passport.checkAuthentication,
  studentController.addStudent
);
router.post(
  "/create-student",
  passport.checkAuthentication,
  studentController.create
);
router.get(
  "/profile/:id",
  passport.checkAuthentication,
  studentController.profile
);
router.get(
  "/delete/:id",
  passport.checkAuthentication,
  studentController.deleteStudent
);

module.exports = router;
