module.exports = function(RED) {
  function ScreenHL7CreateMessageNode(config) {
      RED.nodes.createNode(this,config);
      var node = this;
      node.on('input', function(msg) {
          msg.payload = msg.payload; //.toLowerCase();
          node.send(msg);
      });
  }
  RED.nodes.registerType("hl7-create-message",ScreenHL7CreateMessageNode);
}
