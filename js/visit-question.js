function onLoadVisitQuestion() {
	processPageDemographicAttribute();

	let nodeid = getUrlParam('nodeid');
  var node = nodeById(jsonFlow, nodeid);
	$('#input-label').contents().last().replaceWith(node.label);
}

function buttonClickVisitQuestion(e) {
	defaultButtonAlphapad(e);
	defaultButtonKeypad(e);
	defaultButtonDatepad(e);
	// defaultButtonBooleanpad(e);
}
