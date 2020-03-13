module.exports = function(RED) {
  function ScreenFindPatientNode(config) {
      RED.nodes.createNode(this,config);
      var node = this;
      node.includename = config.includename;
      node.includeidentifier = config.includeidentifier;
      node.program = config.program;
      node.expression = config.expression;
      node.on('input', function(msg) {
          msg.payload = msg.payload; //.toLowerCase();
          node.send(msg);
      });
  }
  RED.nodes.registerType("find-patient",ScreenFindPatientNode);
}
