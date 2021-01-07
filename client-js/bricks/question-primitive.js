var node;
var key;
var label = "";

function statusOfNextButton() {
	$('#navigation-next').prop('disabled', ($('#input').val().length == 0));
}

function onLoadQuestionPrimitive() {
	statusOfNextButton();
	processPageDemographicAttribute();

	let nodeid = getUrlParam('nodeid');
	node = nodeById(jsonFlow, nodeid);
	key = getKey(node);
	label = getLabel(node);
	
	$('#input-label').contents().last().replaceWith(label);

	if (node.scope === 'encounter') {
		loadCurrentPatient();
		loadCurrentEncounter(function() {
			$('#input').val(currentEncounter[key]);
		});
	} else {
		loadCurrentPatient(function() {
			$('#input').val(currentPatient[key]);
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
		currentEncounter[key] = $('#input').val();
		updateCurrentEncounter(currentEncounter);
	} else {
		currentPatient[key] = $('#input').val();
		updateCurrentPatient(currentPatient);
	}
}