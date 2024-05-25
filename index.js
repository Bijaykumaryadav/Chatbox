const express = require("express");
const app = express();
const port = 8000;
//for setting up the odm mongoose
const passport = require("passport");
const db = require("./config/mongoose");
// This line enables parsing of `x-www-form-urlencoded` data
//use for session cookie
const session = require("express-session");
const passportJWTStrategy = require("./config/passport-jwt-strategy");

// setup the authentication using google
const googleStrategy = require("./config/passport_google_strategy");

const MongoStore = require("connect-mongo");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");

// Load environment variables
dotenv.config();

// Middleware
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Set EJS as a templating engine
app.set("view engine", "ejs");
app.set("views", "./views");

//for using the static folder and for using any templete folder like this
app.use(express.static("./assets"));

// Note: for the route it should be like this
//for using the route folder
app.use("/", require("./routes"));

// note: In express takes two parameter first one is the specification and second parameter accepts as arrow funcion or simply function

app.listen(port, (err) => {
  try {
    if (port) {
      console.log(`Server is running on the port ${port}`);
    }
  } catch (err) {
    console.log(`Error on the server ${err}`);
  }
});
