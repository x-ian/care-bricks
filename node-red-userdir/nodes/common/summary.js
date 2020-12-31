module.exports = function(RED) {
  function ScreenSummaryNode(config) {
      RED.nodes.createNode(this,config);
      var node = this;
  }
  RED.nodes.registerType("summary",ScreenSummaryNode);
}
