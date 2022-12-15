const express = require("express");
const cookieParser = require("cookie-parser");
const app = express();
const port = process.env.port || 8000;
const expressLayouts = require("express-ejs-layouts");
const db = require("./config/mongoose");
const session = require("express-session");
const passport = require("passport");
const passportLocal = require("./config/passport-local-strategy");
const MongoStore = require("connect-mongo");

app.use(express.urlencoded());

app.use(cookieParser());

app.use(express.static("./assets"));
app.use(expressLayouts);

app.set("layout extractStyles", true);
app.set("layout extractScripts", true);

// set up the view engine
app.set("view engine", "ejs");
app.set("views", "./views");

// mongo store is used to store the session cookie in the db
app.use(
  session({
    name: "placement-cell",
    secret: "backend",
    saveUninitialized: false,
    resave: false,
    cookie: {
      maxAge: 1000 * 60 * 100,
    },
    store: MongoStore.create(
      {
        mongoUrl:
          process.env.MONGO_URI ||
          "mongodb://localhost:27017/placement_cell_db",
        mongooseConnection: db,
      },
      function (err) {
        console.log(err || "connect-mongodb setup ok");
      }
    ),
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser);

// use express router
app.use("/", require("./routes"));

db.once("open", () => {
  console.log("Connected to MongoDB");
});

app.listen(port, function (err) {
  if (err) {
    console.log(`Error: ${err}`);
  }

  console.log(`Server is running on port: ${port}`);
});
