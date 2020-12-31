module.exports = function(RED) {
  function ScreenSMSReceiveMessageNode(config) {
      RED.nodes.createNode(this,config);
      var node = this;
  }
  RED.nodes.registerType("sms-receive-message",ScreenSMSReceiveMessageNode);
}
