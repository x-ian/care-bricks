module.exports = function(RED) {
  function ScreenNextAppointmentNode(config) {
      RED.nodes.createNode(this,config);
      var node = this;
      node.defaultperiod = config.defaultperiod;
      node.on('input', function(msg) {
          msg.payload = msg.payload; //.toLowerCase();
          node.send(msg);
      });
  }
  RED.nodes.registerType("next-appointment",ScreenNextAppointmentNode);
}
