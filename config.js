var path = require("path");
const fs = require('fs');

var configs = {};

exports.cf = configs;
exports.init = function() {
	// fs.mkdirSync("../repository", { recursive: true });
	fs.mkdirSync("../repository", { recursive: true });
	exports.repository = {}
	// exports.repository.root = path.resolve("../repository");
	exports.repository.root = path.resolve("../repository");
	fs.mkdirSync(path.join(exports.repository.root, "data"), { recursive: true });
	exports.repository.data = path.join(exports.repository.root, "data");
	fs.mkdirSync(path.join(exports.repository.root, "transaction"), { recursive: true });
	exports.repository.transaction = path.join(exports.repository.root, "transaction");

	exports.web = {}
	exports.web.port = 3001;
	exports.web.httpsport = 3443;
};
