module.exports = function(RED) {
  function ScreenTakePhotoNode(config) {
      RED.nodes.createNode(this,config);
      var node = this;
  }
  RED.nodes.registerType("take-photo",ScreenTakePhotoNode);
}
