
const monthsOfYear = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

// Creates display text according to listed hour
const mornAftNight = (hr)  => {
	if (hr < 12) {
		return "morning"; 
	} else if (hr >= 12 && hr < 18) {
		return "afternoon"; 
	} else {
		return "evening";
	}
}

// Returns various scenario's to descibe time
const currentTime = (hr, min)  => {
	if (min < 10) {
		min = "0" + min;
	}
	if (hr < 12) {
		return (hr + ":" + min + " AM");
	} else if (hr === 12) {
		return (hr + ":" + min + " PM");		
	} else {
		hr = hr - 12;
		return (hr + ":" + min + " PM");		
	}
}

// Get time using Javascript Date library
let dateNow = new Date();
let hour = dateNow.getHours();
let minute = dateNow.getMinutes();
let timeNow = currentTime(hour, minute);
let dayOfMonth = dateNow.getDate();
let end = "";

// Selects day description due to number
if (dayOfMonth === 1 || dayOfMonth === 21 || dayOfMonth === 31) {
	end = "st";
} else if (dayOfMonth === 2 || dayOfMonth === 22) {
	end = "nd";
} else if (dayOfMonth === 3 || dayOfMonth === 23) {
	end = "rd";
} else {
	end = "th";
}

// Creates object to send to website via route
let greet = {
	"periodOfDay": mornAftNight(hour),
	"day": daysOfWeek[dateNow.getDay()],
	"dayOfMonth": dateNow.getDate(),
	"end": end,
	"month": monthsOfYear[dateNow.getMonth()]
}

module.exports = greet;