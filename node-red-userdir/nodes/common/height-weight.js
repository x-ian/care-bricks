module.exports = function(RED) {
  function ScreenHeightWeightNode(config) {
      RED.nodes.createNode(this,config);
      var node = this;
  }
  RED.nodes.registerType("height-weight",ScreenHeightWeightNode);
}
