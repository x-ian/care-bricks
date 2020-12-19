function statusOfNextButton() {
	// only valid if not empty and with two '-'s
	$('#navigation-next').prop('disabled', ($('#return').val().length == 0) || ($('#return').val().match(/-/g) || []).length !== 2);
}

function hookNextNextAppointment(e) {
	currentEncounter.nextAppointment = $('#return').val();
	updateCurrentEncounter(currentEncounter);
}

var year = "";
var month = "";
var day = "";

function onLoadNextAppointment() {
	$('#appt-month button').attr('disabled','disabled');
	$('#appt-day button').attr('disabled','disabled');
	statusOfNextButton();
	$('#return').on('change', function() {
		statusOfNextButton();
	});

	loadCurrentPatient();
	loadCurrentEncounter(function() {
		$('#return').val(currentEncounter.nextAppointment);
	});
	
	$('.btn').click(function(e) {
		switch (e.target.id) {
			case 'tomorrow':
				$('#appt-month button').attr('disabled','disabled');
				$('#appt-day button').attr('disabled','disabled');
				$('#return').val(formatDate(new Date(Date.now() + 86400000)));
				break;
			case 'next-week':
				$('#appt-month button').attr('disabled','disabled');
				$('#appt-day button').attr('disabled','disabled');
				$('#return').val(formatDate(new Date(Date.now() + 604800000)));
				break;
			case 'in-two-weeks':
				$('#appt-month button').attr('disabled','disabled');
				$('#appt-day button').attr('disabled','disabled');
				$('#return').val(formatDate(new Date(Date.now() + 12096e5)));
				break;
			case 'next-month':
				$('#appt-month button').attr('disabled','disabled');
				$('#appt-day button').attr('disabled','disabled');
				$('#return').val(formatDate(new Date(Date.now() + (12096e5*2))));
				break;
			case 'in-two-months':
				$('#appt-month button').attr('disabled','disabled');
				$('#appt-day button').attr('disabled','disabled');
				$('#return').val(formatDate(new Date(Date.now() + (12096e5*4))));
				break;
			case 'in-three-months':
				$('#appt-month button').attr('disabled','disabled');
				$('#appt-day button').attr('disabled','disabled');
				$('#return').val(formatDate(new Date(Date.now() + (12096e5*6))));
				break;

			case 'this-year':
				year="2020";
				$('#return').val(year);
				$('#appt-month button').removeAttr('disabled');
				$('#appt-day button').attr('disabled','disabled');
				break;
			case 'next-year':
				year="2021";
				$('#return').val(year);
				$('#appt-month button').removeAttr('disabled');
				$('#appt-day button').attr('disabled','disabled');
				break;
		}
		if (e.target.id.startsWith("monthpad-")) {
			const monthNames = ["filler", "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
			month = parseInt(e.target.id.substring(9));
			$('#return').val(monthNames[month] + "-" + year);
			$('#appt-day button').removeAttr('disabled');
		} else if (e.target.id.startsWith("day-")) {
			day = parseInt(e.target.id.substring(4));
			$('#return').val(formatDate(new Date(year, month, day)));
		}
		statusOfNextButton();
	});
}

