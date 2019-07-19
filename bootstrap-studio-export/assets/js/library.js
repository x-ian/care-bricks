var config = {
// choose and select one patient
	"patientregistration-findpatient": { "context": "Patient Registration - Find Patient", "next": "patientregistration-firstname.html", "back": ""},
	"patientregistration-scheduledpatientslist": { "context": "Patient Registration - Scheduled Patients", "next": "patientregistration-firstname.html", "back": ""},
	"patientregistration-checkedinpatientslist": { "context": "Patient Registration - Checked-in Patients", "next": "patientregistration-firstname.html", "back": ""},
	"patientregistration-registerpatientslist": { "context": "Patient Registration - Checked-in Patients", "next": "patientregistration-firstname.html", "back": ""},
// create new patient
	"patientregistration-firstname": { "context": "Patient Registration - Demographics - Firstname", "next": "patientregistration-lastname.html", "back": "patientregistration-findpatient.html"},
	"patientregistration-lastname": { "context": "Patient Registration - Demographics - Lastname", "next": "patientregistration-birthdate.html", "back": "patientregistration-firstname.html"},
	"patientregistration-birthdate": { "context": "Patient Registration - Demographics - Birthdate", "next": "patientregistration-homeaddress.html", "back": "patientregistration-lastname.html"},
	"patientregistration-homeaddress": { "context": "Patient Registration - Demographics - Home Address", "next": "patientregistration-currentaddress.html", "back":	"patientregistration-birthdate.html"},
	"patientregistration-currentaddress": { "context": "Patient Registration - Demographics - Current Address", "next": "patientregistration-vitals-heightweight.html", "back": "patientregistration-homeaddress.html" },
// modify patient
	"patientregistration-checkin": { "context": "Patient Registration - Check In Patient", "next": "patientregistration-vitals-bloodpressure.html", "back": "patientregistration-currentaddress.html" },
	"patientregistration-vitals-heightweight": { "context": "Patient Registration - Vitals - Height & Weight", "next": "patientregistration-vitals-bloodpressure.html", "back": "patientregistration-currentaddress.html" },
	"patientregistration-vitals-bloodpressure": { "context": "Patient Registration - Vitals - Blood Pressure", "next": "", "back": "patientregistration-vitals-heightweight.html" },
// end current station flow
	"patientregistration-endflow": { "context": "Patient Registration - End Current Station Flow", "next": "", "back": "patientregistration-vitals-heightweight.html" }
};

function basename(str) {
   var base = new String(str).substring(str.lastIndexOf('/') + 1); 
    if(base.lastIndexOf(".") != -1)       
        base = base.substring(0, base.lastIndexOf("."));
   return base;
}

function getNextBrick(path) {
	getPathname(randomArrayElement(g.transitionsForNode(path)));
}

function getPathname(nodeName) {
	return nodeName.replace(/[^\w]/g,'');
}

