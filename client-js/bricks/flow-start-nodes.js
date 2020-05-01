function onLoadFlowStartNodes() {
	var flows = allFlows2(jsonFlow);

	let flowid = getUrlParam('flowid');

	for (const flow of flows) {
		if (flow.id === flowid) {
			for (const node of allStartNodes(jsonFlow, flow)) {
				// todo, dynamic element creation better done via jquery
				var allFlows = document.getElementById('all-flows');
				var divRow = document.createElement("div");
				divRow.className = "row";
				var divButton = document.createElement("div");
				divButton.className = "col text-center"
				var button = document.createElement("a");
				button.className = "btn btn-primary text-center";
				button.appendChild(document.createTextNode(node.type));
				button.href = node.type + ".html?stepid=1&nodeid=" + node.id;
				button.role = "button";
				divButton.appendChild(button);
				divRow.appendChild(divButton);
				allFlows.appendChild(divRow);

				divRow = document.createElement("div");
				divRow.className = "row";
				var divHr = document.createElement("div");
				divHr.className = "col text-center"
				divHr.appendChild(document.createElement("hr"));
				divRow.appendChild(divHr);
				allFlows.appendChild(divRow);
			}
		}
	}
}
