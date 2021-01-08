var patients = new Map([]);

function onLoadPatientsQueue() {
	let nodeid = getUrlParam('nodeid');
	node = nodeById(jsonFlow, nodeid);

	$('#input-label').contents().last().replaceWith(labelFor(node));
	
	patientStorage = $.parseJSON(
	    $.ajax(
	        {
	           url: "/queue/" + node.queueName + "/" + node.queueDateFilter,
	           async: false,
				cache: false,
	           dataType: 'json'
	        }
	    ).responseText
	);

	patientStorage.forEach(p => {
		patients.set(""+p.id, p);
	});
	
	$('#navigation-next').prop('disabled', true);
	let dropdown = $('#patients');
	patients.forEach((entry, key, map) => {
		dropdown.append('<option class=emr-select-option value=' + "" + key + '>' + entry.hivId + " - " + entry.givenname + " " + entry.familyname + " - " + entry.gender + " - " + entry.birthdate + '</option>');
	});
	dropdown.change(function() {
		$('#navigation-next').prop('disabled', false);
	});
}

function hookNextPatientsQueue(e) {
	// console.log($('#patients :selected').val());
	// console.log(patients.get($('#patients :selected').val()));
	updateCurrentPatient(patients.get($('#patients :selected').val()));
	
	loadCurrentEncounter();
	let encounter_type = node.encounterType;
	if (encounter_type === undefined || encounter_type.trim() === '') {
		encounter_type = flowLabelFromSubnode(jsonFlow, getUrlParam('nodeid'));
	}
	currentEncounter["type"] = encounter_type;
	updateCurrentEncounter(currentEncounter);
}
