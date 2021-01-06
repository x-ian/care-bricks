const fs = require('fs');
const path = require('path');
// const dataPath = path.join(__dirname, "../../data-lh");
var config = require('../config');

exports.init = function(dataChangeEmitter, db) {

	db.serialize(function() {
		cacheName(db);
		cacheQueue(db);
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
	
	dataChangeEmitter.on('encounterCreate', (encounter) => {
		if (encounter.type === 'art_visit') {
			var stmt = db.prepare("INSERT INTO queuecache VALUES (?, ?, ?, ?, ?)");
			stmt.run(encounter.patientId, encounter.id, encounter.type, encounter['Visit Date'], false);
			stmt.finalize();
		}
	});

	dataChangeEmitter.on('encounterUpdate', (encounter) => {
		console.log("encounterUpdate: " + patient);
	});

	dataChangeEmitter.on('encounterVoid', (encounter) => {
		console.log("encounterVoid: " + patient);
	});

	
	function cacheName(db) {
		db.run("CREATE TABLE patientcache (uuid TEXT, givenname TEXT, familyname TEXT, facilityid TEXT, nationalid TEXT)");

		var stmt = db.prepare("INSERT INTO patientcache VALUES (?, ?, ?, ?, ?)");
		const glob = require("glob");
		console.log("importing all patients...");
		var i = 0;
		glob(config.repository.data + '/*/*_patient.json', {}, (err, files) => {

			files.forEach(file => {
				// guess there is a better way than using sync, but I'm too lazy
				var data = fs.readFileSync(file);
				var p = JSON.parse(data);
				stmt.run(p.id, p.givenname, p.familyname, p.facilityId, p.nationalId);
				i++;
			});
			stmt.finalize();
			console.log("patient import done: " + i);
		});
	};
	
	function cacheQueue(db) {
		db.run("CREATE TABLE queuecache (patientuuid TEXT, encounteruuid TEXT, queuename TEXT, d DATE, fulfilled BOOLEAN)");

		var stmt = db.prepare("INSERT INTO queuecache VALUES (?, ?, ?, ?, ?)");
		const glob = require("glob");
		console.log("importing all hiv appointments...");
		var i = 0;
		glob(config.repository.data + '/*/*_art-visit_*.json', {}, (err, files) => {

			files.forEach(file => {
				// guess there is a better way than using sync, but I'm too lazy
				var data = fs.readFileSync(file);
				var e = JSON.parse(data);
				stmt.run(e.patientId, e.id, e.type, e['Visit Date'], false);
				console.log(e.patientId, e.id, e.type, e['Visit Date'], false);
				i++;
			});
			stmt.finalize();
			console.log("appointment import done: " + i);
		});
	};
	
};
