module.exports = function(RED) {
  function PatientsQueueNode(config) {
      RED.nodes.createNode(this,config);
      var node = this;
      node.expression = config.expression;
      node.on('input', function(msg) {
          msg.payload = msg.payload; //.toLowerCase();
          node.send(msg);
      });
  }
  RED.nodes.registerType("patients-queue",PatientsQueueNode);
}
