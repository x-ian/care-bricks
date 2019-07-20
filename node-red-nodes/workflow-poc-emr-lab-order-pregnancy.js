module.exports = function(RED) {
  function WorkflowPocEmrScreenLabOrderPregnancyNode(config) {
      RED.nodes.createNode(this,config);
      var node = this;
      node.on('input', function(msg) {
          msg.payload = msg.payload; //.toLowerCase();
          node.send(msg);
      });
  }
  RED.nodes.registerType("lab-order-pregnancy",WorkflowPocEmrScreenLabOrderPregnancyNode);
}
