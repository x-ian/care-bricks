module.exports = function(RED) {
  function ScreenDemographicAttributeNode(config) {
      RED.nodes.createNode(this,config);
      this.label = config.label;
      this.key = config.key;
      this.datatype = config.datatype;
      var node = this;
      node.on('input', function(msg) {
          msg.payload = msg.payload; //.toLowerCase();
          node.send(msg);
      });
  }
  RED.nodes.registerType("demographic-attribute",ScreenDemographicAttributeNode);
}
