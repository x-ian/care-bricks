module.exports = function(RED) {
  function ScreenDHIS2TrackerStoreNode(config) {
      RED.nodes.createNode(this,config);
      var node = this;
  }
  RED.nodes.registerType("dhis2-tracker-store",ScreenDHIS2TrackerStoreNode);
}
