
var patient1Json = {
  identifier: {
  	type: "internal", value: "1", location: "",
	  processor: "", readonly: "true"
  },
  additionalIdentifiers: [],
  name: {
    givenName: "John", familyName: "Doe", middleName: "", degree: ""
  },
  additionalNames: [],
  gender: "M",
  birthdate: "1990-01-01", deathdate: "",
  homeAddress: {
    address: "", address2: "", cityVillage: "Harper City",
    countyDistrict: "Harper", stateProvince: "Maryland",
    country: "Liberia", postalCode: "",
    startDate: "", endDate: "",
    latitude: "", longitude: ""
  },
  currentAddress: {
    address: "", address2: "", cityVillage: "Harper City",
    countyDistrict: "Harper", stateProvince: "Maryland",
    country: "Liberia", postalCode: "",
    startDate: "", endDate: "",
    latitude: "", longitude: ""
  },
  additionalAddresses: [],
  contactMobile: "+231 8888 88888", contactMail: "",
  additionalContacts: []
};

var patient2Json = {
  identifier: {
  	type: "internal", value: "2", location: "",
	  processor: "", readonly: "true"
  },
  additionalIdentifiers: [],
  name: {
    givenName: "Mary", familyName: "Ellen", middleName: "", degree: ""
  },
  additionalNames: [],
  gender: "F",
  birthdate: "1995-01-01", deathdate: "",
  homeAddress: {
    address: "", address2: "", cityVillage: "Harper City",
    countyDistrict: "Harper", stateProvince: "Maryland",
    country: "Liberia", postalCode: "",
    startDate: "", endDate: "",
    latitude: "", longitude: ""
  },
  currentAddress: {
    address: "", address2: "", cityVillage: "Harper City",
    countyDistrict: "Harper", stateProvince: "Maryland",
    country: "Liberia", postalCode: "",
    startDate: "", endDate: "",
    latitude: "", longitude: ""
  },
  additionalAddresses: [],
  contactMobile: "+231 8888 88888", contactMail: "",
  additionalContacts: []
};

function onLoadCheckedInPatientsList() {
  	// var jsonExampleCheckedInPatientsList = [
  	// 	{ "name": "Christian Neumann - male - 19 years", "value": "1"}
  	// 	, { "name": "Beth Dunbar - female - 17 years", "value": "2"}
  	// ];

    var j11 = JSON.stringify(patient1Json);
    var j22 = JSON.stringify(patient2Json);
    var jsonExampleCheckedInPatientsList = [ JSON.parse(j11), JSON.parse(j22) ];

  	let dropdown = $('#checked-in-patients');

    var i = 1;
    $.each(jsonExampleCheckedInPatientsList, function (key, entry) {
      dropdown.append('<option class=emr-select-option value=' + i++ + '>' + entry.identifier.value + " - " + entry.name.givenName + " " + entry.name.familyName + " - " + entry.gender + " - " + entry.birthdate + '</option>');
    });

}

function hookNextCheckedInPatientsList(e) {
    db.flow_sessions.put({flowsessionid: 1, patient: patient1Json});
}
