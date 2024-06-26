//initialize the app

const express = require("express");
const ErrorHandler = require("./utils/errorHandler");
const app = express();
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
//CORS POLICY GLOBALLY
const cors = require("cors");
//const fileUpload = require("express-fileupload");

app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use("/", express.static("uploads"));
app.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));
//app.use(fileUpload({ useTempFiles: true }));
//config

if (process.env.NODE_ENV !== "PRODUCTION") {
  require("dotenv").config({
    path: "backend/config/.env",
  });
}
// import routes
const user = require("./controller/user");
app.use("/api/v2/user", user);

//errorhandling
app.use(ErrorHandler);

module.exports = app;
