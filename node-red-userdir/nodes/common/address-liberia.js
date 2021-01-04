module.exports = function(RED) {
  function ScreenAddressLiberiaNode(config) {
      RED.nodes.createNode(this,config);
      var node = this;
  }
  RED.nodes.registerType("address-liberia",ScreenAddressLiberiaNode);
}
