const Interview = require("../models/interview");
const Student = require("../models/student");
const User = require("../models/user");

module.exports.profile = function (req, res) {
  var student = null;
  Student.find({}, function (err, students) {
    if (err) {
      console.log("Error in finding students", err);
      return;
    }
    Interview.find({}, function (err, interviews) {
      if (err) {
        console.log("Error in finding interviews", err);
        return;
      }
      console.log(students, interviews);
      return res.render("user_profile", {
        title: "User Profile",
        students: students,
        interviews: interviews,
      });
    });
  });
};

module.exports.signUp = function (req, res) {
  if (req.isAuthenticated()) {
    return res.redirect("/user");
  }
  return res.render("user_sign_up", {
    title: "placement | Sign Up",
  });
};

module.exports.signIn = function (req, res) {
  if (req.isAuthenticated()) {
    return res.redirect("/user");
  }
  return res.render("user_sign_in", {
    title: "placement | Sign In",
  });
};

// get the sign up date
module.exports.create = function (req, res) {
  if (req.body.password != req.body.confirm_password) {
    return res.redirect("back");
  }

  User.findOne({ email: req.body.email }, function (err, user) {
    if (err) {
      console.log("error in finding user");
      return;
    }

    if (!user) {
      User.create(req.body, function (err, user) {
        if (err) {
          console.log("error in creating user while signing up");
          return;
        }

        return res.redirect("/user/sign-in");
      });
    } else {
      return res.redirect("/user/sign-in");
    }
  });
};

// sign in and create a session for the user
module.exports.createSession = function (req, res) {
  return res.redirect("/user");
};

module.exports.destroySession = function (req, res) {
  req.logout(function (err) {
    if (err) {
      console.log(err);
      return next(err);
    }
    return res.redirect("/");
  });
};
