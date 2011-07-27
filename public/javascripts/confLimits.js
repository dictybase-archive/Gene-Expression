function lowerConfLimit(hits) {
	var zVal = 1.959963985;
	var upperP = .975;
	var lowerP = .025;
	
	if (hits < 500)
	{
		if(hits > 0){
			var lowerConfLim = critchi(upperP, (2 * hits))/2;
		}
		else{
			var lowerConfLim = 0;
		}
	}
	else
	{
		var lowerConfLim = hits - (zVal * Math.pow(hits, .5));
	}
	return lowerConfLim;
}
// returns the upper confidence limit from an inputted number of hits
function upperConfLimit(hits) {
	var zVal = 1.959963985;
	var upperP = .975;
	var lowerP = .025;
	
	if (hits < 500)
	{
		if(hits > 0){
			var upperConfLim = critchi(lowerP, (2 * (hits + 1)))/2;
		}
		else{
			var upperConfLim = critchi(lowerP, 2)/2;
		}
	}
	else{
		var upperConfLim = hits + (2 * Math.pow(hits, .5));
	}
	return upperConfLim;
	}