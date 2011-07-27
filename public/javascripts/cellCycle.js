function cellCycle(asynchHits, t1, t01, t1, t11, t12, t2, t3, t31, t4, t5, t61, t65, t71, t8, t9, t10, t11, t12){
	// Unique to each gene
	var dataTimes = [asynchHits, t1, t01, t1, t11, t12, t2, t3, t31, t4, t5, t61, t65, t71, t8, t9, t10, t11, t12];
	
	// Constant for all genes
	var xVals = [-1, 0, 1, 3, 5.5, 8, 11]
	var chartDataTotals = [4849631, 3342896, 2060722, 2755790, 1312264, 5289980, 2110911, 1944835, 
	768136, 2503229, 2107712, 2865788, 6337311, 5048324, 3743486, 4092571, 3226994, 2312884, 5185030];
	
	var sumHitsPerMil = 0; 
	d5 = [];
	var confLimits = [];
	
	// Creating arrays which hold the added values as specified by the chart
	var graphData = [dataTimes[0], (dataTimes[1] + dataTimes[2]), (dataTimes[3] + dataTimes[4]), 
	(dataTimes[6] + dataTimes[7] + dataTimes[8]  + dataTimes[9]), (dataTimes[10] + dataTimes[11] + dataTimes[12]), 
	(dataTimes[13] + dataTimes[14] + dataTimes[15]), (dataTimes[16] + dataTimes[17] + dataTimes[18])];
	
	var graphDataTotals = [chartDataTotals[0], (chartDataTotals[1] + chartDataTotals[2]), (chartDataTotals[3] + chartDataTotals[4]), 
	(chartDataTotals[6] + chartDataTotals[7] + chartDataTotals[8]  + chartDataTotals[9]), 
	(chartDataTotals[10] + chartDataTotals[11] + chartDataTotals[12]), 
	(chartDataTotals[13] + chartDataTotals[14] + chartDataTotals[15]), 
	(chartDataTotals[16] + chartDataTotals[17] + chartDataTotals[18])];
	
	// Calculating the sum of the hits per million values
	for(var i = 0; i < graphData.length; ++i) {
		sumHitsPerMil += 1000000 * (graphData[i]/graphDataTotals[i]);
	}
	
	// Calculating confidence limits for each value
	for(var i = 0; i < graphData.length; ++i){
		var lowerConfLim = lowerConfLimit(graphData[i]);
		var upperConfLim = upperConfLimit(graphData[i]);
		
		lowerConfLim = 1000000 * (lowerConfLim/graphDataTotals[i]);
		upperConfLim = 1000000 * (upperConfLim/graphDataTotals[i]);
		
		lowerConfLim = lowerConfLim/sumHitsPerMil;
		upperConfLim = upperConfLim/sumHitsPerMil;
		
		confLimits.push([lowerConfLim, upperConfLim])
		
	}
	
	for(var j = 0; j < graphData.length; ++j) {
		var yVal = (1000000 * (graphData[j]/graphDataTotals[j]))/sumHitsPerMil;
		d5.push([xVals[j], yVal.toFixed(4), (yVal - confLimits[j][0]), (confLimits[j][1] - yVal)]);
	}
	
	jQuery.plot(jQuery("#placeholder3"), [
	{
		data: d5, 
		points: {show: true, errorbars: "y", xerr: {show: null},
				yerr: {show: true, asymmetric: true, upperCap: "-", lowerCap: "-", color: "rgb(0,0,0)" }},
		lines: {show: true},
		color: "rgb(102, 0, 153)",
		label: "Gene: cdk1"
	}],
	{xaxis: {min: 0, max: 15},
	valueLabels: {show: true},
	grid: {hoverable: true}});
};