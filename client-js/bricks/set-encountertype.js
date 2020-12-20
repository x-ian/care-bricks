function onLoadSetEncountertype() {
	loadCurrentPatient();
	let nodeid = getUrlParam('nodeid');
	var node = nodeById(jsonFlow, nodeid);
	$('#encounter_type').contents().last().replaceWith(node.encounterType);
}

function hookNextSetEncountertype(e) {
	let nodeid = getUrlParam('nodeid');
	var node = nodeById(jsonFlow, nodeid);
	currentEncounter["type"] = node.encounterType;
	updateCurrentEncounter(currentEncounter);
}
