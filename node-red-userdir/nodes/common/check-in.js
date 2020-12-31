module.exports = function(RED) {
  function ScreenCheckInNode(config) {
      RED.nodes.createNode(this,config);
      var node = this;
  }
  RED.nodes.registerType("check-in",ScreenCheckInNode);
}
