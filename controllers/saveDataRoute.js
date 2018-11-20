
const express = require("express");
const request = require("request");
const router = express.Router();

const connection = require("../config/connection.js");

let greet = require("../public/javascript/postToday.js");

let whichMessage = 0;
const validateMessage = ["There were no values to be added.", "I am going to add only 1 of the 3 entries.", "I am going to add only 2 of the 3 entries.", "I am going to add all 3 entries.", "An error accured and no values where added."];

// Checks user input for multiple scenerio's
const firstCheck = (tryme) => {
	return (tryme == "") ? 0 : (isNaN(tryme)) ? 0 : (tryme.charAt(1) === "o" || tryme.charAt(1) === "O") ? 0 : tryme
}

// Checks systolic to make sure it falls within range.  If good, return systolic.  If bad, return 0
const confirmSystolic = (sys) => {
	if (sys > 70 && sys < 280) {
		return sys }
	else { return 0 }
}

// Checks diastolic to make sure it falls within range.  If good, return diastolic.  If bad, return 0
const confirmDiastolic = (dia) => {
	if (dia > 40 && dia < 130) {
		return dia }
	else { return 0 }
}

// Checks heart rate to make sure it falls within range.  If good, load in array and sequence message
const confirmHrate = (hr) => {
	if(hr > 30 && hr < 240) {
		whichMessage++;
		return hr }
	else { return 0 }			
}

// Checks weight to make sure it falls within range.  If good, load in array and sequence message
const confirmWeight = (wt) => {
	if(wt > 60.0 && wt < 260.0) {
		whichMessage++;
		return wt }
	else { return 0 }			
}

// Capture data and save to database
router.post("/saveData", (req, res) => {
	whichMessage = 0;
	// Sends the chocies made on the website to be checked for validity
	let systolic = firstCheck(req.body.systolic);
	systolic = confirmSystolic(systolic);
	let diastolic = firstCheck(req.body.diastolic);
	diastolic = confirmDiastolic(diastolic);

	if (!(systolic === 0) && !(diastolic === 0)) {
		whichMessage ++;			
	} else {
		systolic = 0;
		diastolic = 0;
	}

	let hRate = firstCheck(req.body.hRate);
	hRate = confirmHrate(hRate);

	let weight = firstCheck(req.body.weight);
	weight = confirmWeight(weight);
	// Breaks up long query statment	
	let queryString = "INSERT INTO vitals (systolic, diastolic, heartrate, weight, month, day, ampm) ";
		queryString += "VALUES ("+systolic+", "+diastolic+", "+hRate+", "+weight+", '"+greet.monthAbbrev+"', "+greet.dayOfMonth+", '"+greet.aMpM+"')";
	// Add vitals to the database		
	connection.query(queryString, (error, row, fields) => {
		if (error) {
			whichMessage = 4;
			console.log(error);
		}
	// Sends message to web page giving the number of valid entries
		let addEntries = {
			"theMessage": validateMessage[whichMessage]
		}
	// Hides the two buttons for the chart
		let populate = {
			"goget": "none",
			"reset": "none"
		}
	// Ask the HTML to show what has been created
		res.render("index", {greet, populate, addEntries});
	});
});

module.exports = router;