const fs = require('fs');
const cfutil = require('../modules/cfutil');
var config = require('../config');

exports.init = function(dataChangeEmitter) {

	dataChangeEmitter.on('patientUpdate', (patient) => {
		appendLog("U", "demographics", patient);
	});

	dataChangeEmitter.on('patientCreate', (patient) => {
		appendLog("C", "demographics", patient);
	});

	dataChangeEmitter.on('patientVoid', (patient) => {
		appendLog("V", "demographics", patient);
	});

	dataChangeEmitter.on('encounterCreate', (encounter) => {
		appendLog("C", "encounter", encounter);
	});

	dataChangeEmitter.on('encounterUpdate', (encounter) => {
		appendLog("U", "encounter", encounter);
	});

	dataChangeEmitter.on('encounterVoid', (encounter) => {
		appendLog("V", "encounter", encounter);
	});

	function appendLog(action, type, object) {
	    var writeStream = fs.createWriteStream(config.repository.transaction + '/log-' + cfutil.currentDatestamp() + '.log', {flags: 'a'});
		writeStream.write('{"action":"' + action + '","type":"' + type + '","object":' + JSON.stringify(object) + '}\n\n');
		writeStream.end();
	    writeStream.on('error', function (err) {
	      console.log(err);
	    });
	}
};
