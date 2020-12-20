function onLoadCreateEncounterEnd() {
	loadCurrentEncounter();
	loadCurrentPatient(function() {
		$('#input-label').contents().last().replaceWith("End current flow - Data summary for " + currentPatient.givenname + " " + currentPatient.familyname);
		$('#summary').append('currentEncounter: <pre>' + JSON.stringify(currentEncounter, null, 2) + '</pre>');
		$('#summary').append('currentPatient: <pre>' + JSON.stringify(currentPatient, null, 2) + '</pre>');
	});
}

function hookFinishCreateEncounterEnd(e) {
	updateCurrentEncounter(currentEncounter);
	if (!jQuery.isEmptyObject(currentEncounter)) { 
		// 'normal encounter'
		$.ajax({
		    type: "POST",
		    url: "/patients/" + currentPatient.id + "/encounters/",
		    // The key needs to match your method's input parameter (case-sensitive).
		    data: JSON.stringify(currentEncounter),
		    contentType: "application/json; charset=utf-8",
		    dataType: "json",
		    success: function(data){
				// alert('Data saved');
				location = 'flow-select.html';
			},
		    error: function(errMsg) {
				console.log("errMsg");
				console.log(JSON.stringify(errMsg));
		        alert(errMsg);
		    }
		});
	}
	location = 'flow-select.html';
}
