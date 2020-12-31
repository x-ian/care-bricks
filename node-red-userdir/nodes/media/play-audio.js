module.exports = function(RED) {
  function ScreenPlayAudioNode(config) {
      RED.nodes.createNode(this,config);
      var node = this;
  }
  RED.nodes.registerType("play-audio",ScreenPlayAudioNode);
}
