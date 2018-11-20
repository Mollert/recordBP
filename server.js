
const express = require("express");
const request = require("request");
const exphbs = require("express-handlebars");
const path = require("path");
const bodyParser = require("body-parser");
const mysql = require("mysql");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
const router = express.Router();
const port = process.env.PORT || 4400;

app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname ,"public")));

app.engine("handlebars", exphbs({defaultLayout: "main"}));
app.set("view engine", "handlebars");
app.set("views", path.join(__dirname ,"views"));

const route = require("./controllers/homeRoute.js");
const postData = require("./controllers/saveDataRoute.js");
const getChart = require("./controllers/displayChartRoute.js");

app.use("/", route);
app.use("/", postData);
app.use("/", getChart);

app.listen(port, () => console.log(`Tuned In and Turned On to port ${port}`));
