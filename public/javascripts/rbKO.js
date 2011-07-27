	function rbKO(wtGrowth, wtEarlyCulm, totWT, rbKOGrowth, rbKOEarlyCulm, totrbKO){
		// Alternating cells in the excel chart, to separate wt and rbKO
			var wtHits = [wtGrowth, wtEarlyCulm, totWT];
			var rbKOHits = [rbKOGrowth, rbKOEarlyCulm, totrbKO];
			
			// Values correspond to vegetation, development, and total, which is just the sum of the first two. Constant for all genes.
			var totWT = [3208678, 5720809, 8929487];
			var totrbKO = [3826379, 5811380, 9637759];

			var wtConfLimits = [];
			var rbKOConfLimits = [];
			
			// data set for the wildtype bars
			var d1 = [];
			// data set for the rbKO bars
			var d2 = [];
			// data set for the error bars (with points)
			var d3 = [];
			// The sum of all the hits per million, utilized in creating the normalized values
			var hitsPerMil1 = 0;
			// The sum of the two totals' hits per million; also utilized in creating the normalized values
			var hitsPerMil2 = (1000000 * ((wtHits[2]/totWT[2]) + (rbKOHits[2]/totrbKO[2])));

			for(var i = 0; i < 4; ++i){
				if (i < 2)
				{
					hitsPerMil1 += 1000000 * (wtHits[i]/totWT[i]);
				}
				else
				{
					hitsPerMil1 += 1000000 * (rbKOHits[(i%2)]/totrbKO[(i%2)]);
				}
			} 
			
			// Creating the confidence limit data sets for the wt
			for (var i = 0; i < wtHits.length; i++)
			{
				var lowerConfLim = lowerConfLimit(wtHits[i]);
				var upperConfLim = upperConfLimit(wtHits[i]);
				
				// Hits per million for each piece of data
				lowerConfLim = 1000000 * (lowerConfLim/totWT[i]);
				upperConfLim = 1000000 * (upperConfLim/totWT[i])
				
				// Normalizing values
				if(i == 2)
				{
					lowerConfLim = lowerConfLim/hitsPerMil2;
					upperConfLim = upperConfLim/hitsPerMil2;
				}
				else{
					lowerConfLim = lowerConfLim/hitsPerMil1;
					upperConfLim = upperConfLim/hitsPerMil1;
				}
				
				wtConfLimits.push([lowerConfLim, upperConfLim]);
			}
			
			// Creating the confidence limit data sets for the rbKO
			for (var i = 0; i < rbKOHits.length; i++)
			{
				var lowerConfLim = lowerConfLimit(rbKOHits[i]);
				var upperConfLim = upperConfLimit(rbKOHits[i]);
				
				// Converting to hits per million
				lowerConfLim = 1000000 * (lowerConfLim/totrbKO[i]);
				upperConfLim = 1000000 * (upperConfLim/totrbKO[i])
				
				// Normalizing values
				if(i == 2)
				{
					lowerConfLim = lowerConfLim/hitsPerMil2;
					upperConfLim = upperConfLim/hitsPerMil2;
				}
				else{
					lowerConfLim = lowerConfLim/hitsPerMil1;
					upperConfLim = upperConfLim/hitsPerMil1;
				}

				rbKOConfLimits.push([lowerConfLim, upperConfLim]);
			}
			
			for (var i = 0; i < (wtHits.length + rbKOHits.length) ; ++i){
				if (i < 3)
				{
					if (i == 2)
					{
						var yVal = (1000000 * wtHits[i]/totWT[i])/hitsPerMil2;
					}
					else
					{
						var yVal = (1000000 * (wtHits[i]/totWT[i]))/hitsPerMil1;
					}
					d1.push([((2 * i) + 1), yVal.toFixed(4)]);
					d3.push([((2 * i) + 1), yVal.toFixed(4), (yVal - wtConfLimits[i][0]), (wtConfLimits[i][1] - yVal)]);
				}
				else
				{
					if (i == 5)
					{
						var yVal = (1000000 * rbKOHits[2]/totrbKO[2])/hitsPerMil2;
					}
					else
					{
						var yVal = (1000000 * (rbKOHits[(i%3)]/totrbKO[(i%3)]))/hitsPerMil1;
					}
					d2.push([(2 * ((i%3) + 1)), yVal.toFixed(4)]);
					d3.push([(2 * ((i%3) + 1)), yVal.toFixed(4), (yVal - rbKOConfLimits[i%3][0]), (rbKOConfLimits[i%3][1] - yVal)]);
				}
			}

			jQuery.plot(jQuery("#placeholder"), [
			{
				data: d1,
				label: "WildType",
				lines: {show: false},
				points: {show: false},
				bars: {show: true, align: "center", barWidth: .8}
			},
			{
				data: d2,
				label: "rblA Disruptant",
				lines: {show: false},
				bars: {show: true, align: "center", barWidth: .8}
			},
			{
				data: d3,
				bars: {show: false},
				points: {show: true, errorbars: "y", 
						yerr: {show: true, asymmetric: true, upperCap: "-", lowerCap: "-", color: "rgb(0,0,0)"}},
				lines: {show: false}
			}],
			{
				yaxis: {min: 0, max: 1.1},
				xaxis: {min: 0, max: 7, show: false},
				valueLabels: {show: true},
				grid: {show: false}}
			);
		};