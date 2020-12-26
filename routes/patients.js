const patientsRoutes = (app, fs, db) => {

	// const dataPath = "./data/";
	const path = require('path');
	const dataPath = path.join(__dirname, "../../data");
	const glob = require("glob");
	const crypto = require('crypto');

	const UUIDGeneratorNode = () =>
		([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
			(c ^ (crypto.randomBytes(1)[0] & (15 >> (c / 4)))).toString(16)
	);
	
	function currentTimestamp() {
		var d = new Date();
		
		var hr = d.getHours();
		if (hr < 10) {
		    hr = "0" + hr;
		}
		var min = d.getMinutes();
		if (min < 10) {
		    min = "0" + min;
		}
		var sec = d.getSeconds();
		if (sec < 10) {
		    sec = "0" + sec;
		}

		var date = d.getDate();
		if (date < 10) {
		    date = "0" + date;
		}
		var month = d.getMonth() + 1;
		if (month < 10) {
		    month = "0" + month;
		}
		var year = d.getFullYear();		
		return "" + year + "" + month + "" + date + '-' + hr + "" + min + "" + sec;
	}

    // helper methods
    const readFile = (callback, returnJson = false, filePath, encoding = 'utf8') => {
        fs.readFile(filePath, encoding, (err, data) => {
            if (err) {
                throw err;
            }

            callback(returnJson ? JSON.parse(data) : data);
        });
    };

    const writeFile = (fileData, callback, filePath, encoding = 'utf8') => {
        fs.writeFile(filePath, fileData, encoding, (err) => {
            if (err) {
                throw err;
            }
            callback();
        });
    }; 

    function writeFileSync(fileData, filePath, encoding = 'utf8') {
        fs.writeFileSync(filePath, fileData, encoding);
    }; 


// ---------------------------- patients 
    // READ
    app.get('/patients', (req, res) => {
		const name = req.query.name;
		console.log("search patient: " + name);
		
		if (name === undefined) {
			glob(dataPath + '/**/*_patient.json', {}, (err, files)=>{
				var jsonArray = [];
				files.forEach(file => {
					// guess there is a better way than using sync, but I'm too lazy
			        var data = fs.readFileSync(file);
					jsonArray = jsonArray.concat(JSON.parse(data));
				});
	            res.send(jsonArray);
			});
		} else {
			if (false) {
				// fulltext search via find and jq
				const { exec } = require("child_process");
				exec('/usr/bin/find ' + dataPath + ' -name "*_patient.json" -print0 | /usr/bin/xargs -0 /usr/local/bin/jq \'select((.givenname | test("' + name + '";"i")) or (.familyname | test("' + name + '";"i"))) .id\'', (error, stdout, stderr) => {
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
					var jsonArray = [];
					for (var i = 0; i < lines.length; i++) {
						if (lines[i] && lines[i].trim()) {
							//First condition to check if string is not empty
							//Second condition checks if string contains not just whitespace
							var uuid = lines[i].trim().replace(/['"]+/g, '');
							var data = fs.readFileSync(dataPath + '/' + uuid + "/" + uuid + "_patient.json");
							jsonArray = jsonArray.concat(JSON.parse(data));
						}
					}
					res.send(jsonArray);
				});		
			} else {
				// using inmemory sqlite3
				var jsonArray = [];
				db.all("SELECT * FROM patientcache WHERE givenname like '" + name + "%' OR familyname like '" + name + "%' OR facilityid like '" + name + "%' OR nationalid like '" + name + "%'" , function(err, rows) {
				    if (err) {
				      throw err;
				    }
				    rows.forEach((row) => {
						var data = fs.readFileSync(dataPath + '/' + row.id + "/" + row.id + "_patient.json");
						jsonArray = jsonArray.concat(JSON.parse(data));
				    });
					res.send(jsonArray);
				});
			}
		}
    });

    // READ
    app.get('/patients/:uuid', (req, res) => {
        const uuid = req.params["uuid"];	
		console.log("get patient: " + uuid);
        fs.readFile(path.join(dataPath, uuid, uuid + '_patient.json'), [],(err, data) => {
            if (err) {
                throw err;
            }
	        res.send(JSON.parse(data));
		});
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
		//requiring path and fs modules
		//joining path of directory 
		let patient = req.body;
		patient.id = UUIDGeneratorNode(); 
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

		// const directoryPath = path.join(__dirname, '/' + patient.id);
		fs.mkdir(path.join(dataPath, patient.id), (err2) => { if (err2) { throw err2; }
		fs.writeFile(path.join(dataPath, patient.id, patient.id + '_patient.json'), JSON.stringify(patient, null, 2),
		'utf-8', (err) => { if (err) { throw err; } console.log("create pateint: " + patient.id);
		res.status(200).send(patient); }); });
			
		// const directoryPath = path.join(__dirname, '../data/' + patient.id);
		// fs.mkdirSync(directoryPath);
		//         fs.writeFileSync(directoryPath + '/' + patient.id + '_patient.json', JSON.stringify(patient, null, 2), 'utf-8');
		//         res.status(200).send({"message": 'new patient added'});
    });
	
// -------------------------------- encounters
	
    // READ
    app.get('/encounters/:uuid', (req, res) => {
        const uuid = req.params["uuid"];
		glob(dataPath + '/*/*_' + uuid + '.json', {}, (err, files)=>{
	      if (err) {
	         // handle error
	      }

	      fs.readFile(files[0], 'utf8', function(err2, data) {
	         if(!err2) {
	            res.send(JSON.parse(data));
	         } else {
	            res.statusCode(404);
	            res.send('');
	         }
	      });
	   });
    });

    // READ
    app.get('/patients/:uuid/encounters', (req, res) => {
        const uuid = req.params["uuid"];
		glob(dataPath + '/' + uuid + '/*_*_*.json', {}, (err, files)=>{
  	      if (err) {
			  throw err;
  	      }
			var jsonArray = [];
			files.forEach(file => {
				// guess there is a better way than using sync, but I'm too lazy
		        var data = fs.readFileSync(file);
				jsonArray = jsonArray.concat(JSON.parse(data));
			});
            res.send(jsonArray);
		});
    });

    // CREATE
    app.post('/patients/:uuid/encounters', (req, res) => {
		console.log("create encounter called");
		const path = require('path');
		//joining path of directory 
		const uuid = req.params["uuid"];
		let encounter = req.body;
		encounter.patientId = uuid;
		encounter.id = UUIDGeneratorNode(); 
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

        fs.writeFile(path.join(dataPath, uuid, currentTimestamp() + '_' + encounter.type + '_' + encounter.id + '.json'), JSON.stringify(encounter, null, 2), 'utf-8', (err) => {
            if (err) {
                throw err;
            }
            res.status(200).send(encounter);
        });

        // fs.writeFileSync(directoryPath + '/' + currentTimestamp() + '_' + encounter.type + '_' + encounter.id + '.json', JSON.stringify(encounter, null, 2), 'utf-8');
        // res.status(200).send({"message": 'new encounter added'});
    });
};

module.exports = patientsRoutes;