var vitalsJson = '[{"id":"a0b464d6.270658","type":"subflow","name":"Checked-in patients list","info":"","category":"ClinicFlow - Choose Patient","in":[{"x":50,"y":30,"wires":[]}],"out":[{"x":160,"y":30,"wires":[]}],"env":[],"icon":"node-red/watch.png"},{"id":"6c6c2e96.a3096","type":"subflow","name":"End station","info":"","category":"ClinicFlow - Mark flow end","in":[{"x":50,"y":30,"wires":[]}],"out":[],"env":[],"icon":"font-awesome/fa-stop-circle-o"},{"id":"382e54d.1ebbcac","type":"subflow","name":"Next Appointment","info":"","category":"ClinicFlow - Modify Patient","in":[{"x":50,"y":30,"wires":[]}],"out":[{"x":160,"y":30,"wires":[]}],"env":[],"icon":"font-awesome/fa-user-o"},{"id":"562747d3.16f728","type":"subflow","name":"Lab Order: Sputum","info":"","category":"ClinicFlow - Modify Patient","in":[{"x":50,"y":30,"wires":[]}],"out":[{"x":160,"y":30,"wires":[]}],"env":[],"icon":"font-awesome/fa-user-o"},{"id":"8279021a.e7a1","type":"subflow","name":"Lab Order: Pregnancy Test","info":"","category":"ClinicFlow - Modify Patient","in":[{"x":50,"y":30,"wires":[]}],"out":[{"x":160,"y":30,"wires":[]}],"env":[],"icon":"font-awesome/fa-user-o"},{"id":"8478e961.187628","type":"subflow","name":"TB Screening","info":"","category":"ClinicFlow - Modify Patient","in":[{"x":50,"y":30,"wires":[]}],"out":[{"x":160,"y":30,"wires":[]},{"x":215,"y":30,"wires":[]}],"env":[],"outputLabels":["positive","negative"],"icon":"font-awesome/fa-user-o"},{"id":"9b44cbd3.7e4788","type":"subflow","name":"Vitals: Blood Pressure","info":"","category":"ClinicFlow - Modify Patient","in":[{"x":50,"y":30,"wires":[]}],"out":[{"x":160,"y":30,"wires":[]}],"env":[],"icon":"font-awesome/fa-user-o"},{"id":"8eb7b1ae.2ce08","type":"subflow","name":"Vitals: Height & Weight","info":"","category":"ClinicFlow - Modify Patient","in":[{"x":50,"y":30,"wires":[]}],"out":[{"x":160,"y":30,"wires":[]}],"env":[],"icon":"font-awesome/fa-user-o"},{"id":"a311dda2.7c3c6","type":"tab","label":"ClinicFlow: Vitals & Screening","disabled":false,"info":""},{"id":"906fef09.aab4b","type":"subflow:8eb7b1ae.2ce08","z":"a311dda2.7c3c6","name":"","env":[],"x":415.3068542480469,"y":37.00000190734863,"wires":[["ce72cb0c.6fb848"]]},{"id":"ce6718e2.a03dc8","type":"subflow:9b44cbd3.7e4788","z":"a311dda2.7c3c6","name":"","env":[],"x":636.1902618408203,"y":96.80956506729126,"wires":[["6836e9bb.4ce3c8"]]},{"id":"fb2c158c.900ed8","type":"subflow:8478e961.187628","z":"a311dda2.7c3c6","name":"","env":[],"x":392.0085983276367,"y":236.79831314086914,"wires":[["6153b9c3.dcca58"],["679c61e9.7b6ed"]]},{"id":"a8d5b4f.87e4848","type":"subflow:8279021a.e7a1","z":"a311dda2.7c3c6","name":"","env":[],"x":661.0000228881836,"y":165.87221717834473,"wires":[["fb2c158c.900ed8"]]},{"id":"6836e9bb.4ce3c8","type":"function","z":"a311dda2.7c3c6","name":"female && >= 15 yrs","func":"return msg;","outputs":2,"noerr":0,"x":411.81824493408203,"y":170.99722862243652,"wires":[["a8d5b4f.87e4848"],["fb2c158c.900ed8"]],"outputLabels":["female && >= 15 yrs","all others"]},{"id":"6153b9c3.dcca58","type":"subflow:562747d3.16f728","z":"a311dda2.7c3c6","name":"","env":[],"x":634.0085525512695,"y":232.5000524520874,"wires":[["679c61e9.7b6ed"]]},{"id":"679c61e9.7b6ed","type":"subflow:382e54d.1ebbcac","z":"a311dda2.7c3c6","name":"","env":[],"x":401.00569915771484,"y":304.48294830322266,"wires":[["ca7ed339.1b399"]]},{"id":"ca7ed339.1b399","type":"subflow:6c6c2e96.a3096","z":"a311dda2.7c3c6","name":"","x":628.7357769012451,"y":380.46876335144043,"wires":[]},{"id":"ce72cb0c.6fb848","type":"function","z":"a311dda2.7c3c6","name":"under 5","func":"return msg;","outputs":2,"noerr":0,"x":375.5483512878418,"y":104.90341472625732,"wires":[["ce6718e2.a03dc8"],["6836e9bb.4ce3c8"]],"outputLabels":[">= 5 yrs","all others"]},{"id":"8f15a31d.f6604","type":"subflow:a0b464d6.270658","z":"a311dda2.7c3c6","name":"","env":[],"x":134,"y":37.69892501831055,"wires":[["906fef09.aab4b"]]}]';
let g = buildGraph(vitalsJson);

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
		$that.parent().find('li').removeClass('active');
		$that.addClass('active'); 
		
		switch(basename(window.location.pathname)) {
			case "patientregistration-firstname":
			case "patientregistration-lastname":
				document.getElementById('input').value = e.currentTarget.childNodes[0].innerText;
				break;
			case "patientregistration-homeaddress":
			case "patientregistration-currentaddress":
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
		// navigation buttons in footer
		switch (e.target.id) {
			case "navigation-next":
				//location = config[basename(window.location.pathname)]["next"];
				location = getNextBrick(window.location.pathname);
				break;
			case "navigation-back":
				location = config[basename(window.location.pathname)]["back"];
				break;
			case "navigation-clear":
				location.reload();
				break;
		}
		
		// buttons on each screen
		switch(basename(window.location.pathname)) {
			case "patientregistration-birthdate":
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

			case "patientregistration-firstname":
			case "patientregistration-lastname":
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

			case "patientregistration-findpatient":
				if (e.target.id.startsWith("alphanumpad-bksp")) {
					document.getElementById('input').value = document.getElementById('input').value.substring(0, document.getElementById('input').value.length-1);					
				} else if (e.target.id.startsWith("alphanumpad-dot")) {
					document.getElementById('input').value += '.';
				} else if (e.target.id.startsWith("alphanumpad-space")) {
					document.getElementById('input').value += ' ';
				} else if (e.target.id.startsWith("alphanumpad-dash")) {
					document.getElementById('input').value += '-';
				} else if (e.target.id.startsWith("alphanumpad-quote")) {
					document.getElementById('input').value += '\'';
				} else if (e.target.id.startsWith("alphanumpad-")) {
					document.getElementById('input').value += e.target.id.substring(12);
				}
				break;

			case "patientregistration-vitals-bp":
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

$(window).on('load', function() {
	document.getElementById('footer-area').value = config[basename(window.location.pathname)]["context"];
});

