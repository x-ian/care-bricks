var patientList = new Map([]);

function statusOfNextButton() {
	// $('#navigation-next').prop('disabled', ($('#input').val().length == 0));
}

function onLoadFindPatient() {
	$('#navigation-next').prop('disabled', true);
	statusOfNextButton();
	$('.btn').click(function(e) {
		defaultButtonAlphapad(e);
		defaultButtonKeypad(e);
		statusOfNextButton();
	});
	$('#button-find').click(function(e) {
		patientList.clear();
		patientStorage = $.parseJSON(
		    $.ajax(
		        {
		           url: "/patients?name=" + $('#input').val(),
		           // url: "assets/resources/patient-storage.json",
		           async: false,
					cache: false,
		           dataType: 'json'
		        }
		    ).responseText
		);

		patientStorage.forEach(p => {
			patientList.set(""+p.id, p);
		});
		
		$('#navigation-next').prop('disabled', true);
		let dropdown = $('#patient-list ');
		dropdown.empty();
		let nodeid = getUrlParam('nodeid');
		node = nodeById(jsonFlow, nodeid);
		patientList.forEach((entry, key, map) => {
			if (node.rowcontent) {
				dropdown.append(eval(node.rowcontent));
			} else {
				dropdown.append('<option class=emr-select-option value=' + "" + key + '>' + entry.hivId + " - " + entry.givenname + " " + entry.familyname + " - " + entry.gender + " - " + entry.birthdate + '</option>');
			}
		});

		dropdown.change(function() {
			$('#navigation-next').prop('disabled', false);
		});
		$('#tab-2-link').trigger('click');
	});
}

function hookNextFindPatient(e) {
	updateCurrentPatient(patientList.get($('#patient-list :selected').val()));
	
	let encounter_type = flowLabelFromSubnode(jsonFlow, getUrlParam('nodeid'));
	currentEncounter["type"] = encounter_type;
	updateCurrentEncounter(currentEncounter);	
}
