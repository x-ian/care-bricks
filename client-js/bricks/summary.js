function onLoadSummary() {
	loadCurrentPatient(function() {
	loadCurrentEncounter(function() {
		$('#input-label').contents().last().replaceWith("Data summary for " + currentPatient.givenname + " " + currentPatient.familyname);
		
		let nodeid = getUrlParam('nodeid');
		let next = nextNodes(jsonFlow, nodeById(jsonFlow, nodeid));
		let newUrl = next.type + ".html?nodeid=" + next.id;

		let div = $('#all-transitions');

		let node = nodeById(jsonFlow, nodeid);
		
		if (node.info === undefined) {
		
			$('#summary').append('<pre>' + JSON.stringify(currentEncounter, null, 2) + '</pre>');
			$('#summary').append('<pre>' + JSON.stringify(currentPatient, null, 2) + '</pre>');
		} else {
			$('#summary').append(node.info);
			// $('#summary').append('<pre>' + node.info + '</pre>');
		}
	});
	});
}
