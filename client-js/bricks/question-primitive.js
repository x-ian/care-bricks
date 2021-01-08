var node;

function statusOfNextButton() {
	$('#navigation-next').prop('disabled', ($('#input').val().length == 0));
}

function onLoadQuestionPrimitive() {
	statusOfNextButton();
	processPageDemographicAttribute();

	let nodeid = getUrlParam('nodeid');
	node = nodeById(jsonFlow, nodeid);
	$('#input-label').text(labelFor(node));	

	if (node.scope === 'encounter') {
		loadCurrentPatient();
		loadCurrentEncounter(function() {
			$('#input').val(currentEncounter[getKey(node)]);
		});
	} else {
		loadCurrentPatient(function() {
			$('#input').val(currentPatient[getKey(node)]);
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
		currentEncounter[getKey(node)] = $('#input').val();
		updateCurrentEncounter(currentEncounter);
	} else {
		currentPatient[getKey(node)] = $('#input').val();
		updateCurrentPatient(currentPatient);
	}
}