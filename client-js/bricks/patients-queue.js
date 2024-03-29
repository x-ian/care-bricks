var patients = new Map([]);

function dateString() {
	var d = new Date();

	var date = d.getDate();
	if (date < 10) {
	    date = "0" + date;
	}
	var month = d.getMonth() + 1;
	if (month < 10) {
	    month = "0" + month;
	}
	var year = d.getFullYear();		
	return "" + year + "" + month + "" + date;
}

function onLoadPatientsQueue() {
	let nodeid = getUrlParam('nodeid');
	node = nodeById(jsonFlow, nodeid);

	$('#input-label').contents().last().replaceWith(labelFor(node));
	var d = node.queueDateFilter;
	if (d === undefined || d === '') {
		d = dateString(); // + '%2000:00:00';
	}
	patientStorage = $.parseJSON(
	    $.ajax(
	        {
	           url: "/queue/encountertype?encountertype_filter=" + node.queueName + "&encountertype_exclude=" + node.encounterType+ "&date=" + d,
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
		if (node.rowcontent) {
			dropdown.append(eval(node.rowcontent));
		} else {
			dropdown.append('<option class=emr-select-option value=' + "" + key + '>' + entry.hivId + " - " + entry.givenname + " " + entry.familyname + " - " + entry.gender + " - " + entry.birthdate + '</option>');
		}
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
