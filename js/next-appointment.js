function onLoadNextAppointment() {
}

function buttonClickNextAppointment(e) {
	switch (e.target.id) {
		case 'tomorrow':
			document.getElementById('return').value = formatDate(new Date(Date.now() + 86400000));
			break;
		case 'next-week':
			document.getElementById('return').value = formatDate(new Date(Date.now() + 604800000));
			break;
		case 'in-two-weeks':
			document.getElementById('return').value = formatDate(new Date(Date.now() + 12096e5));
			break;
		case 'next-month':
			document.getElementById('return').value = formatDate(new Date(Date.now() + (12096e5*2)));
			break;
		case 'in-three-months':
			document.getElementById('return').value = formatDate(new Date(Date.now() + (12096e5*6)));
			break;
	}
	if (e.target.id.startsWith("keypad-bksp")) {
		document.getElementById('year').value = document.getElementById('year').value.substring(0, document.getElementById('year').value.length-1);
	} else if (e.target.id.startsWith("keypad-dot")) {
		document.getElementById('year').value += '.';
	} else if (e.target.id.startsWith("keypad-")) {
		document.getElementById('year').value += e.target.id.substring(7);
	} else if (e.target.id.startsWith("monthpad-")) {
		document.getElementById('month').value = e.target.id.substring(9);
	} else if (e.target.id.startsWith("day-")) {
		document.getElementById('day').value = e.target.id.substring(4);
	}
	if (e.target.id.startsWith("month-")) {
		document.getElementById('month').value = e.target.id.substring(6);
	}
	if (e.target.id.startsWith("day-")) {
		document.getElementById('day').value = e.target.id.substring(4);
	}
}
