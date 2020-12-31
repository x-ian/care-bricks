module.exports = function(RED) {
  function PatientsQueueNode(config) {
      RED.nodes.createNode(this,config);
      var node = this;
      node.expression = config.expression;
  }
  RED.nodes.registerType("patients-queue",PatientsQueueNode);
}
