module.exports = function(RED) {
    function ConfigRuntimeNode(properties) {
        RED.nodes.createNode(this,properties);
        console.log('config-runtime created');
        this.flowpath = properties.flowpath;

		// hardcoded publish of flows from Node-RED to runtime environment
		const http = require('http');
		const fs = require('fs');
		console.log(this.flowpath);
		const file = fs.createWriteStream("" + this.flowpath);
		const request = http.get("http://localhost:1880/flows", function(response) {
		  response.pipe(file);
		});
		

        var node = this;

		this.on('close', function () { 
		        console.log('config-runtime Closed');
		});
		
        node.on("input",function(message) {
            message.flowpath = this.flowpath;
            node.send(message);
        });
    }

    RED.nodes.registerType("config-runtime",ConfigRuntimeNode);
}
