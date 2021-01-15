var x;
var lat, lng;
var lng;

function onLoadDeviceCoordinates() {
	loadCurrentPatient(function() {});
	loadCurrentEncounter(function() {
		x = $('#osm');
		// $('#input-label').contents().last().replaceWith("Current location " + getLocation());
	    if (navigator.geolocation) {
	        navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
	    } else {
	        // x.append = "Geolocation is not supported by this browser.";
			console.log("error");
	    }
		
	});
}

function errorCallback() {
	console.log("Error retrieving device coordinates");
}

function successCallback(position) {
	console.log(position);
	// var mapUrl = "http://maps.google.com/maps/api/staticmap?center=";
	// mapUrl = mapUrl + position.coords.latitude + ',' + position.coords.longitude;
	// mapUrl = mapUrl + '&zoom=15&size=512x512&maptype=roadmap&sensor=false';
	// var imgElement = document.getElementById("image");
	// imgElement.src = mapUrl;

	lat = position.coords.latitude;
	lng = position.coords.longitude;
	
	console.log(lat, lng);
	$('#osm').append('<iframe width="425" height="350" frameborder="0" scrolling="no" marginheight="0" marginwidth="0" src="https://www.openstreetmap.org/export/embed.html?bbox= 8.12370300292969 %2C 49.80431392204895 %2C 8.460159301757814 %2C 49.93951039093599 &amp;layer=mapnik" style="border: 1px solid black"></iframe><br/><small><a href="https://www.openstreetmap.org/#map=12/49.8720/8.2919">View Larger Map</a></small>');

}

function hookNextDeviceCoordinates(e) {
	currentEncounter['latitude'] = lat;
	currentEncounter['longitude'] = lng;
	updateCurrentEncounter(currentEncounter);
}