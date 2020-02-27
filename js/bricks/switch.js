function onLoadSwitch() {
	let nodeid = getUrlParam('nodeid');
	let next = nextNodes(jsonFlow, nodeById(jsonFlow, nodeid));
	let newUrl = next.type + ".html?nodeid=" + next.id;

	let div = $('#all-transitions');

	let node = nodeById(jsonFlow, nodeid);
	loadCurrentPatient(function() {

		console.log(nodeById(jsonFlow, nodeid));
		var i = 0;
		$.each(next, function (key, entry) {
			div.append('<div class=row><div class="col text-center"><a class="btn btn-primary text-center" role=button href=' + entry.type + '.html?nodeid=' + entry.id  + '>' + entry.type + ' ' + entry.name + '</a> ' + node.rules[i].v + ' (' + eval(node.rules[i].v) + ')' + '</div></div>');
			div.append('<div class=row><div class="col text-center"><hr/></div></div>');
			i++;
		});
		
	});
	$('#navigation-next').prop('disabled', true);
	$('#input-label').text('Switch node for node: ' + node.name);
}
