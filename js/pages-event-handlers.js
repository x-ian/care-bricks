// BSS isnt strong with Javascript code in each file. It works via Custom Component, but has some issues with the timing of loading the page.
// So some stuff doesn't appear be possible, e.g. $ from jQuery not yet loaded, so custom code for each file
// is aggregated here and checks for specific page/body ids to be triggered.

// read node red json flow
// better not done every page reload, but so it be for now...
var jsonFlow = null;
$(function(){
	// this appears to be evil - sync call in main worker
	jsonFlow = $.parseJSON(
    $.ajax(
        {
           url: "http://localhost:8000/node-red-flows.json",
           async: false,
					 cache: false,
           dataType: 'json'
        }
    ).responseText
	);
});

function toUpperCaseFirstLetter(string)  {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function getUrlParam(param) {
	let searchParams = new URLSearchParams(window.location.search);
	return searchParams.get(param);
}

function formatDate(date) {
	const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
	return ("0" + date.getDate()).slice(-2) + "-" + monthNames[date.getMonth()] + "-" + date.getFullYear();
}

// ---------------------------------------------------------
// all page onload stuff

function processPageDemographicAttribute() {
	$('#alphapad').addClass('d-none');
	$('#keypad').addClass('d-none');
	$('#datepad').addClass('d-none');
	$('#booleanpad').addClass('d-none');
	let nodeid = getUrlParam('nodeid');
 	var node = nodeById(jsonFlow, nodeid);
	$('#input-label').contents().last().replaceWith(node.label);
	switch (node.datatype) {
		case 'decimal':
			$('#keypad-dot').prop('disabled', false);
			$('#keypad').removeClass('d-none');
			break;
		case 'integer':
			$('#keypad-dot').prop('disabled', true);
			$('#keypad').removeClass('d-none');
			break;
		case 'text':
			$('#alphapad').removeClass('d-none');
			break;
		case 'date':
			$('#datepad').removeClass('d-none');
			break;
		case 'boolean':
			$('#booleanpad').removeClass('d-none');
			break;
	}
}

function processPageFlowSelect() {
  var flows = allFlows2(jsonFlow);

  for (const flow of flows) {
    // todo, dynamic element creation better done via jquery
    var allFlows = document.getElementById('all-flows');
    var divRow = document.createElement("div");
    divRow.className="row";
    var divButton = document.createElement("div");
    divButton.className="col text-center"
    var button = document.createElement("a");
    button.className="btn btn-primary text-center";
    button.appendChild(document.createTextNode(flow.label));
    button.href="flow-start-nodes.html?flowid=" + flow.id;
    button.role="button";
    divButton.appendChild(button);
    divRow.appendChild(divButton);
    allFlows.appendChild(divRow);

    divRow = document.createElement("div");
    divRow.className="row";
    var divHr = document.createElement("div");
    divHr.className="col text-center"
    divHr.appendChild(document.createElement("hr"));
    divRow.appendChild(divHr);
    allFlows.appendChild(divRow);
  }
}

function processPageFlowStartNodes() {
  var flows = allFlows2(jsonFlow);

  let flowid = getUrlParam('flowid');

  for (const flow of flows) {
    if (flow.id === flowid) {
      for (const node of allStartNodes(jsonFlow, flow)) {
        // todo, dynamic element creation better done via jquery
        var allFlows = document.getElementById('all-flows');
        var divRow = document.createElement("div");
        divRow.className="row";
        var divButton = document.createElement("div");
        divButton.className="col text-center"
        var button = document.createElement("a");
        button.className="btn btn-primary text-center";
        button.appendChild(document.createTextNode(node.type));
        button.href=node.type + ".html?nodeid=" + node.id;
        button.role="button";
        divButton.appendChild(button);
        divRow.appendChild(divButton);
        allFlows.appendChild(divRow);

        divRow = document.createElement("div");
        divRow.className="row";
        var divHr = document.createElement("div");
        divHr.className="col text-center"
        divHr.appendChild(document.createElement("hr"));
        divRow.appendChild(divHr);
        allFlows.appendChild(divRow);
      }
    }
  }
}

function processPageFunction() {
	processPageSwitch();
}

function processPageHeightWeight(e) {
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
}

function processPageSwitch() {
	let nodeid = getUrlParam('nodeid');
	let next = nextNodes(jsonFlow, nodeById(jsonFlow, nodeid));
	let newUrl = next.type + ".html?nodeid=" + next.id;

	let div = $('#all-transitions');

	$.each(next, function (key, entry) {
		div.append('<div class=row><div class="col text-center"><a class="btn btn-primary text-center" role=button href=' + entry.type + '.html?nodeid=' + entry.id  + '>' + entry.type + ' ' + entry.name + '</a></div></div>');
		div.append('<div class=row><div class="col text-center"><hr/></div></div>');
	});
}

function processPageVisitQuestion() {
	processPageDemographicAttribute();
	
	let nodeid = getUrlParam('nodeid');
  var node = nodeById(jsonFlow, nodeid);
	$('#input-label').contents().last().replaceWith(node.label);
}

function processPageVisitSelect() {
	processPageDemographicAttribute();
	
	let nodeid = getUrlParam('nodeid');
  var node = nodeById(jsonFlow, nodeid);
	$('#input-label').contents().last().replaceWith(node.label);
	
	let div = $('#select-entries');

	$.each(node.devices, function (key, entry) {		
		div.append('<li class="list-group-item list-group-item-action"><span>' + entry.sid + '</span></li>');
	});
	
	
}

// ---------------------------------------------------------
// all page-specific button handlers

function processButtonBloodPressure(e) {
	if (e.target.id.startsWith("bppad-sys-")) {
		document.getElementById('input-bp-sys').value = e.target.id.substring(10);
	}
	if (e.target.id.startsWith("bppad-dia-")) {
		document.getElementById('input-bp-dia').value = e.target.id.substring(10);
	}
}

function processPageCheckedInPatientsList() {
	var jsonExampleCheckedInPatientsList = [
		{ "name": "Christian Neumann - male - 19 years", "value": "1"}
		, { "name": "Beth Dunbar - female - 17 years", "value": "2"}
	];
	let dropdown = $('#checked-in-patients');

  $.each(jsonExampleCheckedInPatientsList, function (key, entry) {
    dropdown.append('<option class=emr-select-option value=' + entry.value + '>' + entry.name + '</option>');
  });
}

function processButtonDemographicAttribute(e) {
	defaultButtonAlphapad(e);
	defaultButtonKeypad(e);
	defaultButtonDatepad(e);
}

function processButtonDemographicBirthdate(e) {
	defaultButtonDatepad(e);
  if (e.target.id.startsWith("age-in-years-")) {
		document.getElementById('age-in-years').value = e.target.id.substring(13);
	}
}

function processButtonFindPatient(e) {
	defaultButtonAlphapad(e);
	defaultButtonKeypad(e);
}

function processButtonNextAppointment(e) {
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

function processButtonVisitQuestion(e) {
	defaultButtonAlphapad(e);
	defaultButtonKeypad(e);
	defaultButtonDatepad(e);
	// defaultButtonBooleanpad(e);
}

function defaultButtonAlphapad(e) {
	if (e.target.id.startsWith("alphapad-bksp")) {
		document.getElementById('input').value = document.getElementById('input').value.substring(0, document.getElementById('input').value.length-1);
	} else if (e.target.id.startsWith("alphapad-dash")) {
		document.getElementById('input').value += '-';
	} else if (e.target.id.startsWith("alphapad-quote")) {
		document.getElementById('input').value += '\'';
	} else if (e.target.id.startsWith("alphapad-space")) {
		document.getElementById('input').value += ' ';
	} else if (e.target.id.startsWith("alphapad-")) {
		document.getElementById('input').value += e.target.id.substring(9);
		document.getElementById('input').value = toUpperCaseFirstLetter(document.getElementById('input').value);
	}
}

function defaultButtonKeypad(e) {
	if (e.target.id.startsWith("keypad-bksp")) {
		document.getElementById('input').value = document.getElementById('input').value.substring(0, document.getElementById('input').value.length-1);
	} else if (e.target.id.startsWith("keypad-dot")) {
		document.getElementById('input').value += '.';
	} else if (e.target.id.startsWith("keypad-")) {
		document.getElementById('input').value += e.target.id.substring(7);
	}
}

function defaultButtonDatepad(e) {
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
}

// ---------------------------------------------------------
// register event handlers

$(function(){

	// try to load page specific stuff from dedicated JS files
	// https://api.jquery.com/jQuery.getScript/

	// change active class based on selection in all list-groups; currently prevents multiselect
	$('.list-group li').click(function(e) {
		e.preventDefault();
		$that = $(this);
		$that.toggleClass('active');
	});
	$('.list-group:not(.multiple) li').click(function(e) {
		e.preventDefault();
		$that = $(this);
		$that.parent().find('li').removeClass('active');
		$that.addClass('active');
		if($('html').is('#page-current-address') || $('html').is('#page-home-address')){
	    processPageCheckedInPatientsList();
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

	if($('html').is('#page-checked-in-patients-list')){
    processPageCheckedInPatientsList();
	}
	if($('html').is('#page-demographic-attribute')){
    processPageDemographicAttribute();
	}
	if($('html').is('#page-flow-select')){
    processPageFlowSelect();
	}
	if($('html').is('#page-flow-start-nodes')){
    processPageFlowStartNodes();
	}
	if($('html').is('#page-height-weight')){
    processPageHeightWeight();
	}
	if($('html').is('#page-switch')){
    processPageSwitch();
	}
	if($('html').is('#page-function')){
    processPageFunction();
	}
	if($('html').is('#page-visit-question')){
    processPageVisitQuestion();
	}
	if($('html').is('#page-visit-select')){
    processPageVisitSelect();
	}
});

$('.btn').click(function(e) {
	// navigation buttons in footer
	switch (e.currentTarget.id) {
		case "navigation-next":
			let nodeid = getUrlParam('nodeid');
			console.log(nodeid);
			let next = nextNode(jsonFlow, nodeById(jsonFlow, nodeid))[0];
			console.log(next);
			if (typeof next === 'undefined') {
				alert('Missing outgoing connection in workflow definition!');
			}
			
			let newUrl = next.type + ".html?nodeid=" + next.id;
			console.log(newUrl);
			location= newUrl;
			break;
		case "navigation-back":
			// console.log("previous brick: " + window.location.pathname);
			// location = getPreviousBrick(window.location.pathname) + ".html";
			window.history.back();
			break;
		case "navigation-clear":
			location = 'flow-select.html';
			break;
		case "navigation-finish":
			location = 'flow-select.html';
			break;
		case "navigation-cancel":
			location = 'flow-select.html';
			break;
	}

	console.log($("html")[0].id);
	switch($("html")[0].id) {
		case 'page-blood-pressure':
			processButtonBloodPressure(e);
			break;
		case 'page-demographic-attribute':
			processButtonDemographicAttribute(e);
			break;
		case 'page-demographic-birthdate':
			processButtonDemographicBirthdate(e);
			break;
		case 'page-find-patient':
			processButtonFindPatient(e);
			break;
		case 'page-next-appointment':
			processButtonNextAppointment(e);
			break;
		case 'page-visit-question':
			processButtonVisitQuestion(e);
			break;
	}
});
