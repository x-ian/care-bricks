module.exports = function(RED) {
  function ScreenCreateEncounterEndNode(config) {
      RED.nodes.createNode(this,config);
      var node = this;
  }
  RED.nodes.registerType("create-encounter-end",ScreenCreateEncounterEndNode);
}
