module.exports = function(RED) {
    function QuestionPrimitiveNode(properties) {
        RED.nodes.createNode(this,properties);
        this.label = properties.label;
        this.scope = properties.scope;
        this.key = properties.key;
        this.datatype = properties.datatype;
		this.optional = properties.optional;
    }
    RED.nodes.registerType("question-primitive",QuestionPrimitiveNode);
}
