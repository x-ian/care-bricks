module.exports = function(RED) {
  function ScreenDeviceCoordinatesNode(config) {
      RED.nodes.createNode(this,config);
      var node = this;
      node.on('input', function(msg) {
          msg.payload = msg.payload; //.toLowerCase();
          node.send(msg);
      });
  }
  RED.nodes.registerType("device-coordinates",ScreenDeviceCoordinatesNode);
}
