module.exports = function(RED) {
  function ScreenHeightWeightNode(config) {
      RED.nodes.createNode(this,config);
      var node = this;
	  node.label = config.label;
      node.keyHeight = config.keyHeight;
      node.keyWeight = config.keyWeight;
  }
  RED.nodes.registerType("height-weight",ScreenHeightWeightNode);
}
