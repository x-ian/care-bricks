var currentPatient = {};
var currentEncounter = {};

function updateCurrentPatient(patient) {
	sessionStorage.removeItem('currentPatient');
	console.log("updateCurrentPatient: " + JSON.stringify(patient));
	currentPatient = patient;
	sessionStorage.setItem('currentPatient', JSON.stringify(patient));
}

function loadCurrentPatient(callback) {
	currentPatient = JSON.parse(sessionStorage.getItem('currentPatient'));
	updateHeader(currentPatient);
	if (typeof callback == "function") {
		// console.log(callback);
		callback();
	}
}

function updateCurrentEncounter(encounter) {
	sessionStorage.removeItem('currentEncounter');
	currentEncounter = encounter;
	sessionStorage.setItem('currentEncounter', JSON.stringify(encounter));
}

function loadCurrentEncounter(callback) {
	currentEncounter = JSON.parse(sessionStorage.getItem('currentEncounter'));
	if (typeof callback == "function") {
		// console.log(callback);
		callback();
	}
}

function updateHeader(patient) {
	try {
		$('#header-name').text(patient.givenname + " " + patient.familyname);
		$('#header-id').text("ID: " + patient.hivId);
		if (patient.gender == 'F') {
			$('#header-male').addClass('d-none');
			$('#header-female').removeClass('d-none');		
		} else {
			$('#header-female').addClass('d-none');
			$('#header-male').removeClass('d-none');
		}
		$('#header-birthdate').text(patient.birthdate + " / " + calculateAge(new Date(patient.birthdate)) + " yrs");
		$('#header-currentAddress').text(patient.currentAddress.city + " / " + patient.currentAddress.district+ " / " + patient.currentAddress.state);
	} catch (e) {
		// console.error(e);
		$('#header-name').text("");
		$('#header-id').text("");
		$('#header-male').addClass('d-none');
		$('#header-female').addClass('d-none');
		$('#header-birthdate').text("");
		$('#header-currentAddress').text("");
	}
}

function calculateAge(birthday) { // birthday is a date
    var ageDifMs = Date.now() - birthday.getTime();
    var ageDate = new Date(ageDifMs); // miliseconds from epoch
    return Math.abs(ageDate.getUTCFullYear() - 1970);
}
