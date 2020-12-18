module.exports = function(RED) {
  function ScreenSummaryChartArtNode(config) {
      RED.nodes.createNode(this,config);
      var node = this;
      node.on('input', function(msg) {
          msg.payload = msg.payload; //.toLowerCase();
          node.send(msg);
      });
  }
  RED.nodes.registerType("summary-chart-art",ScreenSummaryChartArtNode);
}
