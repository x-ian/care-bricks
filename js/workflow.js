
// get values rom height and weight sliders
if (document.getElementById('input-weight-range') != null) {
	document.getElementById('input-weight-range').oninput = function() {
		document.getElementById('input-weight').value = document.getElementById('input-weight-range').value;
	};
}
if (document.getElementById('input-height-range') != null) {
	document.getElementById('input-height-range').oninput = function() {
		document.getElementById('input-height').value = document.getElementById('input-height-range').value;
	};
}

// central event processing
$(function(){

	// change active class based on selection in all list-groups; currently prevents multiselect
	$('.list-group li').click(function(e) {
		e.preventDefault();
		$that = $(this);
		$that.toggleClass('active');
	});

	// change active class based on selection in all list-groups; currently prevents multiselect
	$('.list-group:not(.multiple) li').click(function(e) {
		e.preventDefault();
		$that = $(this);
		$that.parent().find('li').removeClass('active');
		$that.addClass('active');

		switch(basename(window.location.pathname)) {
			case "firstname":
			case "lastname":
				document.getElementById('input').value = e.currentTarget.childNodes[0].innerText;
				break;
			case "home-address":
			case "current-address":
				switch($that.parent()[0].id) {
					case "list-region":
						document.getElementById('input-region').value = e.currentTarget.childNodes[0].innerText;
						break;
					case "list-district":
						document.getElementById('input-district').value = e.currentTarget.childNodes[0].innerText;
						break;
					case "list-ta":
						document.getElementById('input-ta').value = e.currentTarget.childNodes[0].innerText;
						break;
					case "list-village":
						document.getElementById('input-village').value = e.currentTarget.childNodes[0].innerText;
						break;
				}
		}
	});

	// all buttons clicked
	$('.btn').click(function(e) {

		// buttons on each screen
		switch(basename(window.location.pathname)) {
			case "birthdate":
				if (e.target.id.startsWith("keypad-bksp")) {
					document.getElementById('year').value = document.getElementById('year').value.substring(0, document.getElementById('year').value.length-1);
				} else if (e.target.id.startsWith("keypad-")) {
					document.getElementById('year').value += e.target.id.substring(7);
				} else if (e.target.id.startsWith("monthpad-")) {
					document.getElementById('month').value = e.target.id.substring(9);
				} else if (e.target.id.startsWith("day-")) {
					document.getElementById('day').value = e.target.id.substring(4);
				} else if (e.target.id.startsWith("age-in-years-")) {
					document.getElementById('age-in-years').value = e.target.id.substring(13);
				}
				break;

			case "firstname":
			case "lastname":
				if (e.target.id.startsWith("alphapad-bksp")) {
					document.getElementById('input').value = document.getElementById('input').value.substring(0, document.getElementById('input').value.length-1);
				} else if (e.target.id.startsWith("alphapad-dash")) {
					document.getElementById('input').value += '-';
				} else if (e.target.id.startsWith("alphapad-quote")) {
					document.getElementById('input').value += '\'';
				} else if (e.target.id.startsWith("alphapad-")) {
					document.getElementById('input').value += e.target.id.substring(9);
				}
				break;

			case "blood-pressure":
				if (e.target.id.startsWith("bppad-dia-")) {
					document.getElementById('input-bp-dia').value = e.target.id.substring(10);
				} else if (e.target.id.startsWith("bppad-sys-")) {
					document.getElementById('input-bp-sys').value = e.target.id.substring(10);
				}
				break;

				// switch(e.target.id) {
				// 	case "keypad-1":
				// 		document.getElementById('year').value +='1';
				// 		break;
				// }
		}
	});
})
