function statusOfNextButton() {
	$('#navigation-next').prop('disabled', ($('#input-bp-dia').val().length == 0 || $('#input-bp-sys').val().length == 0));
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
	
	$('.btn').click(function(e) {
		if (e.target.id.startsWith("bppad-sys-")) {
			$('#input-bp-sys').val(e.target.id.substring(10));
			statusOfNextButton();
		}
		if (e.target.id.startsWith("bppad-dia-")) {
			$('#input-bp-dia').val(e.target.id.substring(10));
			statusOfNextButton();
		}
	});
}

function hookNextBloodPressure(e) {
	currentPatient.currentEncounter.bpSys = $('#input-bp-sys').val();
	currentPatient.currentEncounter.bpDia = $('#input-bp-dia').val();
	updateCurrentPatient(currentPatient);
}
