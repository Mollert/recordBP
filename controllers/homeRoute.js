
const express = require("express");
const request = require("request");
const router = express.Router();

let greet = require("../public/javascript/postToday.js");

// To home page
router.get("/", (req, res) => {

	let populate = {
		"goget": "none",
		"reset": "none"
	}

 res.render("index", {greet, populate});
});


module.exports = router;