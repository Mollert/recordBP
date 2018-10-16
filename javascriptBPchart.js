
	document.getElementById("submit").addEventListener("click", function() {
		event.preventDefault();
		console.log("This is grabbing something");

		let stateGroup = [];
		let yearGroup = [];
		let allData = document.getElementsByClassName("inTheBox");
		for (let i = 2 ; i < 14 ; i++) {

			if ( i % 2 === 0 ) {
				stateGroup.push(allData[i-2].value);	
			} else {
				yearGroup.push(allData[i-2].value);		
			}
			}
		console.log(allData);						
		console.log(stateGroup);
		console.log(yearGroup);

		let ctx = document.getElementById('bpChart').getContext('2d');
		let chart = new Chart(ctx, {
		    // The type of chart we want to create
			type: 'line',
		    // The data for our dataset
		    data: {
/*				labels: ["January", "February", "March", "April", "May", "June", "July"],
	      	  datasets: [{
				label: "My First dataset",
				backgroundColor: 'rgb(255, 99, 132)',
				borderColor: 'rgb(255, 99, 132)',
				data: [0, 10, 5, 2, 20, 30, 45],
	        	}]
*/
				labels: stateGroup,
				datasets: [{
					label: "Years these states joined the union.",
					data: yearGroup
				}]
 			},
		    // Configuration options go here
 			options: {}
		});
	});
