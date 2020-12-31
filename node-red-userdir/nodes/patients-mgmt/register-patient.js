module.exports = function(RED) {
  function ScreenRegisterPatientNode(config) {
      RED.nodes.createNode(this,config);
      var node = this;
  }
  RED.nodes.registerType("register-patient",ScreenRegisterPatientNode);
}
