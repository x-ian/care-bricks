function onLoadCreatePatientEnd() {
	loadCurrentPatient(function() {
		$('#input-label').contents().last().replaceWith("End current flow - Data summary for " + currentPatient.givenname + " " + currentPatient.familyname);
		$('#summary').append('currentPatient: <pre>' + JSON.stringify(currentPatient, null, 2) + '</pre>');
	});

}

function hookFinishCreatePatientEnd(e) {
	updateCurrentPatient(currentPatient);
	// no encounter, just a patient; assume to create a new one
/*
	$.ajax({
	    type: "POST",
	    url: "/patients/",
	    // The key needs to match your method's input parameter (case-sensitive).
	    data: JSON.stringify(currentPatient),
	    contentType: "application/json; charset=utf-8",
	    dataType: "json",
	    success: function(data){
			// alert('Data saved');
			// location = 'flow-select.html';
		},
	    error: function(errMsg) {
			console.log("errMsg");
			console.log(JSON.stringify(errMsg));
	        alert(errMsg);
	    }
	});
*/
	doAjax().then( location = '/' );
	/*
	await $.ajax({
	    type: "POST",
	    url: "/patients/",
	    // The key needs to match your method's input parameter (case-sensitive).
	    data: JSON.stringify(currentPatient),
	    contentType: "application/json; charset=utf-8",
	    dataType: "json"
	});
*/
	// location = '/';
}

async function doAjax(args) {
    let result;

    try {
        result = await $.ajax({
	    type: "POST",
	    url: "/patients/",
	    // The key needs to match your method's input parameter (case-sensitive).
	    data: JSON.stringify(currentPatient),
	    contentType: "application/json; charset=utf-8",
	    dataType: "json",
		async:false
	});

        return result;
    } catch (error) {
        console.error(error);
    }
}