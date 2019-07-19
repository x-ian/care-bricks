
// digraph implementation, stolen from https://medium.com/@ziyoshams/graphs-in-javascript-cc0ed170b156
class Graph {
  constructor() {
    this.AdjList = new Map();
  }

  addVertex(vertex) {
    if (!this.AdjList.has(vertex)) {
      this.AdjList.set(vertex, []);
    } else {
      throw 'Already Exist!!!';
    }
  }

  addEdge(vertex, node) {
    if (this.AdjList.has(vertex)) {
      if (this.AdjList.has(node)){
        let arr = this.AdjList.get(vertex);
        if(!arr.includes(node)){
          arr.push(node);
        }
      }else {
        throw `Can't add non-existing vertex ->'${node}'`;
      }
    } else {
      throw `You should add '${vertex}' first`;
    }
  }

  transitionsForNode(vertex) {
    if (!this.AdjList.has(vertex)) {
      console.log("Node doesnt exist; no transitions pulled!");
      return null;
    } else {
      return this.AdjList.get(vertex);
    }
  }

  backwardsTransitionsForNode(vertex) {
    if (!this.AdjList.has(vertex)) {
      console.log("Node doesnt exist; no transitions pulled!");
      return null;
    } else {
      var arr = [];
      for (let [key, value] of this.AdjList) {
        if (value.includes(vertex)) {
          arr.push(key);
        }
      }
      return arr;
    }
  }

  print() {
    for (let [key, value] of this.AdjList) {
      console.log(key, value);
    }
  }
}

function buildNodeRedGraph(jsonData) {
  let g = new Graph();
  let colors = ['red', 'green', 'blue'];
  for (const node of jsonData){
    if (node.type == "subflow") {
      g.addVertex(node.name);
    } else if (node.type == "function") {
        g.addVertex(node.name);
    }
  }
  for (const node of jsonData) {
    if (node.type == "function" || node.type.startsWith("subflow:")) {
      for (const wire of node.wires) {
        console.log("\n" + wire[0] + " - " + node.id);
        // id of source subflow definition
        let subflowDefinitionSourceId = null;
        if (node.type == "function") {
          subflowDefinitionSourceId = node.id;
        } else {
          subflowDefinitionSourceId = node.type.split(':')[1];
        }
        console.log("subflowDefinitionSourceId: " + subflowDefinitionSourceId);
        // name of source subflow definition
        let subflowDefinitionSourceName = getNodeById(jsonData, subflowDefinitionSourceId).name;
        console.log("subflowDefinitionSourceName: " + subflowDefinitionSourceName);
        let subflowInstanceDestinationId = wire[0]; // ID of destination subflow instance
        console.log("subflowInstanceDestinationId: " + subflowInstanceDestinationId);
        let subflowInstanceDestination = getNodeById(jsonData, subflowInstanceDestinationId);
        console.log("subflowInstanceDestination" + subflowInstanceDestination);

        let subflowDefinitionTargetName = null;
        if (subflowInstanceDestination.type.startsWith("subflow:")) {
          subflowDefinitionTargetName = getNodeById(jsonData, subflowInstanceDestination.type.split(':')[1]).name;
        } else {
          subflowDefinitionTargetName = subflowInstanceDestination.name;
        }
        console.log("subflowDefinitionTargetName: " + subflowDefinitionTargetName);
        g.addEdge(subflowDefinitionSourceName, subflowDefinitionTargetName);
      }
    }
    console.log(node.id);
  }
  return g;
}

function getNodeById(jsonData, id) {
  return jsonData.find(node => node.id === id);
}

function buildGraph(nodeRedJson){
  var userdata = JSON.parse(nodeRedJson);
  return buildNodeRedGraph(userdata);
}

function randomArrayElement(array) {
   return array[Math.floor(Math.random() * array.length)];
}
