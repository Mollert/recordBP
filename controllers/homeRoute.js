
const express = require("express");
const request = require("request");
const router = express.Router();
// Aquires functions from postToday for date and time
let dateTime = require("../public/javascript/postToday.js");


// To home page
router.get("/", (req, res) => {
	// Get time using Javascript Date library but subtract 4 hours
	let dateNow = new Date(Date.now() - 14400000);

	// Sends current date to function which creates object to send to website via route
	let greet = dateTime.greetPackage(dateNow);

	// Hides the two buttons for the chart
	let populate = {
		"goget": "none",
		"reset": "none"
	}

 res.render("index", {greet, populate});
});


module.exports = router;