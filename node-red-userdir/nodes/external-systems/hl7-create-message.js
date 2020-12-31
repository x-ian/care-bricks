module.exports = function(RED) {
  function ScreenHL7CreateMessageNode(config) {
      RED.nodes.createNode(this,config);
      var node = this;
  }
  RED.nodes.registerType("hl7-create-message",ScreenHL7CreateMessageNode);
}
