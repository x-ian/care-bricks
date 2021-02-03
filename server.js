const express = require('express');
const bodyParser = require('body-parser');
const app = express();
// increasing limits as photo uploads was hitting this
app.use(express.json({limit: '5mb', extended: true}));
app.use(express.urlencoded({limit: "5mb", extended: true, parameterLimit:50000}));

const https = require('https');

const fs = require('fs');
var config = require('./config');
config.init();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: true
}));
app.use(express.static('bootstrap-studio-export'));

const EventEmitter = require('events');
class DataChangeEmitter extends EventEmitter {}
const dataChangeEmitter = new DataChangeEmitter();

var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database(':memory:');
const sqlite3cache = require('./modules/sqlite3cache');
sqlite3cache.init(dataChangeEmitter, db);

// var PouchDB = require('pouchdb');
// PouchDB.plugin(require('pouchdb-adapter-memory'));
// var pouchdb = new PouchDB('pouchdbcache', {adapter: 'memory'});
// const pouchdbcache = require('./modules/pouchdbcache');
// pouchdbcache.init(dataChangeEmitter, pouchdb);

const transactionlog = require('./modules/transactionlog');
transactionlog.init(dataChangeEmitter);

const routes = require('./routes/routes.js')(app, db, dataChangeEmitter);

// http
const server = app.listen(config.web.port, () => {
	console.log('listening for http on port %s...', server.address().port);
});

// openssl req -x509 -nodes -days 365 -newkey rsa:2048 -keyout ./selfsigned.key -out selfsigned.crt
// https
var privateKey = fs.readFileSync( 'selfsigned.key' );
var certificate = fs.readFileSync( 'selfsigned.crt' );
https.createServer({
    key: privateKey,
    cert: certificate
}, app).listen(config.web.httpsport);
console.log('listening for https on port %s...', 3443);

