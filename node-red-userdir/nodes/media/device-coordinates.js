module.exports = function(RED) {
  function ScreenDeviceCoordinatesNode(config) {
      RED.nodes.createNode(this,config);
      var node = this;
  }
  RED.nodes.registerType("device-coordinates",ScreenDeviceCoordinatesNode);
}
