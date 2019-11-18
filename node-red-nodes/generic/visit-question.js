module.exports = function(RED) {
    function VisitQuestionNode(properties) {
        RED.nodes.createNode(this,properties);

        this.label = properties.label;
        this.key = properties.key;
        this.datatype = properties.datatype;

        var node = this;

        node.on("input",function(message) {
            message.label = this.label;
            message.key = this.key;
            message.datatype = this.datatype;

            node.send(message);
        });
    }

    RED.nodes.registerType("visit-question",VisitQuestionNode);
}
