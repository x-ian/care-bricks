var patients = new Map([]);

function onLoadScheduledPatientsList() {
	patientStorage.forEach(p => {
		patients.set(""+p.id, p);
	});
	
	$('#navigation-next').prop('disabled', true);
	let dropdown = $('#scheduled-patients');
	patients.forEach((entry, key, map) => {
		dropdown.append('<option class=emr-select-option value=' + "" + key + '>' + entry.id + " - " + entry.givenname + " " + entry.familyname + " - " + entry.gender + " - " + entry.birthdate + '</option>');
	});
	dropdown.change(function() {
		$('#navigation-next').prop('disabled', false);
	});
}

function hookNextScheduledPatientsList(e) {
	console.log($('#scheduled-patients :selected').val());
	console.log(patients.get($('#scheduled-patients :selected').val()));
	
	updateCurrentPatient(patients.get($('#scheduled-patients :selected').val()));
}
