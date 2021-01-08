var keyPrefix;

function statusOfNextButton() {
	$('#navigation-next').prop('disabled', ($('#input-bp-dia').val().length == 0 || $('#input-bp-sys').val().length == 0));
}

function onLoadBloodPressure() {
	let nodeid = getUrlParam('nodeid');
	node = nodeById(jsonFlow, nodeid);
	$('#input-label').text(labelFor(node));	

	keyPrefix = keyFor(node);
	if (!keyPrefix) {
		keyPrefix = "bloodpressure";
	} else {
		keyPrefix += "";
	}

	statusOfNextButton();
	$('#input-bp-sys').on('change', function() {
		statusOfNextButton();
	});
	$('#input-bp-dia').on('change', function() {
		statusOfNextButton();
	});

	loadCurrentPatient();
	loadCurrentEncounter(function() {
		$('#input-bp-sys').val(currentEncounter[keyPrefix + "-sys"]);
		$('#input-bp-dia').val(currentEncounter[keyPrefix + "-dia"]);
	});

	$('.btn').click(function(e) {
		if (e.target.id.startsWith("bppad-sys-")) {
			$('#input-bp-sys').val(e.target.id.substring(10));
			statusOfNextButton();
		}
		if (e.target.id.startsWith("bppad-dia-")) {
			$('#input-bp-dia').val(e.target.id.substring(10));
			statusOfNextButton();
		}
	});
}

function hookNextBloodPressure(e) {
	currentEncounter[keyPrefix + "-sys"] = $('#input-bp-sys').val();
	currentEncounter[keyPrefix + "-dia"] = $('#input-bp-dia').val();
	updateCurrentEncounter(currentEncounter);
}
