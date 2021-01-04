const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const fs = require('fs');
var config = require('./config');
config.init();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: true
}));
app.use(express.static('bootstrap-studio-export'));

var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database(':memory:');

const EventEmitter = require('events');
class DataChangeEmitter extends EventEmitter {}
const dataChangeEmitter = new DataChangeEmitter();

const sqlite3cache = require('./modules/sqlite3cache');
sqlite3cache.init(dataChangeEmitter, db);

const transactionlog = require('./modules/transactionlog');
transactionlog.init(dataChangeEmitter);

const routes = require('./routes/routes.js')(app, db, dataChangeEmitter);

const server = app.listen(config.web.port, () => {
	console.log('listening on port %s...', server.address().port);
});

