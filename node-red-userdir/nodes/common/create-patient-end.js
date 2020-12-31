module.exports = function(RED) {
  function ScreenCreatePatientEndNode(config) {
      RED.nodes.createNode(this,config);
      var node = this;
  }
  RED.nodes.registerType("create-patient-end",ScreenCreatePatientEndNode);
}
