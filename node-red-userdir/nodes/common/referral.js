module.exports = function(RED) {
  function ScreenReferralNode(config) {
      RED.nodes.createNode(this,config);
      var node = this;
      node.referralfacility = config.referralfacility;
  }
  RED.nodes.registerType("referral",ScreenReferralNode);
}
