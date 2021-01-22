const fs = require('fs');
const fsp = require('fs').promises;
const cfutil = require('../modules/cfutil');
var config = require('../config');

var dir = config.repository + '/flattable-register-with-vitals/';

exports.init = function(dataChangeEmitter) {

	fs.mkdirSync(dir);
	
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
		
		if (encounter.type === 'art-visit') {
			
		}
	});

	dataChangeEmitter.on('encounterUpdate', (encounter) => {
		appendLog("U", "encounter", encounter);
	});

	dataChangeEmitter.on('encounterVoid', (encounter) => {
		appendLog("V", "encounter", encounter);
	});

	function transformEncounter(action, encounter) {
		var patientId = encounter.patientId;
		
		const data = await fsp.readFile(dir + '/' + patientId);
		
		if ((data.match(/;/g) || []).length === 7) {
			// no vitals yet, only demographics
			// append vitals
		} else {
			// older vitals already
			// replace vitals
		}
		
		
	    var writeStream = fs.createWriteStream(dir + '/log-' + cfutil.currentDatestamp() + '.log', {flags: 'a'});
		writeStream.write('{"action":"' + action + '","type":"' + type + '","object":' + JSON.stringify(object) + '}\n\n');
		writeStream.end();
	    writeStream.on('error', function (err) {
	      console.log(err);
	    });
	}
};
