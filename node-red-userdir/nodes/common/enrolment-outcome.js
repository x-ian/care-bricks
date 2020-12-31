module.exports = function(RED) {
  function ScreenEnrolmentOutcomeNode(config) {
      RED.nodes.createNode(this,config);
      var node = this;
      node.program = config.program;
      node.programoutcome = config.programoutcome;
  }
  RED.nodes.registerType("enrolment-outcome",ScreenEnrolmentOutcomeNode);
}
