function statusOfNextButton() {
	$('#navigation-next').prop('disabled', ($('#input').val().length == 0));
}

function onLoadFindPatient() {
	statusOfNextButton();
	$('.btn').click(function(e) {
		defaultButtonAlphapad(e);
		defaultButtonKeypad(e);
		statusOfNextButton();
	});
}

function hookNextFindPatient(e) {
	updateCurrentPatient(JSON.parse(patient1Json));
}
