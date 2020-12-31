module.exports = function(RED) {
  function ScreenLabTestResultNode(config) {
      RED.nodes.createNode(this,config);
      var node = this;
  }
  RED.nodes.registerType("lab-test-result",ScreenLabTestResultNode);
}
