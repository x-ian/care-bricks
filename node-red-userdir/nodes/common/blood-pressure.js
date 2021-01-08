module.exports = function(RED) {
  function ScreenBloodPressureNode(config) {
      RED.nodes.createNode(this,config);
      var node = this;
	  node.label = config.label;
      node.key = config.key;
  }
  RED.nodes.registerType("blood-pressure",ScreenBloodPressureNode);
}
