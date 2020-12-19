
function randomArrayElement(array) {
   return array[Math.floor(Math.random() * array.length)];
}

function flowLabelFromSubnode(jsonFlow, nodeid) {
	var node = nodeById(jsonFlow, nodeid);
	return nodeById(jsonFlow, node.z).label;
}

function allFlows(jsonFlow) {
  var tabs = jsonFlow.filter(function(i) {
    // console.log(i);
    return i.type === 'tab';
  });
  // console.log(tabs);
  return tabs;
}

function allFlows2(jsonFlow) {
  return allFlows(jsonFlow);
}

function allStartNodes(jsonFlow, flow) {
  var nodes = jsonFlow.filter(function(i) {
    // console.log(i);
    return i.z === flow.id && isStartNodeType(i);
  });
  // console.log(tabs);
  return nodes;
}

function nodeById(jsonFlow, nodeid) {
  var nodes = jsonFlow.filter(function(i) {
    // console.log(i);
    return i.id === nodeid;
  });
  // console.log(tabs);
  if (nodes.length == 1) {
    return nodes[0];
  }
  return null;
}

function nodesByType(jsonFlow, nodetype) {
  var nodes = jsonFlow.filter(function(i) {
    // console.log(i);
    return i.type === nodetype;
  });
  return nodes;
}

function isStartNodeType(node) {
  // todo find a better way instead of hardcoding the list
  // maybe by looking up our node types to filter for all with no input
  return node.type.match(/^(find-patient|patients-queue|register-patient|checked-in-patients-list|scheduled-patients-list|hl7-receive-message|case-start)$/);
}

function nextNode(jsonFlow, node) {
  return nextNodes(jsonFlow, node);
}

function nextNodes(jsonFlow, node) {
  // todo, possibly wrong data structure, maybe a map instead?
  var nodes = [];

  for (const wire of node.wires) {
    if (wire.length == 0) {
      // no wires

      // check if end node of subflow
      var parent = nodeById(jsonFlow, node.z);
      if (parent.type === 'subflow') {
        if (node.id === parent.out[0].wires[0].id) {
          // this node is the last node of one or more subflows
          var subflows = nodesByType(jsonFlow, 'subflow:' + parent.id);
          for (const subflow of subflows) {
            nodes.push(nodeById(jsonFlow, subflow.wires[0][0]));
          }
        }
      }
      // do nothing
    } else if (node.type.startsWith("subflow:")) {
      // console.log('subflow');
      // get last node of subflow subflowDefinition
      let subflowDefinition = nodeById(jsonFlow, node.type.split(':')[1]);
      let transitionSourceId = subflowDefinition.out[0].wires[0].id;
      // console.log("transitionSourceId: " + transitionSourceId);
      let transitionSourceName = nodeById(jsonFlow, transitionSourceId).type;
      // console.log("transitionSourceName: " + transitionSourceName);
      let transitionDestination = nodeById(jsonFlow, wire[0]);
      // console.log("transitionDestination: " + transitionDestination);
      let transitionDestinationName = transitionDestination.type;
      // console.log("transitionDestinationName: " + transitionDestinationName);
      nodes.push(transitionDestination);
    } else {
      // console.log('else');
      let transitionSourceId = node.id;
      // console.log("transitionSourceId: " + transitionSourceId);
      let transitionSourceName = node.type;
      if (node.type == "condition") {
        transitionSourceName = node.name.replace('/ /g', '-').replace('/?/g', '');
      }
      // console.log("transitionSourceName: " + transitionSourceName);
      let transitionDestinationId = wire[0];
      // console.log("transitionDestinationId: " + transitionDestinationId);
      let transitionDestination = nodeById(jsonFlow, transitionDestinationId);
      // console.log("transitionDestination: " + transitionDestination);
      if (transitionDestination.type.startsWith("subflow:")) {
        // wire points to subflow instance
        let subflowDefinition = nodeById(jsonFlow, transitionDestination.type.split(':')[1]);
        // for now take first in node of subflow definition
        transitionDestination = nodeById(jsonFlow, subflowDefinition.in[0].wires[0].id);
        let transitionDestinationName = transitionDestination.type;
        nodes.push(transitionDestination);
      } else if (transitionDestination.type == "condition") {
          transitionDestinationName = transitionDestination.name.replace('/ /g', '-').replace('/?/g', '');;
          // nodes.push(transitionDestination);
          // g.addEdge(transitionSourceName, transitionDestinationName);
      } else {
        let transitionDestinationName = transitionDestination.type;
        // console.log("transitionDestinationName: " + transitionDestinationName);
        nodes.push(transitionDestination);
        // g.addEdge(transitionSourceName, transitionDestinationName);
      }
    }
// }
}
  return nodes;
}

// var jsonFlow = JSON.parse(checkInJson2);
// var flows = allFlows(jsonFlow);
// var startNodes = allStartNodes(jsonFlow, flows[0]);

// console.log(startNodes);
// console.log(nextNode(jsonFlow, startNodes[0]));

function digAllTransistions(jsonFlow, node, depth) {
  var newDepth = depth + 1;
  var nextN = nextNode(jsonFlow, node);
  console.log("from:")
  console.log(node);
  console.log("to:");
  console.log(nextN);
  console.log("");
  console.log("");
  console.log(depth);

  if (newDepth <15) {
  // if (nextNode(jsonFlow, node) !== undefined && depth <5){
    digAllTransistions(jsonFlow, nextN, newDepth);
  }
}
// for (const startNode of startNodes) {
  // digAllTransistions(jsonFlow, startNode, 0);
// }

// console.log(digAllTransistions(jsonFlow, nodeById(jsonFlow, '4a47058f.1419cc')));
// console.log(digAllTransistions(jsonFlow, nodeById(jsonFlow, 'afa5710c.59722')));
// console.log(digAllTransistions(jsonFlow, nodeById(jsonFlow, 'fc497db6.60d148')));
// console.log(digAllTransistions(jsonFlow, nodeById(jsonFlow, '95d781f0.d999a8')));
// console.log(digAllTransistions(jsonFlow, nodeById(jsonFlow, '84b36bb7.0f7a88')));
// console.log(digAllTransistions(jsonFlow, nodeById(jsonFlow, 'f5f34af9.c76168')));
// console.log(digAllTransistions(jsonFlow, nodeById(jsonFlow, '58b0457b.a26724')));
// console.log(digAllTransistions(jsonFlow, nodeById(jsonFlow, 'e65fc26f.10c1f8')));
// console.log(digAllTransistions(jsonFlow, nodeById(jsonFlow, 'c86b2579.44b7a')));
// console.log(digAllTransistions(jsonFlow, nodeById(jsonFlow, '9b537aa9.adccd')));
// let g = buildGraph(checkinJson);
// g.print();
// console.log(g.transitionsForNode("female && >= 15 yrs"));
// console.log("\n");
// console.log(g.backwardsTransitionsForNode("female && >= 15 yrs"));
// // console.log(g.backwardsTransitionsForNode("Next Appointment"));
// console.log(randomArrayElement(g.backwardsTransitionsForNode("female && >= 15 yrs")));

// var myString = "dfsdg12 12|?!";
// myString = myString.replace(/[^\w]/g,'');
// console.log(myString);
