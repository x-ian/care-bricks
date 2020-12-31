module.exports = function(RED) {
  function ScreenMedicationPrescriptionNode(config) {
      RED.nodes.createNode(this,config);
      var node = this;
      node.drugs = config.drugs;
  }
  RED.nodes.registerType("medication-prescription",ScreenMedicationPrescriptionNode);
}
