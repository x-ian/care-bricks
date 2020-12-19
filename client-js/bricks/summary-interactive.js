function onLoadSummaryInteractive() {
	loadCurrentPatient();
	loadCurrentEncounter(function() {
		$('#input-label').contents().last().replaceWith("Interactive Data summary for " + currentPatient.givenname + " " + currentPatient.familyname);
		
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
		
		console.log(node.buttons);
		for (const button of node.buttons) {
			let buttonHtml = '<button class="btn btn-primary active btn-success" id="navigation-next" type="button"><span class="emr-icon">' + button.name + '</span><i class="fa fa-angle-right"></i></button><br/>';
			$('#buttons').append(buttonHtml);
		}
	});
}
