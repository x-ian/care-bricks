module.exports = function(RED) {
    function ConfigRuntimeNode(n) {
        RED.nodes.createNode(this,n);
        this.flowpath = n.flowpath;
    }
    RED.nodes.registerType("config-runtime",ConfigRuntimeNode);
}