const express = require("express");
const app = express();
const port = 8000;

//for setting up the odm mongoose
const db = require("./config/mongoose");

// This line enables parsing of `x-www-form-urlencoded` data
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
