module.exports = function(RED) {
  function ScreenEndFlowNode(config) {
      RED.nodes.createNode(this,config);
      var node = this;
  }
  RED.nodes.registerType("end-flow",ScreenEndFlowNode);
}
