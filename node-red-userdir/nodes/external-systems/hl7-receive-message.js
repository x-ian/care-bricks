module.exports = function(RED) {
  function ScreenHL7ReceiveMessageNode(config) {
      RED.nodes.createNode(this,config);
      var node = this;
  }
  RED.nodes.registerType("hl7-receive-message",ScreenHL7ReceiveMessageNode);
}
