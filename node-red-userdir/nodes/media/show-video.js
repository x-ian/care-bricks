module.exports = function(RED) {
  function ScreenShowVideoNode(config) {
      RED.nodes.createNode(this,config);
      var node = this;
  }
  RED.nodes.registerType("show-video",ScreenShowVideoNode);
}
