module.exports = function(RED) {
  function ScreenDemographicAttributeNode(config) {
      RED.nodes.createNode(this,config);
      var node = this;
      node.label = config.label;
      node.key = config.key;
      node.datatype = config.datatype;
      node.on('input', function(msg) {
          msg.payload = msg.payload; //.toLowerCase();
          node.send(msg);
      });
  }
  RED.nodes.registerType("demographic-attribute",ScreenDemographicAttributeNode);
}
