#!/usr/bin/env node

/* 
import a SQL CSV export from OpenMRS/BART installation and throw questions on one tab for each encounter type
requires manual work as follows:
1. mysql -u <<user>> -p<<passwd>> openmrs -B -e <<EOF >out.tsv
<<sql from below>>
EOF
2. ./concept-gobbler.sh
3. copy/paste (with some tweaks) output into NR 'import clipboard all flows' as new flow
4. make some tweaks as not 100% valid JSON
5. Import

*/
 
/*
select encounter_type.name, group_concat(distinct(concept_name.name)) 
from obs, concept, concept_name, encounter, encounter_type 
where obs.concept_id=concept.concept_id 
and concept_name.concept_id = concept.concept_id 
and obs.encounter_id = encounter.encounter_id 
and encounter_type = encounter_type.encounter_type_id
group by encounter_type.name;
*/

var fs = require('fs');

// print command line parameters
// process.argv.forEach(function (param, position) {
// 	console.log(position + ': ' + param);
// });

var data = fs.readFileSync('openmrs_apzu-concepts.tsv')
    .toString() // convert Buffer to string
    .split('\n') // split string to lines
    .map(e => e.trim()) // remove white spaces for each line
    .map(e => e.split("\t").map(e => e.trim())); // split each line to array

// console.log(data);
// console.log(JSON.stringify(data, '', 2)); // as json

var last_encounter_type = "";
var flow_string = "";
var flows_string="[";

for (const line of data){
	var element_position = 0;
	var header;
	var current_encounter_type = line[0];
	// console.log(current_encounter_type)
	flows_string+=flow_string
	flows_string += ",";
	if (last_encounter_type === current_encounter_type) {
		
	} else {
		// console.log("new ET " + current_encounter_type);
		// console.log(flow_string);
		element_position = 0;
		header = createFlowHeader(current_encounter_type);
		flow_string += ", "+ JSON.stringify(header, '', 2);
	}
	// console.log(line[1]);
	var obses = line[1].split(',');
	for (const obs of obses) {
		flow_string += ", " + JSON.stringify(createNodeInstanceApzu(obs, header["id"], element_position), '', 2);
		element_position++;
	}
	
	last_encounter_type = current_encounter_type;
    // console.log(line[0]);
}
flows_string+="]";

console.log(flows_string);

function createNodeInstanceApzu(obs, flow_id, element_position) {
    // {
    //     "id": "d9a8b53f.fac988",
    //     "type": "function",
    //     "z": "5254be09.c7b3e",
    //     "name": "",
    //     "func": "\nreturn msg;",
    //     "outputs": 1,
    //     "noerr": 0,
    //     "x": 160,
    //     "y": 160,
    //     "wires": [
    //         []
    //     ]
    // },
	
	var datatype = "";
	var type = "visit-question-primitive";
	
	var instance = {};
	instance["id"]=(1 + Math.random () * 4294967295) .toString (16);
	instance["type"]= type;
	instance["z"]=flow_id; // id of flow
	instance["name"]=obs;
	instance["label"]=obs; // currently same as name
	instance["key"]=""; // unused
	instance["datatype"]="string"; // make this based on concept datatype
	instance["x"]="200";
	instance["y"]=element_position * 40 + 100; // position everything underneath each each with 40 px distance
	instance["wires"]=[[]]; // no wires / links for now
	return instance;
}

function createFlowHeader(flow_name) {
    // {
    //     "id": "5254be09.c7b3e",
    //     "type": "tab",
    //     "label": "Flow 2",
    //     "disabled": false,
    //     "info": ""
    // },

	var header = {};
	header["id"]=(1 + Math.random () * 4294967295) .toString (16);
	header["type"]="tab";
	header["label"]=flow_name;
	header["disabled"]=false;
	header["info"]="";
	return header;
}
//
// [
//     {
//         "id": "d9a8b53f.fac988",
//         "type": "function",
//         "z": "5254be09.c7b3e",
//         "name": "",
//         "func": "\nreturn msg;",
//         "outputs": 1,
//         "noerr": 0,
//         "x": 160,
//         "y": 160,
//         "wires": [
//             []
//         ]
//     },
//     {
//         "id": "ccc01a8e.abe8c8",
//         "type": "function",
//         "z": "5254be09.c7b3e",
//         "name": "",
//         "func": "\nreturn msg;",
//         "outputs": 1,
//         "noerr": 0,
//         "x": 200,
//         "y": 220,
//         "wires": [
//             []
//         ]
//     }
// ]