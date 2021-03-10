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
	
	var careflowConfig = '';
	switch (careflowConfig) {
		case 'ghii':
			updateHeaderGhii(patient);
			break;
		case 'malawi':
			break;
		default:
			console.log("Unknown config " + careflowConfig + ". Using default");
			updateHeaderDefault(patient);
			break;
	}
}

function updateHeaderGhii(patient) {
		$('emr-header').empty();
		$('emr-header').append(
	`<header class="emr-header">
	    <div class="emr-header-element emr-header-element__name"><span id="header-name"></span></div>
	    <div class="emr-header-element">
	        <div><span id="header-birthdate"></span></div>
	    </div>
	    <div class="emr-header-element"><span id="header-id"></span></div>
	</header>
	`);
	try {
		$('#header-name').text(patient.Name);
		if (patient['Health ID'] === undefined) {
			$('#header-id').text("ID: " + patient.id);
		} else {
			$('#header-id').text("Health ID: " + patient['Health ID']);
		}
		$('#header-birthdate').text(patient.Age_text);
	} catch (e) {
		console.error(e);
	}
}

function updateHeaderDefault(patient) {
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
