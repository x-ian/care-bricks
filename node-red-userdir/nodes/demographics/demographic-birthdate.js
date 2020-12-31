module.exports = function(RED) {
  function ScreenDemographicBirthdateNode(config) {
      RED.nodes.createNode(this,config);
      var node = this;
      node.entrybyage = config.entrybyage;
      node.partialdate = config.partialdate;
  }
  RED.nodes.registerType("demographic-birthdate",ScreenDemographicBirthdateNode);
}
