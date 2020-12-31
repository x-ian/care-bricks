module.exports = function(RED) {
  function ScreenSummaryChartArtNode(config) {
      RED.nodes.createNode(this,config);
      var node = this;
  }
  RED.nodes.registerType("summary-chart-art",ScreenSummaryChartArtNode);
}
