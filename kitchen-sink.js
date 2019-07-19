function readJSON(path) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', path, true);
    xhr.responseType = 'blob';
    xhr.onload = function(e) {
      if (this.status == 200) {
          var file = new File([this.response], 'temp');
          var fileReader = new FileReader();
          fileReader.addEventListener('load', function(){
               //do stuff with fileReader.result
          });
          fileReader.readAsText(file);
      }
    }
    xhr.send();
}

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

function buildDemoGraph() {
  let g = new Graph();
let arr = ['A', 'B', 'C', 'D', 'E', 'F'];
for (let i = 0; i < arr.length; i++) {
  g.addVertex(arr[i]);
}
g.addEdge('A', 'B');
g.addEdge('A', 'D');
g.addEdge('A', 'E');
g.addEdge('B', 'C');
g.addEdge('D', 'E');
g.addEdge('E', 'F');
g.addEdge('E', 'C');
g.addEdge('C', 'F');
g.print();

}

function simpletest() {
//var data = '[{"name" : "John Doe", "age" : "25"},{"name" : "Jane Doe", "age" : "20"}]';
var data = '[{"id":"d9593dc5.7633a","type":"subflow","name":"Register patient","info":"","category":"ClinicFlow - Choose Patient","in":[{"x":50,"y":30,"wires":[]}],"out":[{"x":160,"y":30,"wires":[]}],"env":[],"outputLabels":["patient created"],"icon":"node-red/watch.png"},{"id":"edec0f38.4d529","type":"subflow","name":"Find patient","info":"sdfsdf","category":"ClinicFlow - Choose Patient","in":[{"x":50,"y":30,"wires":[]}],"out":[{"x":160,"y":30,"wires":[]},{"x":215,"y":30,"wires":[]}],"env":[],"inputLabels":["in"],"outputLabels":["patient found","patient not found"],"icon":"node-red/watch.png"},{"id":"335187a0.9eb888","type":"subflow","name":"Scheduled patients list","info":"","category":"ClinicFlow - Choose Patient","in":[{"x":50,"y":30,"wires":[]}],"out":[{"x":160,"y":30,"wires":[]},{"x":215,"y":30,"wires":[]}],"env":[],"outputLabels":["select scheduled patient","patient not found"],"icon":"node-red/watch.png"},{"id":"707b8ca3.1e8a04","type":"subflow","name":"Check in","info":"","category":"ClinicFlow - Modify Patient","in":[{"x":50,"y":30,"wires":[]}],"out":[{"x":160,"y":30,"wires":[]}],"env":[],"icon":"font-awesome/fa-user-o"},{"id":"6c6c2e96.a3096","type":"subflow","name":"End station","info":"","category":"ClinicFlow - Mark flow end","in":[{"x":50,"y":30,"wires":[]}],"out":[],"env":[],"icon":"font-awesome/fa-stop-circle-o"},{"id":"c72640eb.19d2e","type":"tab","label":"ClinicFlow: Check In","disabled":false,"info":""},{"id":"5afdea16.4c92f4","type":"subflow:6c6c2e96.a3096","z":"c72640eb.19d2e","name":"","env":[],"x":663.7044563293457,"y":97.37502098083496,"wires":[]},{"id":"26e87a87.1d83b6","type":"subflow:707b8ca3.1e8a04","z":"c72640eb.19d2e","name":"","env":[],"x":400.01422119140625,"y":97.0000057220459,"wires":[["5afdea16.4c92f4"]]},{"id":"58974c75.9ac284","type":"subflow:335187a0.9eb888","z":"c72640eb.19d2e","name":"","env":[],"x":134.01409912109375,"y":51,"wires":[["26e87a87.1d83b6"],["4f74cc62.c816a4"]]},{"id":"4f74cc62.c816a4","type":"subflow:edec0f38.4d529","z":"c72640eb.19d2e","name":"","env":[{"name":"env","type":"str","value":"sdfsdf"}],"x":167.0141372680664,"y":101.99999237060547,"wires":[["26e87a87.1d83b6"],["1f5ac612.5340fa"]],"info":"sdfsdfsdf"},{"id":"1f5ac612.5340fa","type":"subflow:d9593dc5.7633a","z":"c72640eb.19d2e","name":"","env":[],"x":162.01412200927734,"y":152.9999713897705,"wires":[["26e87a87.1d83b6"]]}]';
var userdata = JSON.parse(data);
var user1_name = userdata[0].id;
var user1_age = userdata[0].type;
console.log(user1_name);
}

