module.exports = function(RED) {
  function ScreenScheduledPatientsListNode(config) {
      RED.nodes.createNode(this,config);
      var node = this;
      node.program = config.program;
  }
  RED.nodes.registerType("scheduled-patients-list",ScreenScheduledPatientsListNode);
}
