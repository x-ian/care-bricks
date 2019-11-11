module.exports = function(RED) {
    function SingleQuestionNode(properties) {
        RED.nodes.createNode(this,properties);

        this.label = properties.label;
        this.question = properties.question;
        this.key = properties.key;
        this.datatype = properties.datatype;

        var node = this;

        node.on("input",function(message) {
            message.label = this.label;
            message.question = this.question;
            message.key = this.key;
            message.datatype = this.datatype;

            node.send(message);
        });
    }

    RED.nodes.registerType("single-question",SingleQuestionNode);
}
