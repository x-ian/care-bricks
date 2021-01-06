module.exports = function(RED) {
  function ScreenCheckedInPatientsListNode(config) {
      RED.nodes.createNode(this,config);
      var node = this;
      node.program = config.program;
  }
  RED.nodes.registerType("checked-in-patients-list",ScreenCheckedInPatientsListNode);
}
