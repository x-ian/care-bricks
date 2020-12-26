function onLoadCreatePatient() {
	loadCurrentPatient(function() {
		$('#input-label').contents().last().replaceWith("Create Patient and Continue " + currentPatient.givenname + " " + currentPatient.familyname);
		$('#summary').append('currentPatient: <pre>' + JSON.stringify(currentPatient, null, 2) + '</pre>');
	});

}

function hookNextCreatePatient(e) {
	updateCurrentPatient(currentPatient);
	// no encounter, just a patient; assume to create a new one
	$.ajax({
	    type: "POST",
	    url: "/patients/",
	    // The key needs to match your method's input parameter (case-sensitive).
	    data: JSON.stringify(currentPatient),
	    contentType: "application/json; charset=utf-8",
	    dataType: "json",
	    success: function(data){
			updateCurrentPatient(data);
			loadCurrentPatient(function() {
			});
			// alert('Data saved');
			// location = 'flow-select.html';
		},
	    error: function(errMsg) {
	        alert(errMsg);
	    },
		async:false
	});
}
