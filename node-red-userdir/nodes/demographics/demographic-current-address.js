module.exports = function(RED) {
  function ScreenDemographicCurrentAddressNode(config) {
      RED.nodes.createNode(this,config);
      var node = this;
  }
  RED.nodes.registerType("demographic-current-address",ScreenDemographicCurrentAddressNode);
}
