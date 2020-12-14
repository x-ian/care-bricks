module.exports = function(RED) {
    function SummaryInteractiveNode(properties) {
        RED.nodes.createNode(this,properties);

        this.label = properties.label;
        this.datatype = properties.datatype;

        var node = this;

        node.on("input",function(message) {
            message.label = this.label;

            node.send(message);
        });
    }

    RED.nodes.registerType("summary-interactive",SummaryInteractiveNode);
}
