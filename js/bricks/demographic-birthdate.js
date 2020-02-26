function onLoadDemographicBirthdate() {
}

function buttonClickDemographicBirthdate(e) {
  defaultButtonDatepad(e);
  if (e.target.id.startsWith("age-in-years-")) {
		document.getElementById('age-in-years').value = e.target.id.substring(13);
	}
}
