function onLoadCheckedInPatientsList() {
  	var jsonExampleCheckedInPatientsList = [
  		{ "name": "Christian Neumann - male - 19 years", "value": "1"}
  		, { "name": "Beth Dunbar - female - 17 years", "value": "2"}
  	];
  	let dropdown = $('#checked-in-patients');

    $.each(jsonExampleCheckedInPatientsList, function (key, entry) {
      dropdown.append('<option class=emr-select-option value=' + entry.value + '>' + entry.name + '</option>');
    });

}

function hookNextCheckedInPatientsList(e) {
    alert('next');
}
