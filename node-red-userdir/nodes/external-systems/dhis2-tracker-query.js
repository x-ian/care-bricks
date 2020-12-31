module.exports = function(RED) {
  function ScreenDHIS2TrackerQueryNode(config) {
      RED.nodes.createNode(this,config);
      var node = this;
  }
  RED.nodes.registerType("dhis2-tracker-query",ScreenDHIS2TrackerQueryNode);
}
