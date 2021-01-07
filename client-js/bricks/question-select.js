var node;
var key;
var label = "";

function onLoadQuestionSelect() {
	$('#navigation-next').prop('disabled', true);
	processPageDemographicAttribute();

	let nodeid = getUrlParam('nodeid');
	node = nodeById(jsonFlow, nodeid);
	key = getKey(node);
	label = getLabel(node);

	$('#input-label').text(label);

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