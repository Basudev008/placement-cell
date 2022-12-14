const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/placement_cell_db");

const db = mongoose.connection;

db.on("error", console.error.bind(console, "Error connecting to MongoDB"));

db.on("open", function () {
  console.log("Connected to Database :: MongoDB");
});

module.exports = db;
