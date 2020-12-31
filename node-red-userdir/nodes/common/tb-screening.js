module.exports = function(RED) {
  function ScreenTbScreeningNode(config) {
      RED.nodes.createNode(this,config);
      var node = this;
  }
  RED.nodes.registerType("tb-screening",ScreenTbScreeningNode);
}
