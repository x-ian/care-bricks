function onLoadEndFlow() {
	loadCurrentPatient(function() {
		$('#input-label').contents().last().replaceWith("End current flow - Data summary for " + currentPatient.givenname + " " + currentPatient.familyname);
		$('#summary').append('<pre>' + JSON.stringify(currentPatient, null, 2) + '</pre>');
	});

}
