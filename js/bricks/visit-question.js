var name = "";

function statusOfNextButton() {
	$('#navigation-next').prop('disabled', ($('#input').val().length == 0));
}

function onLoadVisitQuestion() {
	statusOfNextButton();
	processPageDemographicAttribute();

	let nodeid = getUrlParam('nodeid');
	var node = nodeById(jsonFlow, nodeid);
	$('#input-label').contents().last().replaceWith(node.label);
	name = node.name;

	loadCurrentPatient(function() {
		$('#input').val(currentPatient.currentEncounter[name]);
	});

	$('.btn').click(function(e) {
		defaultButtonAlphapad(e);
		defaultButtonKeypad(e);
		defaultButtonDatepad(e);
		// defaultButtonBooleanpad(e);
		statusOfNextButton();
	});
}

function hookNextVisitQuestion(e) {
	currentPatient.currentEncounter[name] = $('#input').val();
	updateCurrentPatient(currentPatient);
}
