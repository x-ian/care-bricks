// digraph implementation, stolen from https://medium.com/@ziyoshams/graphs-in-javascript-cc0ed170b156
class Graph {
  constructor() {
    this.AdjList = new Map();
    this.nodes = {};
  }

  addVertex(vertex) {
    if (!this.AdjList.has(vertex)) {
      this.AdjList.set(vertex, []);
    } else {
      throw vertex + ' already Exist!!!';
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
        throw `Can't add non-existing '${vertex}' ->'${node}'`;
      }
    } else {
      throw `You should add '${vertex}' first`;
    }
  }

  transitionsForNode(vertex) {
    if (!this.AdjList.has(vertex)) {
      console.log("Node " + vertex + " doesnt exist; no transitions pulled!");
      return [];
    } else {
      return this.AdjList.get(vertex);
    }
  }

  backwardsTransitionsForNode(vertex) {
    if (!this.AdjList.has(vertex)) {
      console.log("Node " + vertex + " doesnt exist; no reverse transitions pulled!");
      return [];
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

  for (const node of jsonData){
    if (node.type == "tab") {
        // TODO
    } else if (node.type == "condition") {
      g.addVertex(node.name);
      g.nodes[node.name] = node;
    } else if (node.type.startsWith("subflow:")) {
      // TODO
    } else if (node.type == "subflow") {
      // TODO
    } else {
      g.addVertex(node.type);
      g.nodes[node.type] = node;
    }
  }
  // return g;

  for (const node of jsonData) {
    // if (node.type == "function" || node.type.startsWith("subflow:")) {
    if (node.type != "tab" && node.type != "subflow") {
      for (const wire of node.wires) {
        // console.log("\n" + wire[0] + " - " + node.id);
        if (wire.length == 0) {
          // no wires return empty array
        } else if (node.type.startsWith("subflow:")) {
          // get last node of subflow subflowDefinition
          let subflowDefinition = getNodeById(jsonData, node.type.split(':')[1]);
          let transitionSourceId = subflowDefinition.out[0].wires[0].id;
          // console.log("transitionSourceId: " + transitionSourceId);
          let transitionSourceName = getNodeById(jsonData, transitionSourceId).type;
          // console.log("transitionSourceName: " + transitionSourceName);
          let transitionDestination = getNodeById(jsonData, wire[0]);
          // console.log("transitionDestination: " + transitionDestination);
          let transitionDestinationName = transitionDestination.type;
          // console.log("transitionDestinationName: " + transitionDestinationName);
          g.addEdge(transitionSourceName, transitionDestinationName);
        } else {
          let transitionSourceId = node.id;
          // console.log("transitionSourceId: " + transitionSourceId);
          let transitionSourceName = node.type;
          if (node.type == "condition") {
            transitionSourceName = node.name.replace('/ /g', '-').replace('/?/g', '');
          }
          // console.log("transitionSourceName: " + transitionSourceName);
          let transitionDestinationId = wire[0];
          // console.log("transitionDestinationId: " + transitionDestinationId);
          let transitionDestination = getNodeById(jsonData, transitionDestinationId);
          // console.log("transitionDestination: " + transitionDestination);
          if (transitionDestination.type.startsWith("subflow:")) {
            // wire points to subflow instance
            let subflowDefinition = getNodeById(jsonData, transitionDestination.type.split(':')[1]);
            // for now take first in node of subflow definition
            transitionDestination = getNodeById(jsonData, subflowDefinition.in[0].wires[0].id);
            let transitionDestinationName = transitionDestination.type;
            g.addEdge(transitionSourceName, transitionDestinationName);
          } else if (transitionDestination.type == "condition") {
              transitionDestinationName = transitionDestination.name.replace('/ /g', '-').replace('/?/g', '');;
              g.addEdge(transitionSourceName, transitionDestinationName);
          } else {
            let transitionDestinationName = transitionDestination.type;
            // console.log("transitionDestinationName: " + transitionDestinationName);
            g.addEdge(transitionSourceName, transitionDestinationName);
          }
        }
      }
    }
    // console.log(node.id);
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
