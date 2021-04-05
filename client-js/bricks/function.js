function onLoadFunction() {
	loadCurrentPatient(function() {});
	$('#navigation-next').prop('disabled', false);

	let nodeid = getUrlParam('nodeid');
	let next = nextNodes(jsonFlow, nodeById(jsonFlow, nodeid));
	let newUrl = next.type + ".html?nodeid=" + next.id;

	let div = $('#all-transitions');

	$.each(next, function(key, entry) {
		div.append('<div class=row><div class="col text-center"><a class="btn btn-primary text-center" role=button href=' + entry.type + '.html?nodeid=' + entry.id + '>' + entry.type + ' ' + entry.name + '</a></div></div>');
		div.append('<div class=row><div class="col text-center"><hr/></div></div>');
	});

	loadCurrentEncounter(function() {
		let f = nodeById(jsonFlow, nodeid).func;
		eval(f);
		updateCurrentEncounter(currentEncounter);
		$('#eval-result').append('<pre>' + JSON.stringify(currentEncounter, null, 2) + '</pre>');
		$('#eval-result').append('<pre>' + JSON.stringify(currentPatient, null, 2) + '</pre>');
	});
}
