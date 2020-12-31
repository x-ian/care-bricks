module.exports = function(RED) {
  function ScreenSummaryClinicalNode(config) {
      RED.nodes.createNode(this,config);
      var node = this;
  }
  RED.nodes.registerType("summary-clinical",ScreenSummaryClinicalNode);
}
