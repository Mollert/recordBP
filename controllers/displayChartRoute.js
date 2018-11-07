
const express = require("express");
const request = require("request");
const router = express.Router();

let greet = require("../public/javascript/postToday.js");

// Retrieve data from database and display send to html
router.get("/displayChart", (req, res) => {
//	console.log(req.body);
/*
	const topHalf = {
		"labels": ["4/18", "4/19", "4/21", "4/22", "4/22", "4/24"],
		"data": ["126", "110", "112", "138", "147", "118"]
	}

	const botHalf = {
		"labels": ["2/27", "2/28", "3/2", "3/2", "3/3", "3/5", "3/10", "3/12"],
		"data": ["88", "90", "72", "80", "68", "96", "77", "74"]
	}

	const hRate = {
		"labels": ["5/23", "5/24", "5/29", "6/1"],
		"data": ["88", "90", "72", "80"]
*/
	let populate = {
		"labels": ["8/9", "8/10", "8/14", "8/14", "8/15", "8/16", "8/16", "8/18", "8/20", "8/21"],
		"data": ["132.8", "133.0", "134.5", "136.2", "132.1", "135.8", "133.7", "135", "134.4", "139"],
		"label": "Weight",
		"goget": "block",
		"reset": "none"
	}
/*
	const heft = {
		"labels": ["8/9", "8/10", "8/14", "8/14", "8/15", "8/16", "8/16", "8/18", "8/20", "8/21"],
		"data": ["132.8", "133.0", "134.5", "136.2", "132.1", "135.8", "133.7", "135", "134.4", "139"]
	}
*/
	res.render("index", {greet, populate});
});

module.exports = router;