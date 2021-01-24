module.exports = function(RED) {
  function ScreenFindPatientNode(config) {
      RED.nodes.createNode(this,config);
      var node = this;
      node.includename = config.includename;
      node.includeidentifier = config.includeidentifier;
      node.program = config.program;
      node.expression = config.expression;
      node.rowcontent = config.rowcontent;
  }
  RED.nodes.registerType("find-patient",ScreenFindPatientNode);
}
