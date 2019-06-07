
const monthsOfYear = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const monthsAbbrev = ["Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec"];
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

// Selects day description due to number
const tailEnd = (whatDay) => {
	if (whatDay === 1 || whatDay === 21 || whatDay === 31) {
		return "st";
	} else if (whatDay === 2 || whatDay === 22) {
		return "nd";
	} else if (whatDay === 3 || whatDay === 23) {
		return "rd";
	} else {
		return "th";
	}
}

// Returns either AM or PM
const isAmPm = (guide) => {
	if (guide < 12) {
		return "AM";
	} else {
		return "PM";
	}
}

// Creates object to send to website via route
let greetPackage = (rightNow) => {
	return {
	"periodOfDay": mornAftNight(rightNow.getHours()),	
	"day": daysOfWeek[rightNow.getDay()],
	"dayOfMonth": rightNow.getDate(),
	"end": tailEnd(rightNow.getDate()),
	"month": monthsOfYear[rightNow.getMonth()]
	};
}


module.exports = { monthsOfYear, monthsAbbrev, daysOfWeek, mornAftNight, tailEnd, isAmPm, greetPackage };