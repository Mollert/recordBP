
const monthsOfYear = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

let dateNow = new Date();
let day = daysOfWeek[dateNow.getDay()];
let dayOfMonth = dateNow.getDate();
let end = "";

if (dayOfMonth === 1 || dayOfMonth === 21 || dayOfMonth === 31) {
	end = "st";
} else if (dayOfMonth === 2 || dayOfMonth === 22) {
	end = "nd";
} else if (dayOfMonth === 3 || dayOfMonth === 23) {
	end = "rd";
} else {
	end = "th";
}

let month = monthsOfYear[dateNow.getMonth()];
let dateLine = "Today is " + day + " the " + dayOfMonth + end + " of " + month + ".";

document.getElementById("theDate").innerHTML = dateLine;


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

let hour = dateNow.getHours();
let minute = dateNow.getMinutes();
let timeNow = currentTime(hour, minute);

//document.getElementById("theTime").innerHTML = timeNow;


const mornAftNight = (hr)  => {
	if (hr < 12) {
		return "Good morning Ruth."; 
	} else if (hr < 18) {
		return "Good afternoon Ruth."; 
	} else {
		return "Good evening Ruth.";
	}
}

let timeOfDay = mornAftNight(hour);

document.getElementById("theTimeOfDay").innerHTML = timeOfDay;
