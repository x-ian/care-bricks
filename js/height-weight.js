function statusOfNextButton() {
	if ($('#input-height').val().length == 0 || $('#input-weight').val().length == 0) {
		$('#navigation-next').prop('disabled', true);
	} else {
		$('#navigation-next').prop('disabled', false);
	}	
}

function onLoadHeightWeight() {
	statusOfNextButton();
	$('#input-weight').on('change', function() {
		statusOfNextButton();
	});
	$('#input-height').on('change', function() {
		statusOfNextButton();
	});
	if (document.getElementById('input-weight-range') != null) {
		document.getElementById('input-weight-range').oninput = function() {
			$('#input-weight').val(document.getElementById('input-weight-range').value);
			statusOfNextButton();
		};
	}
	if (document.getElementById('input-height-range') != null) {
		document.getElementById('input-height-range').oninput = function() {
			$('#input-height').val(document.getElementById('input-height-range').value);
			statusOfNextButton();
		};
	}

	loadCurrentPatient(function() {
		$('#input-height').val(currentPatient.currentEncounter.height);
		$('#input-height-range').val(currentPatient.currentEncounter.height);
		$('#input-weight').val(currentPatient.currentEncounter.weight);
		$('#input-weight-range').val(currentPatient.currentEncounter.weight);
	});
}

function hookNextHeightWeight(e) {
	currentPatient.currentEncounter.height = $('#input-height').val();
	currentPatient.currentEncounter.weight = $('#input-weight').val();
	updateCurrentPatient(currentPatient);
}
