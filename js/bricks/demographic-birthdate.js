function statusOfNextButton() {
	$('#navigation-next').prop('disabled', ($('#birthdate').val().length == 0) || ($('#birthdate').val().match(/-/g) || []).length !== 2);

	var ageDifMs = Date.now() - new Date(year, month, day).getTime();
	console.log(year + " " + month + " " + day);
	var ageDate = new Date(ageDifMs); // miliseconds from epoch
	console.log(ageDate.getUTCFullYear());
	console.log("AGE: " + Math.abs(ageDate.getUTCFullYear() - 1970));
	$('#age-in-years').val(Math.abs(ageDate.getUTCFullYear() - 1970));
}

function hookNextDemographicBirthdate(e) {
	currentPatient.birthdate = $('#birthdate').val();
	updateCurrentPatient(currentPatient);
}

var year = "";
var month = "";
var day = "";

function onLoadDemographicBirthdate() {
	$('.btn').click(function(e) {
		if (e.target.id.startsWith("age-in-years-")) {
			$('#age-in-years').val(e.target.id.substring(13));
			var d = new Date();
			d.setYear(d.getFullYear() - $('#age-in-years').val());
			$('#birthdate').val(formatDate(d));
			year = d.getFullYear();
			month = d.getMonth();
			day = d.getDate();
		}

		if (e.target.id.startsWith("keypad-bksp")) {
			$('#birthdate').val($('#birthdate').val().substring(0, $('#birthdate').val().length - 1));
			year = "";
		} else if (e.target.id.startsWith("keypad-")) {
			var yearInput = e.target.id.substring(7);
			if ($('#birthdate').val().length < 4) {
				$('#birthdate').val($('#birthdate').val() + yearInput);
			}
			if ($('#birthdate').val().length < 4) {
				$('#birthdate-month button').attr('disabled', 'disabled');
				$('#birthdate-day button').attr('disabled', 'disabled');
			} else if ($('#birthdate').val().length == 4) {
				year = $('#birthdate').val();
				$('#birthdate-month button').removeAttr('disabled');
				$('#birthdate-day button').removeAttr('disabled');
			} else {
				year = "";
				month = "";
				day = "";
				$('#age-in-years').val("");
				$('#birthdate').val(yearInput);
				$('#birthdate-month button').attr('disabled', 'disabled');
				$('#birthdate-day button').attr('disabled', 'disabled');
			}
		} else if (e.target.id.startsWith("monthpad-")) {
			const monthNames = ["filler", "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
			month = parseInt(e.target.id.substring(9));
			$('#birthdate').val(monthNames[month] + "-" + year);
			$('#birthdate-day button').removeAttr('disabled');
		} else if (e.target.id.startsWith("day-")) {
			day = parseInt(e.target.id.substring(4));
			$('#birthdate').val(formatDate(new Date(year, month, day)));
		}
		statusOfNextButton();
	});


	$('#birthdate-month button').attr('disabled', 'disabled');
	$('#birthdate-day button').attr('disabled', 'disabled');
	statusOfNextButton();
	$('#birthdate').on('change', function() {
		if (($('#birthdate').val().match(/-/g) || []).length !== 2) {
			year = month = day = "";
		} else {
			var d = new Date ($('#birthdate').val());
// 			year = d.getFullYear();
// 			month = d.getMonth() + 1;
// 			day = d.getDay();
		}
		console.log("on");
		statusOfNextButton();
	});

	loadCurrentPatient(function() {
		$('#birthdate').val(currentPatient.birthdate).change();
		statusOfNextButton();
	});
}
