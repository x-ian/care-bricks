module.exports = function(RED) {
  function ScreenCaseEndNode(config) {
      RED.nodes.createNode(this,config);
      var node = this;
  }
  RED.nodes.registerType("case-end",ScreenCaseEndNode);
}
