
const sysCheck = () => {
	let starter = document.getElementById("systolic");
	let insys = starter.value.trim();
	(insys > 70 && insys < 280) ? (starter.style.backgroundColor = "white") : (starter.style.backgroundColor = "yellow")
}

const diaCheck = () => {
	let starter = document.getElementById("diastolic");		
	let india = starter.value.trim();
	(india > 40 && india < 130) ? (starter.style.backgroundColor = "white") : (starter.style.backgroundColor = "yellow")
}

const hRtCheck = () => {
	let starter = document.getElementById("hRate");
	let inhr = starter.value.trim();
	(inhr > 30 && inhr < 240) ? (starter.style.backgroundColor = "white") : (starter.style.backgroundColor = "yellow")
}

const wghtCheck = () => {
	let starter = document.getElementById("weight");
	let inwt = starter.value.trim();
	(inwt > 60.0 && inwt < 260.0) ? (starter.style.backgroundColor = "white") : (starter.style.backgroundColor = "yellow")
}

document.getElementById("clear").addEventListener("click", function() {
	event.preventDefault();
	document.getElementById("systolic").style.backgroundColor = "white";
	document.getElementById("diastolic").style.backgroundColor = "white";
	document.getElementById("hRate").style.backgroundColor = "white";
	document.getElementById("weight").style.backgroundColor = "white";
	document.getElementById("userData").reset();
});	