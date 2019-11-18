module.exports = function(RED) {
  function ScreenDemographicBirthdateNode(config) {
      RED.nodes.createNode(this,config);
      var node = this;
      node.entrybyage = config.entrybyage;
      node.partialdate = config.partialdate;
      node.on('input', function(msg) {
          msg.payload = msg.payload; //.toLowerCase();
          node.send(msg);
      });
  }
  RED.nodes.registerType("demographic-birthdate",ScreenDemographicBirthdateNode);
}
