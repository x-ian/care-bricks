module.exports = function(RED) {
    function VisitSelectNode(properties) {
        RED.nodes.createNode(this,properties);

        this.label = properties.label;
        this.key = properties.key;
        this.datatype = properties.datatype;

        var node = this;

        node.on("input",function(message) {
            message.label = this.label;
            message.key = this.key;
            message.behavior = this.behavior;

            node.send(message);
        });
    }

    RED.nodes.registerType("visit-select",VisitSelectNode);
}
