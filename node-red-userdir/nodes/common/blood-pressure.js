module.exports = function(RED) {
  function ScreenBloodPressureNode(config) {
      RED.nodes.createNode(this,config);
      var node = this;
  }
  RED.nodes.registerType("blood-pressure",ScreenBloodPressureNode);
}
