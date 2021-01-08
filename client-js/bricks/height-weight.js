var node;

function keyHeight(node) {
	if (!node.keyHeight) {
		return "height";
	} else {
		return node.keyHeight;
	}
}

function keyWeight(node) {
	if (!node.keyWeight) {
		return "weight";
	} else {
		return node.keyWeight;
	}	
}

function statusOfNextButton() {
	$('#navigation-next').prop('disabled', ($('#input-height').val().length == 0 || $('#input-weight').val().length == 0));
}

function onLoadHeightWeight() {
	let nodeid = getUrlParam('nodeid');
	node = nodeById(jsonFlow, nodeid);
	$('#input-label').text(labelFor(node));	

	statusOfNextButton();
	$('#input-weight').on('change', function() {
		statusOfNextButton();
	});
	$('#input-height').on('change', function() {
		statusOfNextButton();
	});
	$('#input-weight-range').on('input', function() {
		$('#input-weight').val($('#input-weight-range').val()).change();
		statusOfNextButton();
	});
	$('#input-height-range').on('input', function() {
		$('#input-height').val($('#input-height-range').val()).change();
		statusOfNextButton();
	});

	loadCurrentPatient();
	loadCurrentEncounter(function() {
		$('#input-height').val(currentEncounter[keyHeight(node)]).change();
		$('#input-height-range').val(currentEncounter[keyHeight(node)]).change();
		$('#input-weight').val(currentEncounter[keyWeight(node)]).change();
		$('#input-weight-range').val(currentEncounter[keyWeight(node)]).change();
	});
}

function hookNextHeightWeight(e) {
	currentEncounter[keyHeight(node)] = $('#input-height').val();
	currentEncounter[keyWeight(node)] = $('#input-weight').val();
	updateCurrentEncounter(currentEncounter);
}
