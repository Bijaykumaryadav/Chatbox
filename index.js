const express = require("express");
const app = express();
const port = 8000;
const layouts = require("express-ejs-layouts");
const passport = require("passport");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const MongoStore = require("connect-mongo");
const flash = require("connect-flash");
const customMware = require("./config/middleware");

// Load environment variables
dotenv.config();

// Initialize database
const db = require("./config/mongoose");

// Initialize Passport strategies
require("./config/passport-jwt-strategy");
require("./config/passport_google_strategy");

// Middleware
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Session middleware
app.use(
  session({
    secret: "chatbox",
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: "mongodb://127.0.0.1/chatbox_db" }),
    cookie: { maxAge: 1000 * 60 * 60 * 24 }, // 1 day
  })
);

// Initialize Passport
app.use(passport.initialize());
app.use(passport.session());

// Flash middleware
app.use(flash());

// Custom middleware for setting flash messages
app.use(customMware.setFlash);

// Set EJS as templating engine
app.set("view engine", "ejs");
app.set("views", "./views");

// Setup the chat server to be used with socket.io
const chatServer = require("http").Server(app);
const chatSockets = require("./config/chat_socket").chatSockets(chatServer);
chatServer.listen(5000);
console.log("Chat server is listening on port: 5000");

// Use static folder
app.use(express.static("./assets"));
app.set("layout extractStyles", true);
app.set("layout extractScripts", true);

// Use routes
app.use("/", require("./routes"));

// Start server
app.listen(port, (err) => {
  if (err) {
    console.log(`Error on the server ${err}`);
  } else {
    console.log(`Server is running on the port ${port}`);
  }
});
