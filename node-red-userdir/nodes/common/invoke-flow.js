module.exports = function(RED) {
  function ScreenInvokeFlowNode(config) {
      RED.nodes.createNode(this,config);
      var node = this;
      node.on('input', function(msg) {
          msg.payload = msg.payload; //.toLowerCase();
          node.send(msg);
      });
  }
  RED.nodes.registerType("invoke-flow",ScreenInvokeFlowNode);
}
