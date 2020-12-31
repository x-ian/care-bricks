module.exports = function(RED) {
  function ScreenInvokeFlowNode(config) {
      RED.nodes.createNode(this,config);
      var node = this;
  }
  RED.nodes.registerType("invoke-flow",ScreenInvokeFlowNode);
}
