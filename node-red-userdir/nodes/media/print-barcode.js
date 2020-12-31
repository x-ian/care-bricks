module.exports = function(RED) {
  function ScreenPrintBarcodeNode(config) {
      RED.nodes.createNode(this,config);
      var node = this;
  }
  RED.nodes.registerType("print-barcode",ScreenPrintBarcodeNode);
}
