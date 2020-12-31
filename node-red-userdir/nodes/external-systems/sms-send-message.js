module.exports = function(RED) {
  function ScreenSMSSendMessageNode(config) {
      RED.nodes.createNode(this,config);
      var node = this;
  }
  RED.nodes.registerType("sms-send-message",ScreenSMSSendMessageNode);
}
