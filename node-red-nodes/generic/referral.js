module.exports = function(RED) {
  function ScreenReferralNode(config) {
      RED.nodes.createNode(this,config);
      var node = this;
      node.referralfacility = config.referralfacility;
      node.on('input', function(msg) {
          msg.payload = msg.payload; //.toLowerCase();
          node.send(msg);
      });
  }
  RED.nodes.registerType("referral",ScreenReferralNode);
}
