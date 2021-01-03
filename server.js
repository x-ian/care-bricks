const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const fs = require('fs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: true
}));
app.use(express.static('bootstrap-studio-export'));

var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database(':memory:');

db.serialize(function() {
	db.run("CREATE TABLE patientcache (uuid TEXT, givenname TEXT, familyname TEXT, facilityid TEXT, nationalid TEXT)");

	var stmt = db.prepare("INSERT INTO patientcache VALUES (?, ?, ?, ?, ?)");
	const glob = require("glob");
	glob('../data/**/*_patient.json', {}, (err, files) => {

		console.log("importing all patient files...");
		files.forEach(file => {
			// guess there is a better way than using sync, but I'm too lazy
			var data = fs.readFileSync(file);
			var p = JSON.parse(data);
			stmt.run(p.id, p.givenname, p.familyname, p.facilityId, p.nationalId);
			// console.log('run statement');
		});
		stmt.finalize();
		console.log("importing done");
		// db.each("SELECT * FROM patientcache", function(err, row) {
		// 		if (err) {
		// 			console.log(err);
		// 		}
		//   console.log(row.id + ": " + row.givenname);
		// });
		console.log('run done');
	});
});

const routes = require('./routes/routes.js')(app, db);

const server = app.listen(3001, () => {
	console.log('listening on port %s...', server.address().port);
});
