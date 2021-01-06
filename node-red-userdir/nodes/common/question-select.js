module.exports = function(RED) {
    function QuestionSelectNode(properties) {
        RED.nodes.createNode(this,properties);
        this.label = properties.label;
        this.scope = properties.scope;
        this.key = properties.key;
        this.datatype = properties.datatype;
    }
    RED.nodes.registerType("question-select",QuestionSelectNode);
}
