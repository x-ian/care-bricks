module.exports = function(RED) {
  function ScreenTextToSpeechNode(config) {
      RED.nodes.createNode(this,config);
      var node = this;
  }
  RED.nodes.registerType("text-to-speech",ScreenTextToSpeechNode);
}
