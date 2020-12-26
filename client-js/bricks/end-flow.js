function onLoadEndFlow() {
	loadCurrentEncounter();
	loadCurrentPatient(function() {
		$('#input-label').contents().last().replaceWith("End current flow - Data summary for " + currentPatient.givenname + " " + currentPatient.familyname);
		$('#summary').append('currentEncounter: <pre>' + JSON.stringify(currentEncounter, null, 2) + '</pre>');
		$('#summary').append('currentPatient: <pre>' + JSON.stringify(currentPatient, null, 2) + '</pre>');
	});

}

function hookFinishEndFlow(e) {
	location = 'flow-select.html';	
}