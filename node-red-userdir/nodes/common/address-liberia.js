module.exports = function(RED) {
  function ScreenAddressLiberiaNode(config) {
      RED.nodes.createNode(this,config);
      var node = this;
      node.scope = config.scope;
      node.key = config.key;
  }
  RED.nodes.registerType("address-liberia",ScreenAddressLiberiaNode);
}
