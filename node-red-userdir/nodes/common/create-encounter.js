module.exports = function(RED) {
  function ScreenCreateEncounterNode(config) {
      RED.nodes.createNode(this,config);
      var node = this;
  }
  RED.nodes.registerType("create-encounter",ScreenCreateEncounterNode);
}
