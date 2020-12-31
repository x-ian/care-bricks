module.exports = function(RED) {
  function ScreenNextAppointmentNode(config) {
      RED.nodes.createNode(this,config);
      var node = this;
      node.defaultperiod = config.defaultperiod;
  }
  RED.nodes.registerType("next-appointment",ScreenNextAppointmentNode);
}
