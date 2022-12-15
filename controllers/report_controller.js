const { writeToString } = require("@fast-csv/format");
const Result = require("../models/result");
const Student = require("../models/student");

// function to download csv report of all the students and their respective interviews and associated result status
module.exports.downloadReport = async function (req, res) {
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
  var students = await Student.find({});

  for (let student of students) {
    var results = await Result.find({ student: student._id })
      .populate("interview")
      .populate("student");

    console.log(results);

    if (results.length == 0) {
      var row = [];
      row.push(student.studentId);
      row.push(student.studentName);
      row.push(student.studentCollege);
      row.push(student.placed_status);
      row.push(student.DSA_score);
      row.push(student.WebD_score);
      row.push(student.React_score);
      row.push("");
      row.push("");
      row.push("");
      console.log(row);
      rows.push(row);
    } else {
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
        var date =
          result.interview.interviewDate.getDate() +
          "-" +
          (result.interview.interviewDate.getMonth() + 1) +
          "-" +
          result.interview.interviewDate.getFullYear();
        row.push(date);
        row.push(result.resultStatus);
        console.log(row);
        rows.push(row);
      }
    }
  }

  console.log(rows);
  res.setHeader("Content-Type", "text/csv");
  res.setHeader("Content-Disposition", "attachment;filename=report.csv");

  writeToString(rows).then((data) => {
    console.log(data);
    res.end(data);
  });
};
