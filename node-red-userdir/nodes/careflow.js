module.exports = function(RED) {
    function CareflowNode(config) {
        RED.nodes.createNode(this,config);
        var node = this;

        // Retrieve the config node
        node.careflow_runtime = RED.nodes.getNode(config.careflow_runtime);
	  // console.log(this.careflow_runtime.runtime_flow_path);
	  console.log(node.careflow_runtime.runtime_flow_path);

        // if (this.runtime_flow_path) {
            // Do something with:
            //  this.server.host
            //  this.server.port
			RED.events.on("nodes-started",function() {
			  console.log("All nodes have started; redeploying CareFLOW definitions.");
			  console.log(node.careflow_runtime.runtime_flow_path);
			  console.log("XXX");
			  const http = require('http');
			  const fs = require('fs');

			  const file = fs.createWriteStream(node.careflow_runtime.runtime_flow_path);
			  const request = http.get("http://localhost:1880/flows", function(response) {
			    response.pipe(file);
			  });
			})
        // } else {
            // No config node configured
        // }
    }
    RED.nodes.registerType("careflow",CareflowNode);
}
