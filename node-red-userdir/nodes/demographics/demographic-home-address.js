module.exports = function(RED) {
  function ScreenDemographicHomeAddressNode(config) {
      RED.nodes.createNode(this,config);
      var node = this;
  }
  RED.nodes.registerType("demographic-home-address",ScreenDemographicHomeAddressNode);
}
