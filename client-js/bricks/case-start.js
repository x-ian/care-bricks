function statusOfNextButton() {
	// $('#navigation-next').prop('disabled', ($('#input').val().length == 0));
}

function onLoadCaseStart() {
	// statusOfNextButton();
	// $('.btn').click(function(e) {
	// 	defaultButtonAlphapad(e);
	// 	defaultButtonKeypad(e);
	// 	statusOfNextButton();
	// });
}

function hookNextCaseStart(e) {
	updateCurrentPatient(JSON.parse(emptyPatient));
	// updateCurrentPatient(JSON.parse(`{}`));
}

var emptyPatient = `{
	"id": ""
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

	,"givenname": ""
	,"familyname": ""
	,"birthdate": ""
	,"deathdate": ""
	,"gender": ""

	,"phone": ""
	,"mobile": ""
	,"email": ""

	,"facilityId": ""
	,"nationalId": ""
	,"hivId": ""

	,"guardianName": ""
	,"guardianPhone": ""

	,"birthAddress": {
		"line": [ "" ]
		,"city": ""
		,"district": ""
		,"state": ""
		,"country": ""
	}
	,"currentAddress": {
		"line": [ "" ]
		,"city": ""
		,"district": ""
		,"state": ""
		,"country": ""
	}
	,"currentEncounter": {
	}
}`;
