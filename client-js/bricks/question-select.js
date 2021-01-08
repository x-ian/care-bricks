var node;

function onLoadQuestionSelect() {
	$('#navigation-next').prop('disabled', true);
	processPageDemographicAttribute();

	let nodeid = getUrlParam('nodeid');
	node = nodeById(jsonFlow, nodeid);

	$('#input-label').text(labelFor(node));

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

function hookNextQuestionSelect(e) {
	key = getKey(node);
	if (node.scope === 'encounter') {
		currentEncounter[key + "_val"] = $('#select-entries :selected').val();
		currentEncounter[key + "_text"] = $('#select-entries :selected').text();
		updateCurrentEncounter(currentEncounter);
	} else {
		currentPatient[key + "_val"] = $('#select-entries :selected').val();
		currentPatient[key + "_text"] = $('#select-entries :selected').text();
		updateCurrentPatient(currentPatient);
	}	
}