var name = "";

function onLoadDemographicCurrentAddress() {
	$('#navigation-next').prop('disabled', true);

	let nodeid = getUrlParam('nodeid');
	var node = nodeById(jsonFlow, nodeid);
	// $('#input-label').contents().last().replaceWith(node.label);
	name = node.name;

	$('#list-region').change(function() {
		$('#input-region').val($(this).val());
	});
	$('#list-district').change(function() {
		$('#input-district').val($(this).val());
	});
	$('#list-ta').change(function() {
		$('#input-ta').val($(this).val());
	});
	$('#list-village').change(function() {
		$('#input-village').val($(this).val());
		$('#navigation-next').prop('disabled', false);
	});

	loadCurrentPatient();
}

function hookNextDemographicCurrentAddress(e) {
	var address = {};
	address.line = [];
	address.village = $('#input-village').val();;
	address.ta = $('#input-ta').val();
	address.district = $('#input-district').val();
	address.region = $('#input-region').val();
	address.country = "MW";
	currentPatient.currentAddress = address;
	updateCurrentPatient(currentPatient);
}
