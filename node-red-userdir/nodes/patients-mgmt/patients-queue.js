module.exports = function(RED) {
  function PatientsQueueNode(config) {
      RED.nodes.createNode(this,config);
      var node = this;
      node.name = config.name;
      node.queueName = config.queueName;
      node.queueDateFilter = config.queueDateFilter;
      node.label = config.label;
      node.encounterType = config.encounterType;
      node.rowContent = config.rowContent;
  }
  RED.nodes.registerType("patients-queue",PatientsQueueNode);
}
