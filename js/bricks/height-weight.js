function statusOfNextButton() {
	$('#navigation-next').prop('disabled', ($('#input-height').val().length == 0 || $('#input-weight').val().length == 0));
}

function onLoadHeightWeight() {
	statusOfNextButton();
	$('#input-weight').on('change', function() {
		statusOfNextButton();
	});
	$('#input-height').on('change', function() {
		statusOfNextButton();
	});
	$('#input-weight-range').on('input', function() {
		$('#input-weight').val($('#input-weight-range').val()).change();
		statusOfNextButton();
	});
	$('#input-height-range').on('input', function() {
		$('#input-height').val($('#input-height-range').val()).change();
		statusOfNextButton();
	});

	loadCurrentPatient(function() {
		$('#input-height').val(currentPatient.currentEncounter.height).change();
		$('#input-height-range').val(currentPatient.currentEncounter.height).change();
		$('#input-weight').val(currentPatient.currentEncounter.weight).change();
		$('#input-weight-range').val(currentPatient.currentEncounter.weight).change();
	});
}

function hookNextHeightWeight(e) {
	currentPatient.currentEncounter.height = $('#input-height').val();
	currentPatient.currentEncounter.weight = $('#input-weight').val();
	updateCurrentPatient(currentPatient);
}
