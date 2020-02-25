
var patient1Json = `{
	"id": "1"
	,"type": ""
	,"meta": {
		"workflow": ""
		,"workflowVersion": ""
		,"schemaVersion": ""
		,"revision": ""
		,"guidelinesRevision": ""
		,"contributingStations": [ ]

		,"createdAt": ""
		,"createdBy": ""
		,"updatedAt": ""
		,"updatedBy": ""
	}

	,"givenname": "John"
	,"familyname": "Doe"
	,"birthdate": "1990-01-01"
	,"deathdate": ""
	,"gender": "M"

	,"phone": ""
	,"mobile": "+231888888888"
	,"email": ""

	,"facilityId": ""
	,"nationalId": ""
	,"hivId": ""

	,"guardianName": ""
	,"guardianPhone": ""

	,"birthAddress": {
		"line": [ "" ]
		,"city": "Harper City"
		,"district": "Harper"
		,"state": "Maryland"
		,"country": "Liberia"
	}
	,"currentAddress": {
		"line": [ "" ]
		,"city": "Harper City"
		,"district": "Harper"
		,"state": "Maryland"
		,"country": "Liberia"
	}
	,"currentEncounter": {
	}
}`;

var patient2Json = `{
	"id": "2"
	,"type": ""
	,"meta": {
		"workflow": ""
		,"workflowVersion": ""
		,"schemaVersion": ""
		,"revision": ""
		,"guidelinesRevision": ""
		,"contributingStations": [ ]

		,"createdAt": ""
		,"createdBy": ""
		,"updatedAt": ""
		,"updatedBy": ""
	}

	,"givenname": "Mary"
	,"familyname": "Ellen"
	,"birthdate": "1995-01-01"
	,"deathdate": ""
	,"gender": "F"

	,"phone": ""
	,"mobile": "+231999999999"
	,"email": ""

	,"facilityId": ""
	,"nationalId": ""
	,"hivId": ""

	,"guardianName": ""
	,"guardianPhone": ""

	,"birthAddress": {
		"line": [ "" ]
		,"city": "Harper City"
		,"district": "Harper"
		,"state": "Maryland"
		,"country": "Liberia"
	}
	,"currentAddress": {
		"line": [ "" ]
		,"city": "Harper City"
		,"district": "Harper"
		,"state": "Maryland"
		,"country": "Liberia"
	}
	,"currentEncounter": {
	}
}`;

var p1 = JSON.parse(patient1Json);
var p2 = JSON.parse(patient2Json);
var checkedInPatients = new Map([
  [p1.id, p1],
  [p2.id, p2]
]);

function onLoadCheckedInPatientsList() {
	$('#navigation-next').prop('disabled', true);
  	let dropdown = $('#checked-in-patients');
    checkedInPatients.forEach((entry, key, map) => {
      dropdown.append('<option class=emr-select-option value=' + key + '>' + entry.id + " - " + entry.givenname + " " + entry.familyname + " - " + entry.gender + " - " + entry.birthdate + '</option>');
    });
	dropdown.change (function () {
		$('#navigation-next').prop('disabled', false);
	});
}

function hookNextCheckedInPatientsList(e) {
	updateCurrentPatient(checkedInPatients.get($('#checked-in-patients :selected').val()));
}
