
// Grabing the arrays that where sent by the server
document.getElementById("captureData").addEventListener("click", () => {
	event.preventDefault();

	let freshLabels = document.getElementById("theLabels").innerHTML;
	freshLabels = freshLabels.split(",");
	let freshData = document.getElementById("theData").innerHTML;
	freshData = freshData.split(",");
	let freshLabel = document.getElementById("theLabel").innerHTML;

	// Create a second array of the data, change them  to numbers and get there average 
	let changeToNum = freshData.map(Number);
	let averageNum = (changeToNum.reduce((accum, cv) => {
 		return accum + cv
	}, 0) / changeToNum.length);

	// Exchange each of the data numbers in the array with the average number
	let averageData = changeToNum.map(element => element = averageNum);

	// Get the smallest and largest number in the arrays to create buffer in chart
	let minData = (Math.min(...changeToNum));
	minData = Math.round(minData) - 2;
	let maxData = (Math.max(...changeToNum));
	maxData = Math.round(maxData) + 2;

	// Here we are removing and displaying buttons and showing chart
	document.getElementById("getButton").style.display = "none";
	document.getElementById("resetButton").style.display = "block";	
	document.getElementById("chartArea").removeAttribute("display");

	let ctx = document.getElementById('chartArea').getContext('2d');
	let chart = new Chart(ctx, {
		type: 'line',
		data: {
			labels: freshLabels,
			datasets: [{
				label: freshLabel,
				// "border" is line in chart
				borderColor: "rgb(205, 92, 92)",
				boarderWidth: 4,
				// False just shows line, no shaded area below
				fill: false,
				// Data point features
				pointBackgroundColor: "rgb(205, 92, 92)",
				pointBorderColor: "rgb(205, 92, 92)",				
				pointRadius: 3.4,
				// Curve at data points			
				lineTension: 0.4,
				data: freshData
				}, {
				label: "Average",
				borderColor: "rgb(34, 139, 34)",
				fill: false,
				pointRadius: 0,	
				data: averageData
			}]
 		},
 		options: {
 			layout: {
 				// Space around chart
 				padding: 26
 			},
 			legend: {
 				labels: {
 					fontSize: 18,
  					fontStyle: "bold",					
 					fontColor: "rgb(0, 0, 0)"
 				}
 			},
 			scales: {
 				yAxes: [{
 					type: "linear",
 					// Adds to high and low points to create space on chart
 					ticks: {
 						suggestedMin: minData,
 						suggestedMax: maxData
 					}
 				}]
 			}
 		}
	});
});
