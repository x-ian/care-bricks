// var p1 = JSON.parse(patient1Json);
// var p2 = JSON.parse(patient2Json);
var checkedInPatients = new Map([
	// [p1.id, p1],
	// [p2.id, p2]
]);

function onLoadCheckedInPatientsList() {
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
		checkedInPatients.set(""+p.id, p);
	});
	
	$('#navigation-next').prop('disabled', true);
	let dropdown = $('#checked-in-patients');
	checkedInPatients.forEach((entry, key, map) => {
		dropdown.append('<option class=emr-select-option value=' + "" + key + '>' + entry.hivId + " - " + entry.givenname + " " + entry.familyname + " - " + entry.gender + " - " + entry.birthdate + '</option>');
	});
	dropdown.change(function() {
		$('#navigation-next').prop('disabled', false);
	});
}

function hookNextCheckedInPatientsList(e) {
	updateCurrentPatient(checkedInPatients.get($('#checked-in-patients :selected').val()));
	let encounter_type = flowLabelFromSubnode(jsonFlow, getUrlParam('nodeid'));
	currentEncounter["type"] = encounter_type;
	updateCurrentEncounter(currentEncounter);	
}
