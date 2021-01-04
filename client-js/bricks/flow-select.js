function onLoadFlowSelect() {
	var flows = allFlows2(jsonFlow);

	for (const flow of flows) {
		// todo, dynamic element creation better done via jquery
		var allFlows = document.getElementById('all-flows');
		var divRow = document.createElement("div");
		divRow.className = "row";
		var divButton = document.createElement("div");
		divButton.className = "col text-center"
		var button = document.createElement("a");
		button.className = "btn btn-primary text-center";
		button.appendChild(document.createTextNode(flow.label));
		button.href = "flow-start-nodes.html?flowid=" + flow.id;
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
	
	updateCurrentPatient({});
	updateCurrentEncounter({});
}
