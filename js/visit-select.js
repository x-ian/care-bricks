function onLoadVisitSelect() {
	processPageDemographicAttribute();

	let nodeid = getUrlParam('nodeid');
  var node = nodeById(jsonFlow, nodeid);
	$('#input-label').contents().last().replaceWith(node.label);

	let div = $('#select-entries');

	$.each(node.devices, function (key, entry) {
		div.append('<li class="list-group-item list-group-item-action"><span>' + entry.sid + '</span></li>');
	});
}
