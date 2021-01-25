module.exports = function(RED) {
    function CareflowNode(config) {
        RED.nodes.createNode(this,config);
        var node = this;

        // Retrieve the config node
        node.careflow_runtime = RED.nodes.getNode(config.careflow_runtime);
	  // console.log(node.careflow_runtime.runtime_flow_path);

        // if (this.runtime_flow_path) {
            // Do something with:
            //  this.server.host
            //  this.server.port
			RED.events.on("nodes-started",function() {
				const fs = require("fs"); // Or `import fs from "fs";` with ESM
				if (fs.existsSync(node.careflow_runtime.runtime_flow_path)) {
	  			  console.log("All nodes have started; redeploying CareFLOW definitions.");
	  			  console.log(node.careflow_runtime.runtime_flow_path);
	  			  const http = require('http');

	  			  const file = fs.createWriteStream(node.careflow_runtime.runtime_flow_path);
	  			  const request = http.get("http://localhost:" + RED.settings.uiPort + "/flows", function(response) {
	  			    response.pipe(file);
	  			  });
				} else {
					console.error("CareFLOW definitions do not exist. Make sure the CareFLOW config node points to an existing flow file in the runtime environment.");
					console.log(node.careflow_runtime.runtime_flow_path);
				}
			});
        // } else {
            // No config node configured
        // }
    }
    RED.nodes.registerType("careflow",CareflowNode);
}
