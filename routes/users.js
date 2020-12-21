
const usersRoutes = (app, fs) => {


    // helper methods
    const readFile = (callback, returnJson = false, filePath = dataPath, encoding = 'utf8') => {
        fs.readFile(filePath, encoding, (err, data) => {
            if (err) {
                throw err;
            }

            callback(returnJson ? JSON.parse(data) : data);
        });
    };

    const writeFile = (fileData, callback, filePath = dataPath, encoding = 'utf8') => {

        fs.writeFile(filePath, fileData, encoding, (err) => {
            if (err) {
                throw err;
            }

            callback();
        });
    }; 


    // READ
    app.get('/users', (req, res) => {
		const name = req.query.name;
		if (name === undefined) {
			const glob = require("glob");
			const fs = require('fs');
			glob('./data/**/demographic.json', {}, (err, files)=>{
				var jsonArray = [];
				files.forEach(file => {
					// guess there is a better way than using sync, but I'm too lazy
			        var data = fs.readFileSync(file);
					jsonArray = jsonArray.concat(JSON.parse(data));
				});
	            res.send(jsonArray);
			});
		} else {
			const { exec } = require("child_process");
			exec('/usr/bin/find ./data -name "demographic.json" -print0 | /usr/bin/xargs -0 /usr/local/bin/jq \'select((.givenname | test("' + name + '";"i")) or (.familyname | test("' + name + '";"i"))) .id\'', (error, stdout, stderr) => {
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
						var data = fs.readFileSync("./data/" + lines[i].trim().replace(/['"]+/g, '') + "/demographic.json");
						jsonArray = jsonArray.concat(JSON.parse(data));
					}
				}
  	            res.send(jsonArray);
//			    console.log(`stdout: ${stdout}`);
			});
		}
    });

    // READ
    app.get('/users/:uuid', (req, res) => {
		const fs = require('fs');
        const uuid = req.params["uuid"];	
        fs.readFile('./data/' + uuid + '/demographic.json', [],(err, data) => {
            if (err) {
                throw err;
            }
	        res.send(JSON.parse(data));
		});
        // var data = fs.readFileSync('./data/' + uuid + '/demographic.json');
        // res.send(JSON.parse(data));
    });

    // READ
    app.get('/users_from_patient_store', (req, res) => {
	    const dataPath = './data/users.json';
		//requiring path and fs modules
		const path = require('path');
		const fs = require('fs');
		//joining path of directory 
		const directoryPath = path.join(__dirname, '../data');
		//passsing directoryPath and callback function
		fs.readdir(directoryPath, function (err, files) {
		    //handling error
		    if (err) {
		        return console.log('Unable to scan directory: ' + err);
		    } 
		    //listing all files using forEach
		    files.forEach(function (file) {
		        // Do whatever you want to do with the file
		        fs.readFile(directoryPath + '/' + file, 'utf8', (err, data) => {
		            if (err) {
				        return console.log('Unable to read file ' + file + ': ' + err);
		            }
		            res.send(JSON.parse(data));
		        });
		    });
		});
    });

    // CREATE
    app.post('/users', (req, res) => {

        readFile(data => {
            const newUserId = Object.keys(data).length + 1;

            // add the new user
            data[newUserId.toString()] = req.body;

            writeFile(JSON.stringify(data, null, 2), () => {
                res.status(200).send('new user added');
            });
        },
            true);
    });


    // UPDATE
    app.put('/users/:id', (req, res) => {

        readFile(data => {

            // add the new user
            const userId = req.params["id"];
            data[userId] = req.body;

            writeFile(JSON.stringify(data, null, 2), () => {
                res.status(200).send(`users id:${userId} updated`);
            });
        },
            true);
    });


    // DELETE
    app.delete('/users/:id', (req, res) => {

        readFile(data => {

            // add the new user
            const userId = req.params["id"];
            delete data[userId];

            writeFile(JSON.stringify(data, null, 2), () => {
                res.status(200).send(`users id:${userId} removed`);
            });
        },
            true);
    });
};

module.exports = usersRoutes;