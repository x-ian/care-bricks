
const patientsRoutes = (app, db, dataChangeEmitter) => {

	const cfutil = require('../modules/cfutil');
	const fs = require('fs');
	const fsp = require('fs').promises;
	var config = require('../config');
	const g = require("glob");
	const path = require('path');
	const util = require('util');
	const glob = util.promisify(g);
	
	var storage = require('../modules/storage');

	// ---------------------------- patients 
	// READ
	app.get('/patients', async (req, res, next) => {
		try {
			const name = req.query.name;
			console.log("search patient: " + name);
			if (name === undefined) {
				patients = await storage.searchAllPatients();
			} else {
				patients = await storage.searchPatientsByName(name);
			}
			res.send(patients);
		} catch (e) {
			next(e);
		}
	});

	// READ
	app.get('/patients/:uuid', async (req, res, next) => {
		try {
			const uuid = req.params["uuid"];
			console.log("get patients: " + uuid);
			var data = await storage.readPatient(uuid);
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
	app.post('/patients', async (req, res, next) => {
		try {
			const patient = await storage.createPatient(req.body);
			console.log("create patient done: " + patient);
			if (patient) {
				dataChangeEmitter.emit('patientCreate', patient);
				res.status(200).send(patient);
			} else {
				res.status(500);
			}
		} catch (e) {
			next(e);
		}
	});

	// -------------------------------- encounters

	// READ
	app.get('/encounters/:uuid', async (req, res, next) => {
		try {
			const uuid = req.params["uuid"];
			var encounter = await storage.readEncounter(uuid);
			if (encounter) {
				res.send(encounter);
			} else {
				res.statusCode(404).send('');
			}
		} catch (e) {
			next(e);
		}
	});

	// READ
	app.get('/patients/:uuid/encounters', async (req, res, next) => {
		try {
			const uuid = req.params["uuid"];
			const encounters = await storage.searchAllEncountersFromPatient(uuid);
			res.send(encounters);
		} catch (e) {
			next(e);
		}
	});

	// CREATE
	app.post('/patients/:uuid/encounters', async (req, res, next) => {
		try {
			console.log("create encounter called");
			const uuid = req.params["uuid"];
			
			const encounter = await storage.createEncounter(uuid, req.body);

			dataChangeEmitter.emit('encounterCreate', encounter);
			res.status(200).send(encounter);
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

	app.get('/queue/:queuename/:date', async (req, res, next) => {
		try {
			const queuename = req.params["queuename"];
			const date = req.params["date"];
			const patients = await storage.queue(queuename, date);
			res.send(patients);
		} catch (e) {
			next(e);
		}
	});
	
	
	// -------------------------------- media

	app.post('/patients/:uuid/media', async (req, res, next) => {
		try {
			console.log("create media called");
			const uuid = req.params["uuid"];
			
			const media = await storage.createMedia(uuid, req.body);

			dataChangeEmitter.emit('mediaCreate', media);
			res.status(200).send({media});
		} catch (e) {
			next(e);
		}
	});
};

module.exports = patientsRoutes;
