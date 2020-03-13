module.exports = function(RED) {
  function ScreenEnrolmentOutcomeNode(config) {
      RED.nodes.createNode(this,config);
      var node = this;
      node.program = config.program;
      node.programoutcome = config.programoutcome;
      node.on('input', function(msg) {
          msg.payload = msg.payload; //.toLowerCase();
          node.send(msg);
      });
  }
  RED.nodes.registerType("enrolment-outcome",ScreenEnrolmentOutcomeNode);
}
