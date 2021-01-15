module.exports = function(RED) {
  function ScreenSummaryGraphNode(config) {
      RED.nodes.createNode(this,config);
      var node = this;
  }
  RED.nodes.registerType("summary-graph",ScreenSummaryGraphNode);
}
