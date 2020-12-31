module.exports = function(RED) {
  function ScreenScanBarcodeNode(config) {
      RED.nodes.createNode(this,config);
      var node = this;
  }
  RED.nodes.registerType("scan-barcode",ScreenScanBarcodeNode);
}