function buildNodeRedGraph(jsonData) {
  let g = new Graph();

  for (const node of jsonData){
    if (node.type == "tab") {
      // g.addVertex(node.type);
    } else if (node.type == "function") {
      g.addVertex(node.name);
    } else if (node.type.startsWith("subflow:")) {
      // g.addVertex(node.type);
    } else if (node.type == "subflow") {
      // g.addVertex(node.name);
    } else {
      g.addVertex(node.type);
    }
  }
  // return g;

  for (const node of jsonData) {
    // if (node.type == "function" || node.type.startsWith("subflow:")) {
    if (node.type != "tab" && node.type != "subflow") {
      for (const wire of node.wires) {
        console.log("\n" + wire[0] + " - " + node.id);

        if (wire.length == 0) {
          // no wires return empty array
        } else if (node.type.startsWith("subflow:")) {
          // TODO: find all nodes that point to this subflow

          // g.addEdge("current-address", "check-in");

          // get last node of subflow subflowDefinition
          let subflowDefinition = getNodeById(jsonData, node.type.split(':')[1]);
          let transitionSourceId = subflowDefinition.out[0].wires[0].id;
          console.log("transitionSourceId: " + transitionSourceId);
          let transitionSourceName = getNodeById(jsonData, transitionSourceId).type;
          console.log("transitionSourceName: " + transitionSourceName);
          let transitionDestination = getNodeById(jsonData, wire[0]);
          console.log("transitionDestination: " + transitionDestination);
          let transitionDestinationName = transitionDestination.type;
          console.log("transitionDestinationName: " + transitionDestinationName);
          g.addEdge(transitionSourceName, transitionDestinationName);
          //
          // let transitionDestinationId = wire[0];
          // console.log("transitionDestinationId: " + transitionDestinationId);
          // let transitionDestination = getNodeById(jsonData, transitionDestinationId);
          // console.log("transitionDestination: " + transitionDestination);
          // let transitionDestinationName = transitionDestination.type;
          // console.log("transitionDestinationName: " + transitionDestinationName);
          // g.addEdge(transitionSourceName, transitionDestinationName);

          // transitionSourceId = node.id;
          // transitionSourceName = node.type;
          // transitionDestinationId = wire[0];
          // transitionDestination = getNodeById(jsonData, transitionDestinationId);
          // transitionTargetName = transitionDestination.type;
        } else {
          let transitionSourceId = node.id;
          console.log("transitionSourceId: " + transitionSourceId);
          let transitionSourceName = node.type;
          console.log("transitionSourceName: " + transitionSourceName);
          let transitionDestinationId = wire[0];
          console.log("transitionDestinationId: " + transitionDestinationId);
          let transitionDestination = getNodeById(jsonData, transitionDestinationId);
          console.log("transitionDestination: " + transitionDestination);
          if (transitionDestination.type.startsWith("subflow:")) {
            // wire points to subflow instance
            let subflowDefinition = getNodeById(jsonData, transitionDestination.type.split(':')[1]);
            // for now take first in node of subflow definition
            transitionDestination = getNodeById(jsonData, subflowDefinition.in[0].wires[0].id);
            let transitionDestinationName = transitionDestination.type;
            g.addEdge(transitionSourceName, transitionDestinationName);
          } else {
            let transitionDestinationName = transitionDestination.type;
            console.log("transitionDestinationName: " + transitionDestinationName);
            g.addEdge(transitionSourceName, transitionDestinationName);
          }
        }
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

// var checkinJson = '[{"id":"d9593dc5.7633a","type":"subflow","name":"Register patient","info":"","category":"ClinicFlow - Choose Patient","in":[{"x":50,"y":30,"wires":[]}],"out":[{"x":160,"y":30,"wires":[]}],"env":[],"outputLabels":["patient created"],"icon":"node-red/watch.png"},{"id":"edec0f38.4d529","type":"subflow","name":"Find patient","info":"sdfsdf","category":"ClinicFlow - Choose Patient","in":[{"x":50,"y":30,"wires":[]}],"out":[{"x":160,"y":30,"wires":[]},{"x":215,"y":30,"wires":[]}],"env":[],"inputLabels":["in"],"outputLabels":["patient found","patient not found"],"icon":"node-red/watch.png"},{"id":"335187a0.9eb888","type":"subflow","name":"Scheduled patients list","info":"","category":"ClinicFlow - Choose Patient","in":[{"x":50,"y":30,"wires":[]}],"out":[{"x":160,"y":30,"wires":[]},{"x":215,"y":30,"wires":[]}],"env":[],"outputLabels":["select scheduled patient","patient not found"],"icon":"node-red/watch.png"},{"id":"707b8ca3.1e8a04","type":"subflow","name":"Check in","info":"","category":"ClinicFlow - Modify Patient","in":[{"x":50,"y":30,"wires":[]}],"out":[{"x":160,"y":30,"wires":[]}],"env":[],"icon":"font-awesome/fa-user-o"},{"id":"6c6c2e96.a3096","type":"subflow","name":"End station","info":"","category":"ClinicFlow - Mark flow end","in":[{"x":50,"y":30,"wires":[]}],"out":[],"env":[],"icon":"font-awesome/fa-stop-circle-o"},{"id":"c72640eb.19d2e","type":"tab","label":"ClinicFlow: Check In","disabled":false,"info":""},{"id":"5afdea16.4c92f4","type":"subflow:6c6c2e96.a3096","z":"c72640eb.19d2e","name":"","env":[],"x":663.7044563293457,"y":97.37502098083496,"wires":[]},{"id":"26e87a87.1d83b6","type":"subflow:707b8ca3.1e8a04","z":"c72640eb.19d2e","name":"","env":[],"x":400.01422119140625,"y":97.0000057220459,"wires":[["5afdea16.4c92f4"]]},{"id":"58974c75.9ac284","type":"subflow:335187a0.9eb888","z":"c72640eb.19d2e","name":"","env":[],"x":134.01409912109375,"y":51,"wires":[["26e87a87.1d83b6"],["4f74cc62.c816a4"]]},{"id":"4f74cc62.c816a4","type":"subflow:edec0f38.4d529","z":"c72640eb.19d2e","name":"","env":[{"name":"env","type":"str","value":"sdfsdf"}],"x":167.0141372680664,"y":101.99999237060547,"wires":[["26e87a87.1d83b6"],["1f5ac612.5340fa"]],"info":"sdfsdfsdf"},{"id":"1f5ac612.5340fa","type":"subflow:d9593dc5.7633a","z":"c72640eb.19d2e","name":"","env":[],"x":162.01412200927734,"y":152.9999713897705,"wires":[["26e87a87.1d83b6"]]}]';

var checkinJson = '[{"id":"d62906f9.4ccc38","type":"subflow","name":"Patient Demographics","info":"","category":"Workflow POC EMR","in":[{"x":50,"y":30,"wires":[{"id":"f7f709.3abd58f8"}]}],"out":[{"x":550.0000076293945,"y":37.999999046325684,"wires":[{"id":"a69e2ca7.54e65","port":0}]}],"env":[]},{"id":"30276bf7.e2a344","type":"lastname","z":"d62906f9.4ccc38","name":"","x":352.0028533935547,"y":28.877891540527344,"wires":[["78530626.a59798"]]},{"id":"a9955b2.cda11a8","type":"home-address","z":"d62906f9.4ccc38","name":"","x":201.00282287597656,"y":167.93189239501953,"wires":[["a69e2ca7.54e65"]]},{"id":"f7f709.3abd58f8","type":"firstname","z":"d62906f9.4ccc38","name":"","x":180.99999237060547,"y":29.9573917388916,"wires":[["30276bf7.e2a344"]]},{"id":"a69e2ca7.54e65","type":"current-address","z":"d62906f9.4ccc38","name":"","x":409.99715423583984,"y":167.00000476837158,"wires":[[]]},{"id":"78530626.a59798","type":"birthdate","z":"d62906f9.4ccc38","name":"","x":185.9999885559082,"y":100.05964851379395,"wires":[["a9955b2.cda11a8"]]},{"id":"df67d84c.8d6f08","type":"tab","label":"Check in","disabled":false,"info":""},{"id":"5c2da2b9.cd99fc","type":"scheduled-patients-list","z":"df67d84c.8d6f08","name":"","x":112.19883728027344,"y":46.809600830078125,"wires":[["b9b6e9d0.66b138"]]},{"id":"a295544b.d32758","type":"register-patient","z":"df67d84c.8d6f08","name":"","x":128.20169067382812,"y":124.82951545715332,"wires":[["21440d1f.5b7182"]]},{"id":"61f9a5df.9865fc","type":"find-patient","z":"df67d84c.8d6f08","name":"","x":137.1903076171875,"y":86.9317569732666,"wires":[["b9b6e9d0.66b138"]]},{"id":"941a31ea.948d1","type":"end-flow","z":"df67d84c.8d6f08","name":"","x":563.1960067749023,"y":87.95166015625,"wires":[]},{"id":"b9b6e9d0.66b138","type":"check-in","z":"df67d84c.8d6f08","name":"","x":388.1902961730957,"y":87.99714088439941,"wires":[["941a31ea.948d1"]]},{"id":"21440d1f.5b7182","type":"subflow:d62906f9.4ccc38","z":"df67d84c.8d6f08","name":"","env":[],"x":288.1931686401367,"y":193.44731330871582,"wires":[["b9b6e9d0.66b138"]]}]';

var checkinJsonSimplified = '[{"id":"df67d84c.8d6f08","type":"tab","label":"Check in","disabled":false,"info":""},{"id":"5c2da2b9.cd99fc","type":"scheduled-patients-list","z":"df67d84c.8d6f08","name":"","x":112.19883728027344,"y":46.809600830078125,"wires":[["b9b6e9d0.66b138"]]},{"id":"61f9a5df.9865fc","type":"find-patient","z":"df67d84c.8d6f08","name":"","x":137.1903076171875,"y":86.9317569732666,"wires":[["b9b6e9d0.66b138"]]},{"id":"941a31ea.948d1","type":"end-flow","z":"df67d84c.8d6f08","name":"","x":563.1960067749023,"y":87.95166015625,"wires":[]},{"id":"b9b6e9d0.66b138","type":"check-in","z":"df67d84c.8d6f08","name":"","x":388.1902961730957,"y":87.99714088439941,"wires":[["941a31ea.948d1"]]}]';

var vitalsJson = '[{"id":"a0b464d6.270658","type":"subflow","name":"Checked-in patients list","info":"","category":"ClinicFlow - Choose Patient","in":[{"x":50,"y":30,"wires":[]}],"out":[{"x":160,"y":30,"wires":[]}],"env":[],"icon":"node-red/watch.png"},{"id":"6c6c2e96.a3096","type":"subflow","name":"End station","info":"","category":"ClinicFlow - Mark flow end","in":[{"x":50,"y":30,"wires":[]}],"out":[],"env":[],"icon":"font-awesome/fa-stop-circle-o"},{"id":"382e54d.1ebbcac","type":"subflow","name":"Next Appointment","info":"","category":"ClinicFlow - Modify Patient","in":[{"x":50,"y":30,"wires":[]}],"out":[{"x":160,"y":30,"wires":[]}],"env":[],"icon":"font-awesome/fa-user-o"},{"id":"562747d3.16f728","type":"subflow","name":"Lab Order: Sputum","info":"","category":"ClinicFlow - Modify Patient","in":[{"x":50,"y":30,"wires":[]}],"out":[{"x":160,"y":30,"wires":[]}],"env":[],"icon":"font-awesome/fa-user-o"},{"id":"8279021a.e7a1","type":"subflow","name":"Lab Order: Pregnancy Test","info":"","category":"ClinicFlow - Modify Patient","in":[{"x":50,"y":30,"wires":[]}],"out":[{"x":160,"y":30,"wires":[]}],"env":[],"icon":"font-awesome/fa-user-o"},{"id":"8478e961.187628","type":"subflow","name":"TB Screening","info":"","category":"ClinicFlow - Modify Patient","in":[{"x":50,"y":30,"wires":[]}],"out":[{"x":160,"y":30,"wires":[]},{"x":215,"y":30,"wires":[]}],"env":[],"outputLabels":["positive","negative"],"icon":"font-awesome/fa-user-o"},{"id":"9b44cbd3.7e4788","type":"subflow","name":"Vitals: Blood Pressure","info":"","category":"ClinicFlow - Modify Patient","in":[{"x":50,"y":30,"wires":[]}],"out":[{"x":160,"y":30,"wires":[]}],"env":[],"icon":"font-awesome/fa-user-o"},{"id":"8eb7b1ae.2ce08","type":"subflow","name":"Vitals: Height & Weight","info":"","category":"ClinicFlow - Modify Patient","in":[{"x":50,"y":30,"wires":[]}],"out":[{"x":160,"y":30,"wires":[]}],"env":[],"icon":"font-awesome/fa-user-o"},{"id":"a311dda2.7c3c6","type":"tab","label":"ClinicFlow: Vitals & Screening","disabled":false,"info":""},{"id":"906fef09.aab4b","type":"subflow:8eb7b1ae.2ce08","z":"a311dda2.7c3c6","name":"","env":[],"x":415.3068542480469,"y":37.00000190734863,"wires":[["ce72cb0c.6fb848"]]},{"id":"ce6718e2.a03dc8","type":"subflow:9b44cbd3.7e4788","z":"a311dda2.7c3c6","name":"","env":[],"x":636.1902618408203,"y":96.80956506729126,"wires":[["6836e9bb.4ce3c8"]]},{"id":"fb2c158c.900ed8","type":"subflow:8478e961.187628","z":"a311dda2.7c3c6","name":"","env":[],"x":392.0085983276367,"y":236.79831314086914,"wires":[["6153b9c3.dcca58"],["679c61e9.7b6ed"]]},{"id":"a8d5b4f.87e4848","type":"subflow:8279021a.e7a1","z":"a311dda2.7c3c6","name":"","env":[],"x":661.0000228881836,"y":165.87221717834473,"wires":[["fb2c158c.900ed8"]]},{"id":"6836e9bb.4ce3c8","type":"function","z":"a311dda2.7c3c6","name":"female && >= 15 yrs","func":"return msg;","outputs":2,"noerr":0,"x":411.81824493408203,"y":170.99722862243652,"wires":[["a8d5b4f.87e4848"],["fb2c158c.900ed8"]],"outputLabels":["female && >= 15 yrs","all others"]},{"id":"6153b9c3.dcca58","type":"subflow:562747d3.16f728","z":"a311dda2.7c3c6","name":"","env":[],"x":634.0085525512695,"y":232.5000524520874,"wires":[["679c61e9.7b6ed"]]},{"id":"679c61e9.7b6ed","type":"subflow:382e54d.1ebbcac","z":"a311dda2.7c3c6","name":"","env":[],"x":401.00569915771484,"y":304.48294830322266,"wires":[["ca7ed339.1b399"]]},{"id":"ca7ed339.1b399","type":"subflow:6c6c2e96.a3096","z":"a311dda2.7c3c6","name":"","x":628.7357769012451,"y":380.46876335144043,"wires":[]},{"id":"ce72cb0c.6fb848","type":"function","z":"a311dda2.7c3c6","name":"under 5","func":"return msg;","outputs":2,"noerr":0,"x":375.5483512878418,"y":104.90341472625732,"wires":[["ce6718e2.a03dc8"],["6836e9bb.4ce3c8"]],"outputLabels":[">= 5 yrs","all others"]},{"id":"8f15a31d.f6604","type":"subflow:a0b464d6.270658","z":"a311dda2.7c3c6","name":"","env":[],"x":134,"y":37.69892501831055,"wires":[["906fef09.aab4b"]]}]';

let g = buildGraph(checkinJson);
g.print();
// console.log(g.transitionsForNode("female && >= 15 yrs"));
// console.log("\n");
// console.log(g.backwardsTransitionsForNode("female && >= 15 yrs"));
// // console.log(g.backwardsTransitionsForNode("Next Appointment"));
// console.log(randomArrayElement(g.backwardsTransitionsForNode("female && >= 15 yrs")));

// var myString = "dfsdg12 12|?!";
// myString = myString.replace(/[^\w]/g,'');
// console.log(myString);
