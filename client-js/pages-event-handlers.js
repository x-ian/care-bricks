// BSS isnt strong with Javascript code in each file. It works via Custom Component, but has some issues with the timing of loading the page.
// So some stuff doesn't appear be possible, e.g. $ from jQuery not yet loaded, so custom code for each file
// is aggregated here and checks for specific page/body ids to be triggered.

// read node red json flow
// better not done every page reload, but so it be for now...
var jsonFlow = null;
$(function(){
	
	// var jqxhr = $.getJSON( "http://localhost:8000/assets/resources/node-red-flows.json", function() {
	//   console.log( "success" );
	// });
	
	
	// this appears to be evil - sync call in main worker
	jsonFlow = $.parseJSON(
	    $.ajax(
	        {
	           url: "assets/resources/node-red-flows.json",
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
// common onload stuff for pages

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
		case 'string':
			$('#alphapad').removeClass('d-none');
			break;
		case 'date':
		case 'time':
		case 'dateTime':
			$('#datepad').removeClass('d-none');
			break;
		case 'boolean':
			$('#booleanpad').removeClass('d-none');
			break;
	}
}

// ---------------------------------------------------------
// common button handlers

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

function defaultButtonBooleanpad(e) {
	if (e.target.id.startsWith("booleanpad-yes")) {
		document.getElementById('input').value = 'Yes';
	} else if (e.target.id.startsWith("booleanpad-no")) {
		document.getElementById('input').value = 'No';
	}
}

// ---------------------------------------------------------
// register event handlers
$(function(){
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

	// load onload functions if page provides them
	// https://api.jquery.com/jQuery.getScript/
	pageId = $('html').attr('id');
	if (pageId.startsWith('page-')) {
		pageName = pageId.substring(5, pageId.length);
		$.get("assets/client-js/bricks/" + pageName + ".js")
			.done(function() { 
				$.getScript( "assets/client-js/bricks/" + pageName + ".js" )
					.done(function( script, textStatus ) {
						console.log("Loading page-specific script file: " + pageName );
						// processPageFindPatient();
						onLoadFunctionName = pageName.replace( /-([a-z])/ig, function( all, letter ) {
							return letter.toUpperCase();
						});
						onLoadFunctionName = onLoadFunctionName[0].toUpperCase() + onLoadFunctionName.slice(1);
						if (eval("typeof " + 'onLoad' + onLoadFunctionName) === 'function') {
							console.log('calling ' + 'onLoad' + onLoadFunctionName);
							// loadCurrentPatient(function() {});
							// loadCurrentEncounter(function() {});
							self['onLoad' + onLoadFunctionName]();
						} else {
							// make sure that at least the header is set
							loadCurrentPatient(function() {});
							console.log("No onLoad function provided by module " + onLoadFunctionName);
						}
					})
					.fail(function( jqxhr, settings, exception ) {
						console.log("Loading FAILED for page-specific script file: " + pageName );
					});
				})
			.fail(function() { 
				// make sure that at least the header is set
				loadCurrentPatient(function() {});
				console.log("No page-specific script file found: " + pageName );
			})
	}

});

// respond to keys pressed
$(document).keypress(function(e) {
	event.preventDefault();
	if ($('#navigation-next').prop('disabled') === false) {
		if(e.which == 13) {
		// enter pressed
			nextPressed(e);
		}
	};
});

// repsond to buttons clicked
$('.btn').click(function(e) {

	// navigation buttons in footer
	switch (e.currentTarget.id) {
		case "navigation-next":
			nextPressed(e);
			break;
		case "navigation-back":
			// console.log("previous brick: " + window.location.pathname);
			// location = getPreviousBrick(window.location.pathname) + ".html";
			window.history.back();
			break;
		case "navigation-clear":
			// loadCurrentPatient from previous step
			location.reload();
			break;
		case "navigation-finish":
			finishPressed(e)
			break;
		case "navigation-cancel":
			location = 'flow-select.html';
			break;
	}
});

function nextPressed(e) {
	// prepare module specific button handlers
	pageId = $("html")[0].id;
	moduleName = "";
	if (pageId.startsWith('page-')) {
		pageName = pageId.substring(5, pageId.length);
		moduleName = pageName.replace( /-([a-z])/ig, function( all, letter ) {
			return letter.toUpperCase();
		});
		moduleName = moduleName[0].toUpperCase() + moduleName.slice(1);
	}

	let nodeid = getUrlParam('nodeid');
	let stepid = getUrlParam('stepid');
	stepid++;
	let next = nextNode(jsonFlow, nodeById(jsonFlow, nodeid))[0];
	if (typeof next === 'undefined') {
		alert('Missing outgoing connection in workflow definition!');
	}
	// store
	let newUrl = next.type + ".html?stepid=" + stepid + "&nodeid=" + next.id;
	// console.log(newUrl);

	console.log(newUrl + ' ' + eval("typeof " + 'hookNext' + moduleName));
	if (eval("typeof " + 'hookNext' + moduleName) === 'function') {
		console.log('calling ' + 'hookNext' + moduleName);
		self['hookNext' + moduleName](e);
		updateCurrentEncounter(currentEncounter);
		updateCurrentPatient(currentPatient);
	} else {
		console.log("No hookNext function provided by module " + moduleName);
	}

	location= newUrl;
}

function finishPressed(e) {
	$.ajax({
	    type: "POST",
	    url: "/patients/" + currentPatient.id + "/encounters/",
	    // The key needs to match your method's input parameter (case-sensitive).
	    data: JSON.stringify(currentEncounter),
	    contentType: "application/json; charset=utf-8",
	    dataType: "json",
	    success: function(data){
			// alert('Data saved');
			location = 'flow-select.html';
		},
	    error: function(errMsg) {
			console.log("errMsg");
			console.log(JSON.stringify(errMsg));
	        alert(errMsg);
	    }
	});
}