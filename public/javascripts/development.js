function development(hits11, hits12, hits41, hits42, hits81, hits82, hits121, hits121, hits161, hits162, hits201, hits202, hits241, hits242) {
	// Unique to each gene
	var trialHits = [hits11, hits12, hits41, hits42, hits81, hits82, hits121, hits121, hits161, hits162, hits201, hits202, hits241, hits242];
	//var trialHits = [63, 24, 144, 444, 217, 465, 391, 474, 199, 382, 31, 132, 74, 181];
	
	// Found at the very bottom of the graph, constant for all genes
	var allTrialHits = [3248410, 2820853, 4712062, 5373309, 2600425, 4624360, 5129256, 
	3776273, 2429810, 5153928, 1776805, 3816780, 2651815, 5937874];
	
	var confLimits = [];
	var combAllTrialHits = [];
	var combTrialHits = [];
	// d4 will end up holding the finalized data
	var d4 = [];
	var sumHitsPerMil = 0;
	
	// Combining two of the same trials, as the excel chart does
	for(var i = 1; i < trialHits.length; i+= 2){
		combTrialHits.push((trialHits[i]  + trialHits[i -1]));
		combAllTrialHits.push((allTrialHits[i] + allTrialHits[i-1]));
	}
	
	// Finding the sum of the hits per million
	for(var k = 0; k < combTrialHits.length; ++k) {
		sumHitsPerMil += 1000000 * (combTrialHits[k]/combAllTrialHits[k]);
	}
	
	// Calculating confidence limits for each value
	for (var i = 0; i < combTrialHits.length; i+=1)
	{
		var lowerConfLim = lowerConfLimit(combTrialHits[i]);
		var upperConfLim = upperConfLimit(combTrialHits[i]);
		
		// Converting to hits per million
		lowerConfLim = 1000000 * (lowerConfLim/combAllTrialHits[i]);
		upperConfLim = 1000000 * (upperConfLim/combAllTrialHits[i])
		
		// Normalizing values
		lowerConfLim = lowerConfLim/sumHitsPerMil;
		upperConfLim = upperConfLim/sumHitsPerMil;

		confLimits.push([lowerConfLim, upperConfLim]);
	}
	
	// Normalizing data and associating error values
	for (var j = 0; j < combTrialHits.length; ++j) {
		var yVal = (1000000 * (combTrialHits[j]/combAllTrialHits[j]))/sumHitsPerMil;
		d4.push([(4 * j),yVal.toFixed(4), (yVal - confLimits[j][0]), (confLimits[j][1] - yVal)]);
	}
	
	jQuery.plot(jQuery("#placeholder2"), [
	{
		data: d4, 
		points: {show: true, symbol: "diamond", errorbars: false, xerr: {show: null},
		yerr: {show: true, asymmetric: true, upperCap: "-", lowerCap: "-", color: "rgb(0,0,0)"}},
		label: "Gene: cdk1",
		lines: {show: true},
		color:  "rgb(30, 180, 20)"
	}],
	{
		yaxis: {min: 0}, 
		xaxis: {min: 0, autoscaleMargin: .1, tickSize: 4},
		valueLabels: {show: true},
		grid: {hoverable: true}});
};