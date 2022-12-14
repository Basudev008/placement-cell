const { writeToString } = require("@fast-csv/format");
const Result = require("../models/result");

module.exports.downloadReport = function (req, res) {
  var rows = [];
  const headerRow = [
    "StudentId",
    "StudentName",
    "StudentCollege",
    "Placed_Status",
    "DSA_Score",
    "WebD_Score",
    "React_Score",
    "CompanyName",
    "InterviewDate",
    "ResultStatus",
  ];
  rows.push(headerRow);
  Result.find({})
    .populate("interview")
    .populate("student")
    .exec(function (err, results) {
      if (err) {
        console.log("Error in retrieving results", err);
        return;
      }

      for (let result of results) {
        var row = [];
        row.push(result.student.studentId);
        row.push(result.student.studentName);
        row.push(result.student.studentCollege);
        row.push(result.student.placed_status);
        row.push(result.student.DSA_score);
        row.push(result.student.WebD_score);
        row.push(result.student.React_score);
        row.push(result.interview.companyName);
        row.push(result.interview.interviewDate.toString());
        row.push(result.resultStatus);
        rows.push(row);
      }

      res.setHeader("Content-Type", "text/csv");
      res.setHeader("Content-Disposition", "attachment;filename=report.csv");

      writeToString(rows).then((data) => {
        console.log(data);
        res.end(data);
      });
    });
};
