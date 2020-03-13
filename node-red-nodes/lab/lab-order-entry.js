module.exports = function(RED) {
  function ScreenLabOrderEntryNode(config) {
      RED.nodes.createNode(this,config);
      var node = this;
      node.panel = config.panel;
      node.on('input', function(msg) {
          msg.payload = msg.payload; //.toLowerCase();
          node.send(msg);
      });
  }
  RED.nodes.registerType("lab-order-entry",ScreenLabOrderEntryNode);
}
