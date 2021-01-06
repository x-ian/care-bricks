
const patientsRoutes = (app, db, dataChangeEmitter) => {

	const cfutil = require('../modules/cfutil');
	const fs = require('fs');
	const fsp = require('fs/promises');
	var config = require('../config');
	const g = require("glob");
	const path = require('path');
	const util = require('util');
	const glob = util.promisify(g);

	// ---------------------------- patients 
	// READ
	app.get('/patients', async(req, res, next) => {
		try {
			const name = req.query.name;
			console.log("search patient: " + name);

			if (name === undefined) {
				try {
					// was a bit tricky, but got it eventually for async iterator 
					// https://zellwk.com/blog/async-await-in-loops/
					let files = await glob(config.repository.data + '/**/*_patient.json', {});

					const promises = files.map(async file => {
						const data = await fsp.readFile(file);
						return JSON.parse(data);
					})

					const jsonArray = await Promise.all(promises)
					res.send(jsonArray);
				} catch (e) {
					console.log(e);
					next(e);
				}
			} else {
				if (false) {
					// fulltext search via find and jq
					const {
						exec
					} = require("child_process");
					exec('/usr/bin/find ' + config.repository.data + ' -name "*_patient.json" -print0 | /usr/bin/xargs -0 /usr/local/bin/jq \'select((.givenname | test("' + name + '";"i")) or (.familyname | test("' + name + '";"i"))) .id\'', async(error, stdout, stderr) => {
						if (error) {
							console.log(`error: ${error.message}`);
							return;
						}
						if (stderr) {
							console.log(`stderr: ${stderr}`);
							return;
						}

						var str = stdout.toString();
						var lines = str.split(/(\r?\n)/g);
						const promises = lines.map(async line => {
							if (line && line.trim()) {
								//First condition to check if string is not empty
								//Second condition checks if string contains not just whitespace
								var uuid = line.trim().replace(/['"]+/g, '');
								const data = await fsp.readFile(config.repository.data + '/' + uuid + "/" + uuid + "_patient.json");
								return JSON.parse(data);
							}
						});
						const jsonArray = await Promise.all(promises)
						res.send(jsonArray);
					});
				} else {
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
			}
		} catch (e) {
			next(e);
		}
	});

	// READ
	app.get('/patients/:uuid', async(req, res, next) => {
		try {
			const uuid = req.params["uuid"];
			console.log("get patient: " + uuid);
			let data = await fsp.readFile(path.join(config.repository.data, uuid, uuid + '_patient.json'));
			res.send(JSON.parse(data));
		} catch (e) {
			next(e);
		}
	});

	// // UPDATE
	// app.put('/patients/:id', (req, res) => {
	//
	//     readFile(data => {
	//
	//         // add the new user
	//         const userId = req.params["id"];
	//         data[userId] = req.body;
	//
	//         writeFile(JSON.stringify(data, null, 2), () => {
	//             res.status(200).send(`users id:${userId} updated`);
	//         });
	//     },
	//         true);
	// });

	// CREATE
	app.post('/patients', (req, res) => {
		try {
			//requiring path and fs modules
			//joining path of directory 
			let patient = req.body;
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

			fs.mkdir(path.join(config.repository.data, patient.id), { recursive: true }, (err2) => {
				if (err2) {
					console.log(err2);
				}

				fs.writeFile(path.join(config.repository.data, patient.id, patient.id + '_patient.json'), JSON.stringify(patient, null, 2), 'utf-8', (err) => {
					if (err) {
						console.log(err);
					}
					console.log("create patient: " + patient.id);
					dataChangeEmitter.emit('patientCreate', patient);
				
					res.status(200).send(patient);
				});
			});
		} catch (e) {
			next(e);
		}
	});

	// -------------------------------- encounters

	// READ
	app.get('/encounters/:uuid', (req, res) => {
		try {
			const uuid = req.params["uuid"];
			glob(config.repository.data + '/*/*_' + uuid + '.json', {}, (err, files) => {
				if (err) {
					// handle error
				}

				fs.readFile(files[0], 'utf8', function(err2, data) {
					if (!err2) {
						res.send(JSON.parse(data));
					} else {
						res.statusCode(404);
						res.send('');
					}
				});
			});
		} catch (e) {
			next(e);
		}
	});

	// READ
	app.get('/patients/:uuid/encounters', async(req, res) => {
		try {
			const uuid = req.params["uuid"];

			let files = await glob(config.repository.data + '/' + uuid + '/*_*_*.json', {});
			const promises = files.map(async file => {
				const data = await fsp.readFile(file);
				return JSON.parse(data);
			})
			const jsonArray = await Promise.all(promises)
			res.send(jsonArray);
		} catch (e) {
			next(e);
		}
	});

	// CREATE
	app.post('/patients/:uuid/encounters', (req, res) => {
		try {
			console.log("create encounter called");
			const path = require('path');
			//joining path of directory 
			const uuid = req.params["uuid"];
			let encounter = req.body;
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

			fs.writeFile(path.join(config.repository.data, uuid, cfutil.currentTimestamp() + '_' + encounter.type + '_' + encounter.id + '.json'), JSON.stringify(encounter, null, 2), 'utf-8', (err) => {
				if (err) {
					throw err;
				}
				dataChangeEmitter.emit('encounterCreate', encounter);
				res.status(200).send(encounter);
			});
		} catch (e) {
			next(e);
		}
	});
	
	// -------------------------------- queue

	app.get('/queue/all', (req, res, next) => {
		try {
			res.redirect('/patients');
		} catch (e) {
			next(e);
		}
	});

	// READ
	app.get('/queue/:queuename/:date', (req, res, next) => {
		try {
			const queuename = req.params["queuename"];
				const date = req.params["date"];

				var jsonArray = [];
				db.all("SELECT * FROM queuecache WHERE queuename = '" + queuename + "' AND d = '" + date + "' AND fulfilled = false", async function(err, rows) {
					if (err) {
						throw err;
					}

					const promises = rows.map(async row => {
						const data = await fsp.readFile(config.repository.data + '/' + row.patientuuid + "/" + row.patientuuid + "_patient.json");
						return JSON.parse(data);
					});
					const jsonArray = await Promise.all(promises);
					res.send(jsonArray);
				});
		} catch (e) {
			next(e);
		}
	});
	
};

module.exports = patientsRoutes;
