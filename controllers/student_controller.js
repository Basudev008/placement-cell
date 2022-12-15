const Result = require("../models/result");
const Student = require("../models/student");

//render add student page
module.exports.addStudent = function (req, res) {
  return res.render("add_student", {
    title: "Add Student",
  });
};

// add new student into the database
module.exports.create = function (req, res) {
  var status = false;
  console.log(req.body);
  if (req.body.placed_status === "on") {
    status = true;
  }
  Student.create(
    { ...req.body, placed_status: status },
    function (err, student) {
      if (err) {
        console.log("error in adding student", err);
        return;
      }
      console.log(student);
      return res.redirect("/user");
    }
  );
};

//render student profile page
module.exports.profile = function (req, res) {
  Student.findById(req.params.id, function (err, student) {
    if (err) {
      console.log("Error in finding student", err);
      return;
    }

    Result.find({ student: student._id })
      .populate("interview")
      .exec(function (err, results) {
        if (err) {
          console.log("Error in finding student", err);
          return;
        }

        return res.render("student_profile", {
          title: "Student Profile",
          student,
          results,
        });
      });
  });
};

// delete student from database
module.exports.deleteStudent = function (req, res) {
  Student.findById(req.params.id, function (err, student) {
    student.remove();
    Result.deleteMany({ student: student._id }, function (err) {
      if (err) {
        console.log("Error in deleting student from result");
        return;
      }
      return res.redirect("back");
    });
  });
};
