var patients = new Map([]);

function onLoadPatientsQueue() {
	patientStorage = $.parseJSON(
	    $.ajax(
	        {
	           url: "/patients",
	           // url: "assets/resources/patient-storage.json",
	           async: false,
				cache: false,
	           dataType: 'json'
	        }
	    ).responseText
	);

	patientStorage.forEach(p => {
		patients.set(""+p.id, p);
	});
	
	$('#navigation-next').prop('disabled', true);
	let dropdown = $('#patients');
	patients.forEach((entry, key, map) => {
		dropdown.append('<option class=emr-select-option value=' + "" + key + '>' + entry.id + " - " + entry.givenname + " " + entry.familyname + " - " + entry.gender + " - " + entry.birthdate + '</option>');
	});
	dropdown.change(function() {
		$('#navigation-next').prop('disabled', false);
	});
}

function hookNextPatientsQueue(e) {
	// console.log($('#patients :selected').val());
	// console.log(patients.get($('#patients :selected').val()));
	
	updateCurrentPatient(patients.get($('#patients :selected').val()));
	
	let encounter_type = flowLabelFromSubnode(jsonFlow, getUrlParam('nodeid'));
	currentEncounter["type"] = encounter_type;
	updateCurrentEncounter(currentEncounter);
	
}
