module.exports = function(RED) {
  function ScreenDemographicHomeAddressNode(config) {
      RED.nodes.createNode(this,config);
      var node = this;
      node.on('input', function(msg) {
          msg.payload = msg.payload; //.toLowerCase();
          node.send(msg);
      });
  }
  RED.nodes.registerType("demographic-home-address",ScreenDemographicHomeAddressNode);
}
