module.exports = function(RED) {
  function WorkflowPocEmrScreenSingleInputNode(config) {
      RED.nodes.createNode(this,config);
      var node = this;
      node.on('input', function(msg) {
          msg.payload = msg.payload;
          node.send(msg);
      });
  }
  RED.nodes.registerType("single-input",WorkflowPocEmrScreenCheckedInPatientsListNode);
}
