var db;
db = new Dexie("flows");
db.version(1).stores({
	currentPatient: '[sessionId+flowId+stepId]'
});
db.open();

var currentPatient = null;

var patientStorage = null;
$(function(){
	// this appears to be evil - sync call in main worker
	patientStorage = $.parseJSON(
    $.ajax(
        {
           url: "http://localhost:8000/assets/js/patient-storage.json",
           async: false,
					 cache: false,
           dataType: 'json'
        }
    ).responseText
	);
});

function loadCurrentPatient(callback) {
	db.currentPatient.get({
		"sessionId": 1,
		"flowId": 1,
		"stepId": 1
	}, function(f) {
		currentPatient = f.currentPatient;
		updateHeader(currentPatient);
		if (typeof callback == "function")
			callback();
	});
}

function updateHeader(patient) {
	$('#header-name').text(patient.givenname + " " + patient.familyname);
	$('#header-id').text("ID: " + patient.id);
	if (patient.gender == 'F') {
		$('#header-male').addClass('d-none');
		$('#header-female').removeClass('d-none');		
	} else {
		$('#header-female').addClass('d-none');
		$('#header-male').removeClass('d-none');
	}
	$('#header-birthdate').text(patient.birthdate + " / " + calculateAge(new Date(patient.birthdate)) + " yrs");
	$('#header-currentAddress').text(patient.currentAddress.city + " / " + patient.currentAddress.district+ " / " + patient.currentAddress.state);
}

function calculateAge(birthday) { // birthday is a date
    var ageDifMs = Date.now() - birthday.getTime();
    var ageDate = new Date(ageDifMs); // miliseconds from epoch
    return Math.abs(ageDate.getUTCFullYear() - 1970);
}

function updateCurrentPatient(patient) {
	db.currentPatient.put({
		"sessionId": 1,
		"flowId": 1,
		"stepId": 1,
		"currentPatient": patient
	});
}

// some dummy data for testin

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
