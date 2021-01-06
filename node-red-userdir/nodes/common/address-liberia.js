module.exports = function(RED) {
  function ScreenAddressLiberiaNode(config) {
      RED.nodes.createNode(this,config);
      var node = this;
      node.scope = config.scope;
	  node.label = config.label;
      node.key = config.key;
  }
  RED.nodes.registerType("address-liberia",ScreenAddressLiberiaNode);
}
