module.exports = function(RED) {
  function ScreenMedicationDispensationNode(config) {
      RED.nodes.createNode(this,config);
      var node = this;
  }
  RED.nodes.registerType("medication-dispensation",ScreenMedicationDispensationNode);
}
