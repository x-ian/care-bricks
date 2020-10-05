
module.exports = function(RED) {
  function CareflowConfigNode(config) {
      RED.nodes.createNode(this,config);
      this.runtime_flow_path = config.runtime_flow_path;
  }
  RED.nodes.registerType("careflow-config",CareflowConfigNode);
}
