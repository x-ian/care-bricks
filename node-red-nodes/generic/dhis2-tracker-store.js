module.exports = function(RED) {
  function ScreenDHIS2TrackerStoreNode(config) {
      RED.nodes.createNode(this,config);
      var node = this;
      node.on('input', function(msg) {
          msg.payload = msg.payload; //.toLowerCase();
          node.send(msg);
      });
  }
  RED.nodes.registerType("dhis2-tracker-store",ScreenDHIS2TrackerStoreNode);
}
