
const express = require("express");
const request = require("request");
const router = express.Router();

let greet = require("../public/javascript/postToday.js");
const vitals = require("../chartData/vitals.js")

// Instantiates the chart axis arrays 
let xAxis = [];
let yAxis = [];

// This array provides the abbreviated months for the charts x axis
const monthsAbbrev = ["Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec"];

// Separates the date from the "time stamp" them translates it to an abbreviated month space day
const convertDate = (base) => {
	let convertMonth = base.slice(5, 7);
	(convertMonth.charAt(0) === "0") ? convertMonth = convertMonth.charAt(1) : convertMonth
	let convertDay = base.slice(8, 10);
	(convertDay.charAt(0) === "0") ? convertDay = convertDay.charAt(1) : convertDay
	return (`${monthsAbbrev[convertMonth-1]} ${convertDay}`);
}

// Checks the "time stamp" and returns either AM or PM 
const isAmPm = (tally) => {
	let grabAmPm = tally.slice(11, 13);
	(grabAmPm.charAt(0) === "0") ? grabAmPm = grabAmPm.charAt(1) : grabAmPm	
	grabAmPm = Number(grabAmPm);
	if (grabAmPm < 12) {
		return "am";
	} else {
		return "pm";
	}
}

// Given one of the four topics and which entry, it adds the date and data into arrays
const loadUpArrays = (subject, ele) => {
	let date = convertDate(vitals[ele].date);
	xAxis.push(date);
	if (subject === "sy") {
		yAxis.push(vitals[ele].systolic);
	} else if (subject === "di") {
		yAxis.push(vitals[ele].diastolic);		
	} else if (subject === "hr") {
		yAxis.push(vitals[ele].heartRate);
	} else if (subject === "wt") {
		yAxis.push(vitals[ele].weight);
	}	
}

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
	//  Main loop.  Looping through to check for valid data
	for ( let i = 0 ; i < howLong ; i++ ) {
		if (chartTime === "ad") {			
			loadUpArrays(chartSub, i);
		} else if (chartTime === "am") {
			let onlyAm = isAmPm(vitals[i].date);
			if (onlyAm === "am") {
				loadUpArrays(chartSub, i);
			}
		} else if (chartTime === "pm") {
			let onlyPm = isAmPm(vitals[i].date);
			if (onlyPm === "pm") {
				loadUpArrays(chartSub, i);
			}
		}
	}
	// Creates the label on the chart (along with average)
	if (chartSub === "sy") {
		label = "Systolic BP";
	} else if (chartSub === "di") {
		label = "Diastolic BP";	
	} else if (chartSub === "hr") {
		label = "Heart Rate";
	} else if (chartSub === "wt") {
		label = "Weight";
	}

	let populate = {
		"labels": xAxis,
		"data": yAxis,
		"label": label,
		"goget": "block",
		"reset": "none"
	};

	res.render("index", {greet, populate});
});

module.exports = router;