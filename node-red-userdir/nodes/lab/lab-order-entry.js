module.exports = function(RED) {
  function ScreenLabOrderEntryNode(config) {
      RED.nodes.createNode(this,config);
      var node = this;
      node.panel = config.panel;
  }
  RED.nodes.registerType("lab-order-entry",ScreenLabOrderEntryNode);
}
