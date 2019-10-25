var config = {
// choose and select one patient
	"findpatient": { "context": "Patient Registration - Find Patient", "next": "firstname.html", "back": ""},
	"scheduledpatientslist": { "context": "Patient Registration - Scheduled Patients", "next": "firstname.html", "back": ""},
	"checkedinpatientslist": { "context": "Patient Registration - Checked-in Patients", "next": "firstname.html", "back": ""},
	"registerpatientslist": { "context": "Patient Registration - Checked-in Patients", "next": "firstname.html", "back": ""},
// create new patient
	"firstname": { "context": "Patient Registration - Demographics - Firstname", "next": "lastname.html", "back": "findpatient.html"},
	"lastname": { "context": "Patient Registration - Demographics - Lastname", "next": "birthdate.html", "back": "firstname.html"},
	"birthdate": { "context": "Patient Registration - Demographics - Birthdate", "next": "homeaddress.html", "back": "lastname.html"},
	"homeaddress": { "context": "Patient Registration - Demographics - Home Address", "next": "currentaddress.html", "back":	"birthdate.html"},
	"currentaddress": { "context": "Patient Registration - Demographics - Current Address", "next": "vitals-heightweight.html", "back": "homeaddress.html" },
// modify patient
	"checkin": { "context": "Patient Registration - Check In Patient", "next": "vitals-bloodpressure.html", "back": "currentaddress.html" },
	"vitalsheightweight": { "context": "Patient Registration - Vitals - Height & Weight", "next": "vitals-bloodpressure.html", "back": "currentaddress.html" },
	"vitals-bloodpressure": { "context": "Patient Registration - Vitals - Blood Pressure", "next": "", "back": "vitals-heightweight.html" },
// end current station flow
	"endflow": { "context": "Patient Registration - End Current Station Flow", "next": "", "back": "vitals-heightweight.html" }
};

function getParameterByName(name) {
    var match = RegExp('[?&]' + name + '=([^&]*)').exec(window.location.search);
    return match && decodeURIComponent(match[1].replace(/\+/g, ' '));
}

function basename(str) {
   var base = new String(str).substring(str.lastIndexOf('/') + 1);
    if(base.lastIndexOf(".") != -1)
        base = base.substring(0, base.lastIndexOf("."));
   return base;
}

function getNextBrick(path) {
	if (path.startsWith("/")) {
		path = path.substring(1);
	}
	if (path.endsWith(".html")) {
		path = path.substring(0, path.length - 5);
	}
	let next = randomArrayElement(g.transitionsForNode(getPathname(path)));
	console.log("Transition from '" + path + "' to '" + next + "'");
	return next;
}

function getPreviousBrick(path) {
	if (path.startsWith("/")) {
		path = path.substring(1);
	}
	if (path.endsWith(".html")) {
		path = path.substring(0, path.length - 5);
	}
	let next = randomArrayElement(g.backwardsTransitionsForNode(getPathname(path)));
	console.log("Transition from '" + path + "' to '" + next + "'");
	return next;
}

function getPathname(nodeName) {
	// var n = nodeName.replace(/[^\w]/g,'').toLowerCase();
	var n = nodeName;
	if (n.endsWith(".html")) {
		n = n.substring(0, n.length-5);
	}
	if (n.startsWith("/")) {
		n = n.substring(1);
	}
	return n;
}


