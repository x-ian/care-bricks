const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const fs = require('fs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database(':memory:');
 
db.serialize(function() {
  db.run("CREATE TABLE patientcache (id TEXT, givenname TEXT, familyname TEXT, facilityid TEXT, nationalid TEXT)");
 
  var stmt = db.prepare("INSERT INTO patientcache VALUES (?, ?, ?, ?, ?)");
  const glob = require("glob");
  glob('../data-lh/**/*_patient.json', {}, (err, files)=>{
	  
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
	
	// db.each("SELECT rowid AS id, info FROM lorem", function(err, row) {
	//   console.log(row.id + ": " + row.info);
  });
});

const routes = require('./routes/routes.js')(app, fs, db);

// attempt with DIY memory cache
/*
const cache = new Map();
const glob = require("glob");
// glob('../data/** /*_patient.json', {}, (err, files)=>{
	files.forEach(file => {
		// guess there is a better way than using sync, but I'm too lazy
        var data = fs.readFileSync(file);
		var p = JSON.parse(data);
		addOrAppend(cache, "givenname", p.id, p.givenname);
		addOrAppend(cache, "familyname", p.id, p.familyname);
		// addOrAppend(cache, "nationalId", p.id, p.nationalId);
		addOrAppend(cache, "facilityId", p.id, p.facilityId);
	});
	console.log(cache.get('givenname').size);
	console.log(JSON.stringify(cache.get('givenname').get('Maria')));

	const routes = require('./routes/routes.js')(app, fs);

});

function addOrAppend(cache, cacheName, id, key) {
	if (cache.get(cacheName) === undefined) {
		cache.set(cacheName, new Map());
	}
	if (cache.get(cacheName).get(key) === undefined) {
		cache.get(cacheName).set(key, [ id ]);
	} else {
		var a = cache.get(cacheName).get(key);
		a.push( id );
		cache.get(cacheName).set(key, a);
	}
}
*/

const server = app.listen(3001, () => {
    console.log('listening on port %s...', server.address().port);
});

app.use(express.static('bootstrap-studio-export'));