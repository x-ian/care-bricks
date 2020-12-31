module.exports = function(RED) {
  function ScreenSetEncounterTypeNode(config) {
      RED.nodes.createNode(this,config);
      var node = this;
  }
  RED.nodes.registerType("set-encountertype",ScreenSetEncounterTypeNode);
}
