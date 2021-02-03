var photo;

function onLoadTakePhoto() {
	const webcamElement = document.getElementById('webcam');
	const canvasElement = document.getElementById('canvas');
	const snapSoundElement = document.getElementById('snapSound');
	const webcam = new Webcam(webcamElement, 'environment', canvasElement, snapSoundElement);
	
	 webcam.start()
    .then(result =>{
       console.log("webcam started");
    })
    .catch(err => {
        console.log(err);
    });

	loadCurrentPatient(function() {
	});
	$('#btn-snap').click(function() {
		photo = webcam.snap();
		$('#camera-output').attr('src', photo);
		$('#webcam').addClass('d-none');
		// $('#canvas').addClass('d-none');
		$('#camera-output').removeClass('d-none');
		$('#btn-undo').removeClass('d-none');
		$('#btn-snap').addClass('d-none');
		$('#btn-flip').addClass('d-none');
		webcam.stop();
	});
	$('#btn-flip').click(function() {
		webcam.flip();
		// webcam.start();
	});
	$('#btn-undo').click(function() {
		photo = "";
		$('#camera-output').attr('src', "");
		$('#webcam').removeClass('d-none');
		// $('#canvas').addClass('d-none');
		$('#camera-output').addClass('d-none');
		webcam.start();
		$('#btn-undo').addClass('d-none');
		$('#btn-snap').removeClass('d-none');
		$('#btn-flip').removeClass('d-none');
	});
}

function hookNextTakePhoto(e) {
	console.log(photo);
	if (photo) {
	var m = {};
	m['photo'] = photo;
	$.ajax({
	    type: "POST",
	    url: "/patients/" + currentPatient.id + "/media",
	    // The key needs to match your method's input parameter (case-sensitive).
	    data: JSON.stringify(m),
	    contentType: "application/json; charset=utf-8",
	    dataType: "json",
	    success: function(data){
			// updateCurrentPatient(data);
			// loadCurrentPatient(function() {
			// });
			// alert('Data saved');
			// location = 'flow-select.html';
		},
	    error: function(errMsg) {
	        alert("Upsi" + errMsg);
	    },
		async:false
	});
}
}
