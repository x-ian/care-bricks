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
	console.log(checkedInPatients);
	console.log(checkedInPatients.get($('#checked-in-patients :selected').val()));
	updateCurrentPatient(checkedInPatients.get($('#checked-in-patients :selected').val()));
}
