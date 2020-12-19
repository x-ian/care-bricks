function onLoadSummaryClinical() {
	loadCurrentPatient();
	loadCurrentEncounter(function() {
		$('#input-label').contents().last().replaceWith("Clinical summary for " + currentPatient.givenname + " " + currentPatient.familyname);
		
		let nodeid = getUrlParam('nodeid');
		let next = nextNodes(jsonFlow, nodeById(jsonFlow, nodeid));
		let newUrl = next.type + ".html?nodeid=" + next.id;

		let div = $('#all-transitions');

		let node = nodeById(jsonFlow, nodeid);

	});
}
