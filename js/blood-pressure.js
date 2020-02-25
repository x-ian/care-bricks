function statusOfNextButton() {
	if ($('#input-bp-dia').val().length == 0 || $('#input-bp-sys').val().length == 0) {
		$('#navigation-next').prop('disabled', true);
	} else {
		$('#navigation-next').prop('disabled', false);
	}	
}

function onLoadBloodPressure() {
	statusOfNextButton();
	$('#input-bp-sys').on('change', function() {
		statusOfNextButton();
	});
	$('#input-bp-dia').on('change', function() {
		statusOfNextButton();
	});
	
	loadCurrentPatient(function() {
		$('#input-bp-sys').val(currentPatient.currentEncounter.bpSys);
		$('#input-bp-dia').val(currentPatient.currentEncounter.bpDia);
	});
	
}

function buttonClickBloodPressure(e) {
	if (e.target.id.startsWith("bppad-sys-")) {
		document.getElementById('input-bp-sys').value = e.target.id.substring(10);
		statusOfNextButton();
	}
	if (e.target.id.startsWith("bppad-dia-")) {
		document.getElementById('input-bp-dia').value = e.target.id.substring(10);
		statusOfNextButton();
	}
}

function hookNextBloodPressure(e) {
	currentPatient.currentEncounter.bpSys = $('#input-bp-sys').val();
	currentPatient.currentEncounter.bpDia = $('#input-bp-dia').val();
	updateCurrentPatient(currentPatient);
}