//var vitalsJson = '[{"id":"a0b464d6.270658","type":"subflow","name":"Checked-in patients list","info":"","category":"ClinicFlow - Choose Patient","in":[{"x":50,"y":30,"wires":[]}],"out":[{"x":160,"y":30,"wires":[]}],"env":[],"icon":"node-red/watch.png"},{"id":"6c6c2e96.a3096","type":"subflow","name":"End station","info":"","category":"ClinicFlow - Mark flow end","in":[{"x":50,"y":30,"wires":[]}],"out":[],"env":[],"icon":"font-awesome/fa-stop-circle-o"},{"id":"382e54d.1ebbcac","type":"subflow","name":"Next Appointment","info":"","category":"ClinicFlow - Modify Patient","in":[{"x":50,"y":30,"wires":[]}],"out":[{"x":160,"y":30,"wires":[]}],"env":[],"icon":"font-awesome/fa-user-o"},{"id":"562747d3.16f728","type":"subflow","name":"Lab Order: Sputum","info":"","category":"ClinicFlow - Modify Patient","in":[{"x":50,"y":30,"wires":[]}],"out":[{"x":160,"y":30,"wires":[]}],"env":[],"icon":"font-awesome/fa-user-o"},{"id":"8279021a.e7a1","type":"subflow","name":"Lab Order: Pregnancy Test","info":"","category":"ClinicFlow - Modify Patient","in":[{"x":50,"y":30,"wires":[]}],"out":[{"x":160,"y":30,"wires":[]}],"env":[],"icon":"font-awesome/fa-user-o"},{"id":"8478e961.187628","type":"subflow","name":"TB Screening","info":"","category":"ClinicFlow - Modify Patient","in":[{"x":50,"y":30,"wires":[]}],"out":[{"x":160,"y":30,"wires":[]},{"x":215,"y":30,"wires":[]}],"env":[],"outputLabels":["positive","negative"],"icon":"font-awesome/fa-user-o"},{"id":"9b44cbd3.7e4788","type":"subflow","name":"Vitals: Blood Pressure","info":"","category":"ClinicFlow - Modify Patient","in":[{"x":50,"y":30,"wires":[]}],"out":[{"x":160,"y":30,"wires":[]}],"env":[],"icon":"font-awesome/fa-user-o"},{"id":"8eb7b1ae.2ce08","type":"subflow","name":"Vitals: Height & Weight","info":"","category":"ClinicFlow - Modify Patient","in":[{"x":50,"y":30,"wires":[]}],"out":[{"x":160,"y":30,"wires":[]}],"env":[],"icon":"font-awesome/fa-user-o"},{"id":"a311dda2.7c3c6","type":"tab","label":"ClinicFlow: Vitals & Screening","disabled":false,"info":""},{"id":"906fef09.aab4b","type":"subflow:8eb7b1ae.2ce08","z":"a311dda2.7c3c6","name":"","env":[],"x":415.3068542480469,"y":37.00000190734863,"wires":[["ce72cb0c.6fb848"]]},{"id":"ce6718e2.a03dc8","type":"subflow:9b44cbd3.7e4788","z":"a311dda2.7c3c6","name":"","env":[],"x":636.1902618408203,"y":96.80956506729126,"wires":[["6836e9bb.4ce3c8"]]},{"id":"fb2c158c.900ed8","type":"subflow:8478e961.187628","z":"a311dda2.7c3c6","name":"","env":[],"x":392.0085983276367,"y":236.79831314086914,"wires":[["6153b9c3.dcca58"],["679c61e9.7b6ed"]]},{"id":"a8d5b4f.87e4848","type":"subflow:8279021a.e7a1","z":"a311dda2.7c3c6","name":"","env":[],"x":661.0000228881836,"y":165.87221717834473,"wires":[["fb2c158c.900ed8"]]},{"id":"6836e9bb.4ce3c8","type":"function","z":"a311dda2.7c3c6","name":"female && >= 15 yrs","func":"return msg;","outputs":2,"noerr":0,"x":411.81824493408203,"y":170.99722862243652,"wires":[["a8d5b4f.87e4848"],["fb2c158c.900ed8"]],"outputLabels":["female && >= 15 yrs","all others"]},{"id":"6153b9c3.dcca58","type":"subflow:562747d3.16f728","z":"a311dda2.7c3c6","name":"","env":[],"x":634.0085525512695,"y":232.5000524520874,"wires":[["679c61e9.7b6ed"]]},{"id":"679c61e9.7b6ed","type":"subflow:382e54d.1ebbcac","z":"a311dda2.7c3c6","name":"","env":[],"x":401.00569915771484,"y":304.48294830322266,"wires":[["ca7ed339.1b399"]]},{"id":"ca7ed339.1b399","type":"subflow:6c6c2e96.a3096","z":"a311dda2.7c3c6","name":"","x":628.7357769012451,"y":380.46876335144043,"wires":[]},{"id":"ce72cb0c.6fb848","type":"function","z":"a311dda2.7c3c6","name":"under 5","func":"return msg;","outputs":2,"noerr":0,"x":375.5483512878418,"y":104.90341472625732,"wires":[["ce6718e2.a03dc8"],["6836e9bb.4ce3c8"]],"outputLabels":[">= 5 yrs","all others"]},{"id":"8f15a31d.f6604","type":"subflow:a0b464d6.270658","z":"a311dda2.7c3c6","name":"","env":[],"x":134,"y":37.69892501831055,"wires":[["906fef09.aab4b"]]}]';
var vitalsJson = '[{"id":"c6ed8ab5.661998","type":"tab","label":"Vitals & Screening","disabled":false,"info":""},{"id":"4faf5c6d.6e8f74","type":"checked-in-patients-list","z":"c6ed8ab5.661998","name":"","x":137,"y":43.41193199157715,"wires":[["f0606804.f12318"]]},{"id":"f0606804.f12318","type":"height-weight","z":"c6ed8ab5.661998","name":"","x":381.1903610229492,"y":43.88919162750244,"wires":[["6e1c3941.da97f8"]]},{"id":"cfe9d4e0.7d94c8","type":"blood-pressure","z":"c6ed8ab5.661998","name":"","x":618.1930694580078,"y":101.61362552642822,"wires":[["ee5165b.aeb4198"]]},{"id":"c38523f8.557cb","type":"lab-order-pregnancy","z":"c6ed8ab5.661998","name":"","x":648.0142288208008,"y":165.76988124847412,"wires":[["1e85d0c9.3b406f"]]},{"id":"b92c2d6a.c88cb","type":"lab-order-sputum","z":"c6ed8ab5.661998","name":"","x":793.0170555114746,"y":223.75563144683838,"wires":[["208b626f.caf81e"]]},{"id":"1e85d0c9.3b406f","type":"tb-screening","z":"c6ed8ab5.661998","name":"","x":391.01988220214844,"y":229.67607879638672,"wires":[["e96fe56.2157c18"]]},{"id":"208b626f.caf81e","type":"next-appointment","z":"c6ed8ab5.661998","name":"","x":393.00853729248047,"y":294.411865234375,"wires":[["c828628f.a968d"]]},{"id":"c828628f.a968d","type":"end-flow","z":"c6ed8ab5.661998","name":"","x":593.0141830444336,"y":374.40904808044434,"wires":[]},{"id":"6e1c3941.da97f8","type":"condition","z":"c6ed8ab5.661998","name":"under 5?","func":"return msg;","outputs":2,"noerr":0,"x":375.19600677490234,"y":107.51419258117676,"wires":[["cfe9d4e0.7d94c8"],["ee5165b.aeb4198"]],"outputLabels":["age >= 5 yrs","age < 5 yrs"]},{"id":"ee5165b.aeb4198","type":"condition","z":"c6ed8ab5.661998","name":"female && >= 15 yrs?","func":"return msg;","outputs":2,"noerr":0,"x":390.196044921875,"y":167.5170373916626,"wires":[["c38523f8.557cb"],["1e85d0c9.3b406f"]],"outputLabels":["female && >= 15 yrs","all others"]},{"id":"e96fe56.2157c18","type":"condition","z":"c6ed8ab5.661998","name":"TB Suspect?","func":"return msg;","outputs":2,"noerr":0,"x":594.1932067871094,"y":230.50562477111816,"wires":[["b92c2d6a.c88cb"],["208b626f.caf81e"]],"outputLabels":["suspect","no suspect"]}]';
var checkinJson = '[{"id":"d62906f9.4ccc38","type":"subflow","name":"Patient Demographics","info":"","category":"Workflow POC EMR","in":[{"x":50,"y":30,"wires":[{"id":"f7f709.3abd58f8"}]}],"out":[{"x":550.0000076293945,"y":37.999999046325684,"wires":[{"id":"a9955b2.cda11a8","port":0}]}],"env":[]},{"id":"30276bf7.e2a344","type":"lastname","z":"d62906f9.4ccc38","name":"","x":357.00288009643555,"y":29.87788963317871,"wires":[["78530626.a59798"]]},{"id":"a9955b2.cda11a8","type":"home-address","z":"d62906f9.4ccc38","name":"","x":410.00284576416016,"y":171.93192291259766,"wires":[[]]},{"id":"f7f709.3abd58f8","type":"firstname","z":"d62906f9.4ccc38","name":"","x":176.99999237060547,"y":30.957387924194336,"wires":[["30276bf7.e2a344"]]},{"id":"a69e2ca7.54e65","type":"current-address","z":"d62906f9.4ccc38","name":"","x":210.99715423583984,"y":174.99999809265137,"wires":[["a9955b2.cda11a8"]]},{"id":"78530626.a59798","type":"birthdate","z":"d62906f9.4ccc38","name":"","x":185.9999885559082,"y":100.05964851379395,"wires":[["a69e2ca7.54e65"]]},{"id":"df67d84c.8d6f08","type":"tab","label":"Check in","disabled":false,"info":""},{"id":"5c2da2b9.cd99fc","type":"scheduled-patients-list","z":"df67d84c.8d6f08","name":"","x":112.19883728027344,"y":46.809600830078125,"wires":[["b9b6e9d0.66b138"]]},{"id":"61f9a5df.9865fc","type":"find-patient","z":"df67d84c.8d6f08","name":"","x":137.1903076171875,"y":86.9317569732666,"wires":[["b9b6e9d0.66b138"]]},{"id":"941a31ea.948d1","type":"end-flow","z":"df67d84c.8d6f08","name":"","x":563.1960067749023,"y":87.95166015625,"wires":[]},{"id":"b9b6e9d0.66b138","type":"check-in","z":"df67d84c.8d6f08","name":"","x":388.1902961730957,"y":87.99714088439941,"wires":[["941a31ea.948d1"]]},{"id":"a295544b.d32758","type":"register-patient","z":"df67d84c.8d6f08","name":"","x":128.20169067382812,"y":124.82951545715332,"wires":[["21440d1f.5b7182"]]},{"id":"21440d1f.5b7182","type":"subflow:d62906f9.4ccc38","z":"df67d84c.8d6f08","name":"","env":[],"x":288.1931686401367,"y":193.44731330871582,"wires":[["b9b6e9d0.66b138"]]}]';
var allFlowsJson = '[{"id":"39afa850.05f848","type":"tab","label":"Check in","disabled":false,"info":""},{"id":"e3dac094.f6722","type":"tab","label":"Vitals & Screening","disabled":false,"info":""},{"id":"200791bb.0fef5e","type":"subflow","name":"Patient Demographics","info":"","category":"Workflow POC EMR","in":[{"x":50,"y":30,"wires":[{"id":"ec236c6c.90e59"}]}],"out":[{"x":550.0000076293945,"y":37.999999046325684,"wires":[{"id":"cb9ede25.f50ce","port":0}]}],"env":[]},{"id":"c8fdbc8b.9f7ef","type":"scheduled-patients-list","z":"39afa850.05f848","name":"","x":112.19883728027344,"y":46.809600830078125,"wires":[["b53c0593.81ca28"]]},{"id":"11835bf3.15dd54","type":"lastname","z":"200791bb.0fef5e","name":"","x":357.00288009643555,"y":29.87788963317871,"wires":[["41124ecb.dd615"]]},{"id":"cb9ede25.f50ce","type":"home-address","z":"200791bb.0fef5e","name":"","x":410.00284576416016,"y":171.93192291259766,"wires":[[]]},{"id":"ec236c6c.90e59","type":"firstname","z":"200791bb.0fef5e","name":"","x":176.99999237060547,"y":30.957387924194336,"wires":[["11835bf3.15dd54"]]},{"id":"becb659.9643298","type":"find-patient","z":"39afa850.05f848","name":"","x":137.1903076171875,"y":86.9317569732666,"wires":[["b53c0593.81ca28"]]},{"id":"ed06d815.a5dca8","type":"end-flow","z":"39afa850.05f848","name":"","x":563.1960067749023,"y":87.95166015625,"wires":[]},{"id":"91a160ef.055a7","type":"current-address","z":"200791bb.0fef5e","name":"","x":210.99715423583984,"y":174.99999809265137,"wires":[["cb9ede25.f50ce"]]},{"id":"b53c0593.81ca28","type":"check-in","z":"39afa850.05f848","name":"","x":388.1902961730957,"y":87.99714088439941,"wires":[["ed06d815.a5dca8"]]},{"id":"41124ecb.dd615","type":"birthdate","z":"200791bb.0fef5e","name":"","x":185.9999885559082,"y":100.05964851379395,"wires":[["91a160ef.055a7"]]},{"id":"3ce5d592.5ae3ba","type":"checked-in-patients-list","z":"e3dac094.f6722","name":"","x":137,"y":43.41193199157715,"wires":[["b248299f.ccd038"]]},{"id":"b248299f.ccd038","type":"height-weight","z":"e3dac094.f6722","name":"","x":381.1903610229492,"y":43.88919162750244,"wires":[["fc4c754f.7f2e68"]]},{"id":"461a0b92.2947b4","type":"blood-pressure","z":"e3dac094.f6722","name":"","x":618.1930694580078,"y":101.61362552642822,"wires":[["22d85b03.465594"]]},{"id":"eb2f683f.0f30a8","type":"lab-order-pregnancy","z":"e3dac094.f6722","name":"","x":648.0142288208008,"y":165.76988124847412,"wires":[["269639d.6003bc6"]]},{"id":"27775b15.5d64d4","type":"lab-order-sputum","z":"e3dac094.f6722","name":"","x":793.0170555114746,"y":223.75563144683838,"wires":[["b6041f26.7e662"]]},{"id":"269639d.6003bc6","type":"tb-screening","z":"e3dac094.f6722","name":"","x":391.01988220214844,"y":229.67607879638672,"wires":[["dec86200.d97db"]]},{"id":"b6041f26.7e662","type":"next-appointment","z":"e3dac094.f6722","name":"","x":393.00853729248047,"y":294.411865234375,"wires":[[]]},{"id":"4510cab.4c9a434","type":"register-patient","z":"39afa850.05f848","name":"","x":128.20169067382812,"y":124.82951545715332,"wires":[["5fa0e979.ba14d8"]]},{"id":"5fa0e979.ba14d8","type":"subflow:200791bb.0fef5e","z":"39afa850.05f848","name":"","env":[],"x":288.1931686401367,"y":193.44731330871582,"wires":[["b53c0593.81ca28"]]},{"id":"fc4c754f.7f2e68","type":"condition","z":"e3dac094.f6722","name":"under-5","func":"return msg;","outputs":2,"noerr":0,"x":375.19600677490234,"y":107.51419258117676,"wires":[["461a0b92.2947b4"],["22d85b03.465594"]],"outputLabels":["age >= 5 yrs","age < 5 yrs"]},{"id":"22d85b03.465594","type":"condition","z":"e3dac094.f6722","name":"female-adult","func":"return msg;","outputs":2,"noerr":0,"x":360.196044921875,"y":167.5170373916626,"wires":[["eb2f683f.0f30a8"],["269639d.6003bc6"]],"outputLabels":["female && >= 15 yrs","all others"]},{"id":"dec86200.d97db","type":"condition","z":"e3dac094.f6722","name":"tb-suspect","func":"return msg;","outputs":2,"noerr":0,"x":594.1932067871094,"y":230.50562477111816,"wires":[["27775b15.5d64d4"],["b6041f26.7e662"]],"outputLabels":["suspect","no suspect"]}]';
let g = buildGraph(allFlowsJson);
g.print();

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
		// navigation buttons in footer
		switch (e.target.id) {
			case "navigation-next":
				//location = config[basename(window.location.pathname)]["next"];
				console.log("next brick: " + window.location.pathname);
				location = getNextBrick(window.location.pathname) + ".html";
				break;
			case "navigation-back":
				// console.log("previous brick: " + window.location.pathname);
				// location = getPreviousBrick(window.location.pathname) + ".html";
				window.history.back();
				break;
			case "navigation-clear":
				location.reload();
				break;
		}

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

			case "find-patient":
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

$(window).on('load', function() {
	document.getElementById('footer-area').value = basename(window.location.pathname);

	if (g.transitionsForNode(getPathname(window.location.pathname)).length == 0) {
		// $("#navigation-next").addClass('d-none');
		$("#navigation-next").text('Finish');
		$("#navigation-clear").prop('disabled', true);
	} else {
		$("#navigation-next").text('Next');
		$("#navigation-clear").prop('disabled', false);
	}
	if (g.backwardsTransitionsForNode(getPathname(window.location.pathname)).length == 0) {
		$("#navigation-back").prop('disabled', true);
	} else {
		$("#navigation-back").prop('disabled', false);
	}


});

