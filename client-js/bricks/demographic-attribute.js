var name = "";

function statusOfNextButton() {
	$('#navigation-next').prop('disabled', ($('#input').val().length == 0));
}

function onLoadDemographicAttribute() {
	statusOfNextButton();
	processPageDemographicAttribute();

	let nodeid = getUrlParam('nodeid');
	var node = nodeById(jsonFlow, nodeid);
	$('#input-label').contents().last().replaceWith(node.label);
	name = node.name;

	loadCurrentPatient(function() {
		$('#input').val(currentPatient[name]);
	});

	$('.btn').click(function(e) {
		defaultButtonAlphapad(e);
		defaultButtonKeypad(e);
		defaultButtonDatepad(e);
		// defaultButtonBooleanpad(e);
		statusOfNextButton();
	});
	
	$('#input').on("input", function(e) {
		statusOfNextButton();
	});
	$('#input').focus();
}

function hookNextDemographicAttribute(e) {
	currentPatient[name] = $('#input').val();
	updateCurrentPatient(currentPatient);
}
