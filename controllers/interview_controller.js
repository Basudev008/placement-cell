const Interview = require("../models/interview");
const Result = require("../models/result");
const Student = require("../models/student");

module.exports.addInterview = function (req, res) {
  return res.render("add_interview", {
    title: "Add Interview",
  });
};

module.exports.create = function (req, res) {
  Interview.create(req.body, function (err, interview) {
    if (err) {
      console.log("error in adding interview", err);
      return;
    }
    console.log(interview);
    return res.redirect("/user");
  });
};

module.exports.home = function (req, res) {
  Interview.findById(req.params.id, function (err, interview) {
    if (err) {
      console.log("Error in finding interview", err);
    }

    Result.find({ interview: interview._id })
      .populate("student")
      .exec(function (err, results) {
        if (err) {
          console.log(
            "Error in finding interview entity in result schema",
            err
          );
          return;
        }

        return res.render("interview_home", {
          title: "Interview Home",
          interview,
          results: results,
        });
      });
  });
};

module.exports.allocateStudent = function (req, res) {
  Interview.findById(req.params.id, function (err, interview) {
    if (err) {
      console.log("Error in finding interview", err);
    }

    return res.render("allocate_student", {
      title: "Allocate Student",
      interview,
    });
  });
};

module.exports.addStudent = function (req, res) {
  Interview.findById(req.body.interview, function (err, interview) {
    if (err) {
      console.log("Error in finding interview", err);
      return;
    }

    Student.findOne({ studentId: req.body.studentId }, function (err, student) {
      if (err) {
        console.log("Error in finding student to be added to interview", err);
        return;
      }

      Result.create(
        {
          interview: req.body.interview,
          student: student,
          resultStatus: req.body.resultStatus,
        },
        function (err, result) {
          if (err) {
            console.log("Error in creating result entry", err);
            return;
          }
          return res.redirect("/interview/" + req.body.interview);
        }
      );
    });
  });
};

module.exports.updateResult = function (req, res) {
  Result.findOneAndUpdate(
    { interview: req.body.interview, student: req.body.student },
    { resultStatus: req.body.resultStatus },
    function (err, result) {
      if (err) {
        console.log("Error in updating result", err);
        return;
      }

      return res.redirect("back");
    }
  );
};

module.exports.deleteInterview = function (req, res) {
  Interview.findById(req.params.id, function (err, interview) {
    interview.remove();
    Result.deleteMany({ interview: interview._id }, function (err) {
      if (err) {
        console.log("Error in deleting interview from result");
        return;
      }
      return res.redirect("back");
    });
  });
};
