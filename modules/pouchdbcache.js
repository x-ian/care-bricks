const fs = require('fs');
const path = require('path');
// const dataPath = path.join(__dirname, "../../data-lh");
var config = require('../config');

exports.init = function(dataChangeEmitter, db) {

	
		const glob = require("glob");
		console.log("importing all patient files into pouch from ..." + config.repository.data);
		glob(config.repository.data + '/**/*_patient.json', {}, (err, files) => {

			files.forEach(file => {
				// guess there is a better way than using sync, but I'm too lazy
				var data = fs.readFileSync(file);
				var p = JSON.parse(data);
				p._id = p.id;
			    db.put(p, function callback(err, result) {
			      if (!err) {
			      } else {
					  console.log('Error PouchDB: ' + err);
			      }
			    });
				// console.log('run statement');
			});
			console.log("importing done");
			// db.each("SELECT * FROM patientcache", function(err, row) {
			// 		if (err) {
			// 			console.log(err);
			// 		}
			//   console.log(row.id + ": " + row.givenname);
			// });
			console.log('run done');
		});

	dataChangeEmitter.on('patientUpdate', (patient) => {
		console.log("patientUpdate: " + patient);
	});

	dataChangeEmitter.on('patientCreate', (patient) => {
		var stmt = db.prepare("INSERT INTO patientcache VALUES (?, ?, ?, ?, ?)");
		stmt.run(patient.id, patient.givenname, patient.familyname, patient.facilityId, patient.nationalId);
		stmt.finalize();
	});

	dataChangeEmitter.on('patientVoid', (patient) => {
		console.log("patientVoid: " + patient);
	});
};
