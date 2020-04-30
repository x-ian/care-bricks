module.exports = function(RED) {
  function ScreenSMSSendMessageNode(config) {
      RED.nodes.createNode(this,config);
      var node = this;
      node.on('input', function(msg) {
          msg.payload = msg.payload; //.toLowerCase();
          node.send(msg);
      });
  }
  RED.nodes.registerType("sms-send-message",ScreenSMSSendMessageNode);
}
