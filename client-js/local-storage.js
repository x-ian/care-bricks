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
		if (patient.hivId === undefined) {
			if (patient.facilityId === undefined) {
				if (patient.id === undefined) {
					$('#header-id').text("ID: " + patient.uuid);
				} else {
					$('#header-id').text("ID: " + patient.id);
				}
			} else {
				$('#header-id').text("ID: " + patient.facilityId);
			}
		} else {
			$('#header-id').text("ID: " + patient.hivId);
		}
		if ((patient.gender === undefined && patient.Sex == 'F') || patient.gender == 'F') {
			$('#header-male').addClass('d-none');
			$('#header-female').removeClass('d-none');		
		} else {
			$('#header-female').addClass('d-none');
			$('#header-male').removeClass('d-none');
		}
		$('#header-birthdate').text(patient.birthdate + " / " + calculateAge(new Date(patient.birthdate)) + " yrs");
		try {
			// malawi address style
			$('#header-currentAddress').text(patient.currentAddress.city + " / " + patient.currentAddress.district+ " / " + patient.currentAddress.state);
		} catch {
			try {
				// liberia address style
				$('#header-currentAddress').text(patient.address.county + " / " + patient.address.city);
			} catch (e) {
				// console.error(e);
			}
		}
	} catch (e) {
		console.error(e);
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
