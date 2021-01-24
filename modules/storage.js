const fs = require('fs');
var config = require('../config');
const path = require('path');
const fsp = require('fs').promises;
const cfutil = require('./cfutil');
const util = require('util');
const g = require("glob");
const glob = util.promisify(g);

exports.init = function() {
};

exports.readPatient = async function (uuid) {
	let data = await fsp.readFile(path.join(config.repository.data, uuid, uuid + '_patient.json'));
	return data;
};

exports.createPatient = async function(patient) {
	patient.id = cfutil.UUIDGeneratorNode();
	console.log("create patient called " + patient.id);
	patient.rev = 1;
	patient.parentRev = 0;
	let meta = {};
	meta.workflow = "";
	meta.workflowVersion = "";
	meta.schemaVersion = "";
	meta.revision = "";
	meta.guidelinesRevision = "";
	meta.contributingStations = [];
	meta.createdAt = new Date();
	meta.createdBy = "";
	meta.updatedAt = "";
	meta.updatedBy = ""
	patient.meta = meta;

	await fsp.mkdir(path.join(config.repository.data, patient.id), { recursive: true });
	await fsp.writeFile(path.join(config.repository.data, patient.id, patient.id + '_patient.json'), JSON.stringify(patient, null, 2), 'utf-8'); 
	return patient;
}

exports.searchAllPatients = async function() {
	// was a bit tricky, but got it eventually for async iterator 
	// https://zellwk.com/blog/async-await-in-loops/
	let files = await glob(config.repository.data + '/**/*_patient.json', {});

	const promises = files.map(async file => {
		const data = await fsp.readFile(file);
		return JSON.parse(data);
	})

	const jsonArray = await Promise.all(promises);
	return jsonArray;
}

exports.searchPatientsByName = async function(name) {
	const exec = util.promisify(require('child_process').exec);
	
	const jq = '/usr/bin/find ' + config.repository.data + ' -name "*_patient.json" -print0 | /usr/bin/xargs -0 /usr/local/bin/jq \'select((.givenname | test("' + name + '";"i")) or (.familyname | test("' + name + '";"i"))) .id\'';
	const { stdout, stderr } = await exec(jq); 

	// console.log('stdout:', stdout);
	console.error('stderr:', stderr);
	var str = stdout.toString();
	var lines = str.split(/(\r?\n)/g);
	const promises = lines.filter(function(line) {
		// filter undefined, null; maybe instead of filter and map use reduce
		if (line && line.trim()) {
			return true;
		} else {
			return false;
		}
		}).map(async line => {
			if (line && line.trim()) {
				//First condition to check if string is not empty
				//Second condition checks if string contains not just whitespace
				var uuid = line.trim().replace(/['"]+/g, '');
				const data = await fsp.readFile(config.repository.data + '/' + uuid + "/" + uuid + "_patient.json");
				return JSON.parse(data);
			}
	});
	const jsonArray = await Promise.all(promises);
	return jsonArray;
}
	
exports.searchPatientsByNameInmemoryTodo = async function(name) {

	// using inmemory sqlite3
	var jsonArray = [];
	db.all("SELECT uuid FROM patientcache WHERE givenname like '%" + name + "%' OR familyname like '%" + name + "%' OR facilityid like '" + name + "%' OR nationalid like '" + name + "%'", async function(err, rows) {
		if (err) {
			throw err;
		}

		const promises = rows.map(async row => {
			const data = await fsp.readFile(config.repository.data + '/' + row.uuid + "/" + row.uuid + "_patient.json");
			return JSON.parse(data);
		});
		const jsonArray = await Promise.all(promises)
		res.send(jsonArray);
	});
}

exports.searchAllEncountersFromPatient = async function(uuid) {
	let files = await glob(config.repository.data + '/' + uuid + '/*_*_*.json', {});
	const promises = files.map(async file => {
		const data = await fsp.readFile(file);
		return JSON.parse(data);
	})
	const jsonArray = await Promise.all(promises)
	return jsonArray;
}

exports.readEncounter = async function(uuid) {
	let files = await glob(config.repository.data + '/*/*_' + uuid + '.json', {});
	const data = await fsp.readFile(files[0], 'utf8');
	return JSON.parse(data);	
}

exports.createEncounter = async function(uuid, encounter) {
	encounter.patientId = uuid;
	encounter.id = cfutil.UUIDGeneratorNode();
	encounter.rev = 1;
	encounter.parentRev = 0;
	let meta = {};
	meta.workflow = "";
	meta.workflowVersion = "";
	meta.schemaVersion = "";
	meta.revision = "";
	meta.guidelinesRevision = "";
	meta.contributingStations = [];
	meta.createdAt = new Date();
	meta.createdBy = "";
	meta.updatedAt = "";
	meta.updatedBy = ""
	encounter.meta = meta;

	await fsp.writeFile(path.join(config.repository.data, uuid, cfutil.currentTimestamp() + '_' + encounter.type + '_' + encounter.id + '.json'), JSON.stringify(encounter, null, 2), 'utf-8');
	return encounter;
}

exports.queue = async function(encountertype, date) {
	let files = await glob(config.repository.data + '/*/' + date + '-*_' + encountertype + '*.json', {});
	const promises = files.map(async file => {
		const encounter = await fsp.readFile(file);
		var dir = file.substring(0, file.lastIndexOf('/'));
		var patientid = dir.substring(dir.lastIndexOf('/'));
		const patient = await fsp.readFile(dir + '/' + patientid + '_patient.json');
		return JSON.parse(patient);
	})
	const jsonArray = await Promise.all(promises)
	return jsonArray;
}

exports.queueInmemoryTodo = async function(queuename, date) {
	
	var jsonArray = [];
	db.all("SELECT * FROM queuecache WHERE queuename = '" + queuename + "' AND d = '" + date + "' AND fulfilled = false", async function(err, rows) {
		if (err) {
			throw err;
		}

		const promises = rows.map(async row => {
			try {
				const data = await fsp.readFile(config.repository.data + '/' + row.patientuuid + "/" + row.patientuuid + "_patient.json");
				return JSON.parse(data);
			} catch (e) {
				return null;
			}
		});
		const jsonArray = await Promise.all(promises);
	});
}

