
const express = require("express");
const request = require("request");
const router = express.Router();

const connection = require("../config/connection.js");

let greet = require("../public/javascript/postToday.js");

// Instantiates the chart axis arrays 
let xAxis = [];
let yAxis = [];

// Retrieve data from database and display send to html
router.post("/displayChart", (req, res) => {
	// These are the result of the chocies made on the website
	const chartSub = req.body.chartSubject;
	const chartTime = req.body.chartTime;	
	const chartDur = req.body.chartDuration;

	xAxis = [];
	yAxis = [];

	let label = "";
	let howLong = 0;
	// Finds the length of time the user wants to see data
	if (chartDur === "Past Week") {
		howLong = 7;
	} else if (chartDur === "Past 2 Weeks") {
		howLong = 14;
	} else if (chartDur === "Past 3 Weeks") {
		howLong = 21;
	}
	// Breaks up long query statment
	let querySelect = "SELECT ("+chartSub+"), month, day, ampm FROM vitals ";
		querySelect += " WHERE timestamp >= DATE(NOW()) - INTERVAL ("+howLong+") DAY";
	// Query's database for elements that fit into time period
	connection.query(querySelect, (error, row, fields) => {
		if (error) {
			console.log(error);
		}
	// Given one of the four topics and which entry, it adds the date and data into arrays
		const loadUpArrays = (subject, ele) => {
			let date = `${row[ele].month} ${row[ele].day}`;
			xAxis.push(date);
			yAxis.push(row[ele][subject]);
		}
	//  Main loop.  Looping through to check for valid data
		for (i = 0 ; i < row.length ; i++) {
			if (!(row[i][chartSub] === "0")) {
				if (chartTime === "ad") {
					loadUpArrays(chartSub, i);
				} else if (chartTime === "am") {
					if (row[i].ampm === "AM") {					
						loadUpArrays(chartSub, i);
					}
				} else if (chartTime === "pm") {
					if (row[i].ampm === "PM") {
						loadUpArrays(chartSub, i);
					}
				}
			}
		}
//		console.log(xAxis);
//		console.log(yAxis);
//		console.log(row);

		// Creates the label on the chart (along with average)
		if (chartSub === "systolic") {
			label = "Systolic BP";
		} else if (chartSub === "diastolic") {
			label = "Diastolic BP";	
		} else if (chartSub === "heartrate") {
			label = "Heart Rate";
		} else if (chartSub === "weight") {
			label = "Weight";
		}
		// Sends information to chartData.js about chart
		let populate = {
			"labels": xAxis,
			"data": yAxis,
			"label": label,
			"goget": "block",
			"reset": "none"
		};
	// Ask the HTML to show what has been created
		res.render("index", {greet, populate});
	});	
});

module.exports = router;