var node;

function statusOfNextButton() {
	if (node.optional) {
		$('#navigation-next').prop('disabled', false);
	} else {
		$('#navigation-next').prop('disabled', ($('#input').val().length == 0));
	}
}

function onLoadQuestionPrimitive() {
	let nodeid = getUrlParam('nodeid');
	node = nodeById(jsonFlow, nodeid);

	statusOfNextButton();
	processPageDemographicAttribute();

	$('#input-label').text(labelFor(node));	
	
	if (node.scope === 'encounter') {
		loadCurrentPatient();
		loadCurrentEncounter(function() {
			$('#input').val(currentEncounter[keyFor(node)]);
		});
	} else {
		loadCurrentPatient(function() {
			$('#input').val(currentPatient[keyFor(node)]);
		});
	};

	$('.btn').click(function(e) {
		defaultButtonAlphapad(e);
		defaultButtonKeypad(e);
		defaultButtonDatepad(e);
		defaultButtonBooleanpad(e);
		statusOfNextButton();
	});
	
	$('#input').on("input", function(e) {
		statusOfNextButton();
	});
	$('#input').focus();
}

function hookNextQuestionPrimitive(e) {
	if (node.scope === 'encounter') {
		currentEncounter[keyFor(node)] = $('#input').val();
		updateCurrentEncounter(currentEncounter);
	} else {
		currentPatient[keyFor(node)] = $('#input').val();
		updateCurrentPatient(currentPatient);
	}
}