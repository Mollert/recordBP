
document.getElementById("captureData").addEventListener("click", () => {
	event.preventDefault();

	let freshLabels = document.getElementById("theLabels").innerHTML;
	freshLabels = freshLabels.split(",");
	let freshData = document.getElementById("theData").innerHTML;
	freshData = freshData.split(",");
	let freshLabel = document.getElementById("theLabel").innerHTML;	

	console.log(freshLabels);
	console.log(freshData);
	console.log(freshLabel);	

	let changeToNum = freshData.map(Number);
	let averageNum = (changeToNum.reduce((accum, cv) => {
 		return accum + cv
	}, 0) / changeToNum.length);

	let averageData = changeToNum.map(element => element = averageNum);

	console.log(averageData);	

	let minData = (Math.min(...changeToNum));
	minData = Math.round(minData) - 2;
	let maxData = (Math.max(...changeToNum));
	maxData = Math.round(maxData) + 2;

	console.log(minData);
	console.log(maxData);

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
				borderColor: "rgb(205, 92, 92)",
				boarderWidth: 4,
				fill: false,
				pointBackgroundColor: "rgb(205, 92, 92)",
				pointBorderColor: "rgb(205, 92, 92)",				
				pointRadius: 3.4,			
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
 					ticks: {
 						suggestedMin: minData,
 						suggestedMax: maxData
 					}
 				}]
 			}
 		}
	});
});
