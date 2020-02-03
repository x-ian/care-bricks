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
  patient = JSON.parse('{ \
    "identifier": {\
    	"type": "", \
    	"value": "", \
    	"location": "", \
    	"processor": "", \
    	"readonly": "" \
    }, \
    "additionalIdentifiers": [], \
    "name": {\
    	"degree": "", \
    	"givenName": "", \
    	"middleName": "", \
    	"familyName": "master"\
    }, \
    "additionalNames": [], \
    "gender": "", \
    "birthdate": "", \
    "deathdate": "", \
    "homeAddress": {\
    	"address": "", \
    	"address2": "", \
    	"cityVillage": "", \
    	"countyDistrict": "", \
    	"stateProvince": "", \
    	"country": "", \
    	"postalCode": "", \
    	"startDate": "", "endDate": "", \
    	"latitude": "", "longitude": ""\
    }, \
    "currentAddress": {\
    	"address": "", \
    	"address2": "", \
    	"cityVillage": "", \
    	"countyDistrict": "", \
    	"stateProvince": "", \
    	"country": "", \
    	"postalCode": "", \
    	"startDate": "", "endDate": "", \
    	"latitude": "", "longitude": ""\
    }, \
    "workAddress": {\
    	"address": "", \
    	"address2": "", \
    	"cityVillage": "", \
    	"countyDistrict": "", \
    	"stateProvince": "", \
    	"country": "", \
    	"postalCode": "", \
    	"startDate": "", "endDate": "", \
    	"latitude": "", "longitude": ""\
    }, \
    "contactMobile": "", \
    "contactMail": "", \
    "additionalContacts": [] \
}');


console.log(patient.id);
    // patient = JSON.parse('{ "resourceType": "Patient", "id": "1-123", "name": [ { "use": "official", "family": "Chalmers", "given": [ "James" ] } ], "telecom": [ { "system": "phone", "value": "‭+231 7712 34567‬", "use": "mobile", "rank": 1 } ], "gender": "male", "birthDate": "1974-12-25", "mothersGivenName": "Eliza", "address": [ { "use": "home", "type": "physical", "line": [ "Behind the Lagoon" ], "city": "Harper City", "district": "Harper", "state": "Maryland", "country": "Liberia" }, { "use": "birthplace", "type": "physical", "line": [ "Next to market" ], "city": "Harper City", "district": "Harper", "state": "Maryland", "country": "Liberia" } ] } ');
    db.flow_sessions.put({flowsessionid: 1, patient: patient});
    // alert('warte');
}
