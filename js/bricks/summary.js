function onLoadSummary() {
	loadCurrentPatient(function() {
		$('#input-label').contents().last().replaceWith("Data summary for " + currentPatient.givenname + " " + currentPatient.familyname);
		$('#summary').append('<pre>' + JSON.stringify(currentPatient, null, 2) + '</pre>');
	});
}
