
module.exports = function(RED) {
  function CareflowConfigNode(config) {
      RED.nodes.createNode(this,config);
      this.name = config.name;
      this.runtime_flow_path = config.runtime_flow_path;
  }
  RED.nodes.registerType("careflow-config",CareflowConfigNode);
}
