 
const express = require("express");
const request = require("request");
const router = express.Router();

let greet = require("../public/javascript/postToday.js");

let bpData = [];
let whichMessage = 0;
const validateMessage = ["There were no values to be added.", "I am going to add only 1 of the 3 entries.", "I am going to add only 2 of the 3 entries.", "I am going to add all 3 entries."];
	
const firstCheck = (tryme) => {
	return (tryme == "") ? 0 : (isNaN(tryme)) ? 0 : (tryme.charAt(1) === "o" || tryme.charAt(1) === "O") ? 0 : tryme
}
	
const confirmBP = (sys, dia) => {
	if (sys > 70 && sys < 280 && dia > 40 && dia < 130) {
		bpData.push(sys, dia);
		whichMessage++;}
	else { bpData.push(0, 0);}
}
	
const confirmHrate = (hr) => {
	if(hr > 30 && hr < 240) {
		bpData.push(hr);
		whichMessage++;}
	else { bpData.push(0);}			
}

const confirmWeight = (wt) => {
	if(wt > 60.0 && wt < 260.0) {
		bpData.push(wt);
		whichMessage++;}
	else { bpData.push(0);}			
}

// Capture data and save to database
router.post("/saveData", (req, res) => {
	bpData = [];
	whichMessage = 0;

	let systolic = firstCheck(req.body.systolic);
	let diastolic = firstCheck(req.body.diastolic);
	(systolic && diastolic) ? confirmBP(systolic, diastolic) : bpData.push(0, 0)

	let hRate = firstCheck(req.body.hRate);
	(hRate) ? confirmHrate(hRate) : bpData.push(0)

	let weight = firstCheck(req.body.weight);
	(weight) ? confirmWeight(weight) : bpData.push(0)

	let addEntries = {
		"theMessage": validateMessage[whichMessage]
	}

	let populate = {
		"goget": "none",
		"reset": "none"
	}

	res.render("index", {greet, populate, addEntries});
});

module.exports = router;