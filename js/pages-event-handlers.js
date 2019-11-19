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

function processPageDemographicAttribute() {
	$('#alphapad').addClass('d-none');
	$('#keypad').addClass('d-none');
	$('#datepad').addClass('d-none');
	let nodeid = getUrlParam('nodeid');
  var node = nodeById(jsonFlow, nodeid);
	$('#input-label').contents().last().replaceWith(node.label);
	switch (node.datatype) {
		case 'decimal':
		case 'integer':
			$('#keypad').removeClass('d-none');
			break;
		case 'text':
			$('#alphapad').removeClass('d-none');
			break;
		case 'date':
			$('#datepad').removeClass('d-none');
			break;
	}
}

function processPageVisitQuestion() {
	let nodeid = getUrlParam('nodeid');
  var node = nodeById(jsonFlow, nodeid);
	$('#input-label').contents().last().replaceWith(node.label);
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

function processPageFunction() {
	processPageSwitch();
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

function processButtonDemographicAttribute(e) {
	defaultButtonAlphapad(e);
}

function processButtonVisitQuestion(e) {
	defaultButtonAlphapad(e);
}

function processButtonFindPatient(e) {
	defaultButtonAlphapad(e);
	defaultButtonKeypad(e);
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

$(function(){
  if($('html').is('#page-flow-select')){
    processPageFlowSelect();
	}
	if($('html').is('#page-flow-start-nodes')){
    processPageFlowStartNodes();
	}
	if($('html').is('#page-demographic-attribute')){
    processPageDemographicAttribute();
	}
	if($('html').is('#page-checked-in-patients-list')){
    processPageCheckedInPatientsList();
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
});

$('.btn').click(function(e) {
	// navigation buttons in footer
	switch (e.currentTarget.id) {
		case "navigation-next":
			let nodeid = getUrlParam('nodeid');
			let next = nextNode(jsonFlow, nodeById(jsonFlow, nodeid))[0];
			let newUrl = next.type + ".html?nodeid=" + next.id;
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

	switch($("html")[0].id) {
		case 'page-demographic-attribute':
			processButtonDemographicAttribute(e);
			break;
		case 'page-visit-question':
			processButtonVisitQuestion(e);
			break;
		case 'page-find-patient':
			processButtonFindPatient(e);
			break;
		case 'page-flow-select':
    	processButtonFlowSelect();
			break;
		case 'page-flow-start-nodes':
    	processButtonFlowStartNodes();
			break;
	}
});
