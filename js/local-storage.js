var db;
db = new Dexie("flows");
db.version(1).stores({
	currentPatient: '[sessionId+flowId+stepId]'
});
db.open();

var currentPatient = null;

function loadCurrentPatient(callback) {
	db.currentPatient.get({
		"sessionId": 1,
		"flowId": 1,
		"stepId": 1
	}, function(f) {
		currentPatient = f.currentPatient;
		if (typeof callback == "function")
			callback();
	});
}

function updateCurrentPatient(patient) {
	db.currentPatient.put({
		"sessionId": 1,
		"flowId": 1,
		"stepId": 1,
		"currentPatient": patient
	});
}
