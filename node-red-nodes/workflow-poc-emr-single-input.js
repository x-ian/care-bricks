module.exports = function(RED) {
  function WorkflowPocEmrScreenSingleInputNode(config) {
      RED.nodes.createNode(this,config);
      var node = this;
      node.on('input', function(msg) {
          // Store message here
          msg.payload.key = config.key;
          msg.payload.value = config.value;
          node.send(msg);
      });
  }
  RED.nodes.registerType("single-input",WorkflowPocEmrScreenSingleInputNode);
}
