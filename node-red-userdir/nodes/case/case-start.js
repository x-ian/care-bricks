module.exports = function(RED) {
  function ScreenCaseStartNode(config) {
      RED.nodes.createNode(this,config);
      var node = this;
      node.includename = config.includename;
      node.includeidentifier = config.includeidentifier;
      node.program = config.program;
      node.expression = config.expression;
  }
  RED.nodes.registerType("case-start",ScreenCaseStartNode);
}
