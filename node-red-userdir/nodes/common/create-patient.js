module.exports = function(RED) {
  function ScreenCreatePatientNode(config) {
      RED.nodes.createNode(this,config);
      var node = this;
  }
  RED.nodes.registerType("create-patient",ScreenCreatePatientNode);
}
