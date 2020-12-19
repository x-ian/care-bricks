var name = "";

function onLoadVisitSelect() {
	$('#navigation-next').prop('disabled', true);
	processPageDemographicAttribute();

	let nodeid = getUrlParam('nodeid');
	var node = nodeById(jsonFlow, nodeid);
	$('#input-label').contents().last().replaceWith(node.label);
	name = node.name;

	let dropdown = $('#select-entries');
	$.each(node.devices, function(key, entry) {
		dropdown.append('<option class=emr-select-option value=' + key + '>' + entry.sid + '</option>');
	});
	dropdown.change(function() {
		$('#navigation-next').prop('disabled', false);
	});

	loadCurrentPatient();
	loadCurrentEncounter();
	// loadCurrentPatient(function() {
		// select element from encounter
		// $('#select-entries :selected').val()
		// $('#input').val(currentPatient.currentEncounter[name]);
	// });
}

function hookNextVisitSelect(e) {
	currentEncounter[name + "_val"] = $('#select-entries :selected').val();
	currentEncounter[name + "_text"] = $('#select-entries :selected').text();
	updateCurrentEncounter(currentEncounter);
	// updateCurrentPatient(currentPatient);
}
