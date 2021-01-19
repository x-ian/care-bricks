function onLoadSwitch() {
	let nodeid = getUrlParam('nodeid');
	let next = nextNodes(jsonFlow, nodeById(jsonFlow, nodeid));
	let newUrl = next.type + ".html?nodeid=" + next.id;

	let div = $('#all-transitions');

	let node = nodeById(jsonFlow, nodeid);
	loadCurrentPatient();
	loadCurrentEncounter();
	
		var i = 0;
		$.each(next, function(key, entry) {
			try {
				if ((node.rules[i].v) == '') {
					div.append('<div class=row><div class="col text-center"><a class="btn btn-primary text-center" role=button href=' + entry.type + '.html?nodeid=' + entry.id + '>' + entry.type + ' ' + entry.name + '</a> (no rule specified in workflow)' + '</div></div>');	
				} else {
					// eval(node.rules[i].v)
					div.append('<div class=row><div class="col text-center"><a class="btn btn-primary text-center" role=button href=' + entry.type + '.html?nodeid=' + entry.id + '>' + entry.type + ' ' + entry.name + '</a> ' + node.rules[i].v + ' (' + eval(node.rules[i].v) + ')' + '</div></div>');
				}
			} catch (e) {
				div.append('<div class=row><div class="col text-center"><a class="btn btn-primary text-center" role=button href=' + entry.type + '.html?nodeid=' + entry.id + '>' + node.rules[i].v + '</a> Next: ' + entry.name + ' (Error: ' + e.message + ')</div></div>');
			}
			div.append('<div class=row><div class="col text-center"><hr/></div></div>');
			i++;
		});

		$('#navigation-next').prop('disabled', true);
	$('#input-label').text(node.name);
}
