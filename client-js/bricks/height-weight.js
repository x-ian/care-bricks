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

	loadCurrentPatient();
	loadCurrentEncounter(function() {
		$('#input-height').val(currentEncounter.height).change();
		$('#input-height-range').val(currentEncounter.height).change();
		$('#input-weight').val(currentEncounter.weight).change();
		$('#input-weight-range').val(currentEncounter.weight).change();
	});
}

function hookNextHeightWeight(e) {
	currentEncounter.height = $('#input-height').val();
	currentEncounter.weight = $('#input-weight').val();
	updateCurrentEncounter(currentEncounter);
}
