
	let bpData = [];
	let whichMessage = 0;
	const validateMessage = ["There were no values to be added.", "I am going to add only 1 of the 3 entries.", "I am going to add only 2 of the 3 entries.", "I am going to add all 3 entries."];
	
	const firstCheck = (tryme) => {
		return (tryme == "") ? 0 : (isNaN(tryme)) ? 0 : (tryme.charAt(1) === "o" || tryme.charAt(1) === "O") ? 0 : tryme
	}
	
	const confirmBP = (sys, dia) => {
/*		let slength = sys.length;
		let dlength = dia.length;
		if(slength > 1 && slength < 4 && dlength > 1 && dlength < 4) {  */
		if (sys > 70 && sys < 280 && dia > 40 && dia < 130) {
			bpData.push(sys, dia);
			whichMessage++;}
		else { bpData.push(0, 0);}
	}
	
	const confirmHrate = (hr) => {
/*		let hrlength = hr.length;
		if(hrlength > 1 && hrlength < 4) {  */
		if(hr > 30 && hr < 240) {
			bpData.push(hr);
			whichMessage++;}
		else { bpData.push(0);}			
	}

	const confirmWeight = (wt) => {
/*		let wtlength = wt.toString().length;
		if(wtlength > 2 && wtlength < 6) {  */
		if(wt > 60.0 && wt < 260.0) {
			bpData.push(wt);
			whichMessage++;}
		else { bpData.push(0);}			
	}
	
	document.getElementById("submit").addEventListener("click", function() {
		event.preventDefault();
		
		let systolic = firstCheck(document.getElementById("systolic").value.trim());
		let diastolic = firstCheck(document.getElementById("diastolic").value.trim());
		(systolic && diastolic) ? confirmBP(systolic, diastolic) : bpData.push(0, 0)
		let hRate = firstCheck(document.getElementById("hRate").value.trim());
		(hRate) ? confirmHrate(hRate) : bpData.push(0)
		let weight = firstCheck(document.getElementById("weight").value.trim());
		(weight) ? confirmWeight(weight) : bpData.push(0)		
		
		document.getElementById("valMessage").innerHTML = validateMessage[whichMessage];
	});

	document.getElementById("clear").addEventListener("click", function() {
		event.preventDefault();
		bpData = [];
		whichMessage = 0;
		document.getElementById("systolic").style.backgroundColor = "white";
		document.getElementById("diastolic").style.backgroundColor = "white";
		document.getElementById("hRate").style.backgroundColor = "white";
		document.getElementById("weight").style.backgroundColor = "white";				
		document.getElementById("userData").reset();
		document.getElementById("valMessage").innerHTML = "";
	});	
