var node;
var addressHierarchy;

function onLoadAddressLiberia() {
	$('#navigation-next').prop('disabled', true);

	let nodeid = getUrlParam('nodeid');
	node = nodeById(jsonFlow, nodeid);
	$('#input-label').text(labelFor(node));	

	$('#list-country').change(function() {
		$('#list-county').empty(); $('#input-county').val("").change();
		$('#list-district').empty(); $('#input-district').val("").change();
		$('#list-city').empty(); $('#input-city').val("").change();
		$('#input-country').val($(this).val()).change();
		for (const [key, value] of Object.entries(addressHierarchy[$(this).val()])) {
		  $('#list-county').append('<option value="' + key + '" class="emr-select-option">' + key + '</option>');
		};
	});
	$('#list-county').change(function() {
		$('#list-district').empty(); $('#input-district').val("").change();
		$('#list-city').empty(); $('#input-city').val("").change();;
		$('#input-county').val($(this).val()).change();;
		for (const [key, value] of 
			Object.entries(addressHierarchy[$('#input-country').val()]
			[$(this).val()])) {
		  $('#list-district').append('<option value="' + key + '" class="emr-select-option">' + key + '</option>');
		};
	});
	$('#list-district').change(function() {
		$('#list-city').empty(); $('#input-city').val("").change();
		$('#input-district').val($(this).val()).change();;
		for (const [key, value] of 
			Object.entries(addressHierarchy[$('#input-country').val()]
			[$('#input-county').val()]
			[$(this).val()])) {
		  $('#list-city').append('<option value="' + value + '" class="emr-select-option">' + value + '</option>');
		};
	});
	$('#list-city').change(function() {
		$('#input-city').val($(this).val()).change();
	});
	$('#input-city').change(function(){
		if ($(this).val() === "") {
			$('#navigation-next').prop('disabled', true);
		} else {
			$('#navigation-next').prop('disabled', false);
		}
	});
	
	if (node.scope === 'encounter') {
		loadCurrentEncounter(function() {});
	}
	loadCurrentPatient();
	
	$.ajax({
	  dataType: "json",
	  url: '/assets/client-js/address-liberia.json',
	    success: function(data){
			$('#list-country').empty(); $('#input-country').val("").change();
			$('#list-county').empty(); $('#input-county').val("").change();
			$('#list-district').empty(); $('#input-district').val("").change();
			$('#list-city').empty(); $('#input-city').val("").change();
			addressHierarchy = data;			
			for (const [key, value] of Object.entries(addressHierarchy)) {
			  $('#list-country').append('<option value="' + key + '" class="emr-select-option">' + key + '</option>');
			};
		},
	    error: function(errMsg) {
			console.log("errMsg");
	    }
	});
}

function hookNextAddressLiberia(e) {
	var address = {};
	// address.line = [];
	address.country = $('#input-country').val();
	address.county = $('#input-county').val();
	address.district = $('#input-district').val();
	address.city = $('#input-city').val();
	if (node.scope === 'encounter') {
		currentEncounter[keyFor(node)] = address;
		updateCurrentEncounter(currentEncounter);
	} else {
		currentPatient[keyFor(node)] = address;
		updateCurrentPatient(currentPatient);
	}	
}
