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
select "concept_id",
 "encounter_type/s",
"concept_name_first",
"concept_names_all",
"datatype",
"class",
"value_boolean",
"value_coded",
"value_coded_name_first",
"value_coded_names_all",
"value_drug",
"value_datetime",
"value_numeric",
"value_modifier",
"value_text",
"value_complex" 
union 
select o.concept_id,
    group_concat(distinct( (select distinct(et.name) from encounter_type et,
    encounter e where et.encounter_type_id = e.encounter_type and e.encounter_id = o.encounter_id))),
    MIN(cn.name),
    group_concat(distinct cn.name),
    cdt.name,
    ccl.name,
    group_concat(distinct o.value_boolean),
    group_concat(distinct o.value_coded),
    group_concat(distinct(select MIN(cn2.name) from concept_name cn2 where cn2.concept_id = o.value_coded)),
    group_concat(distinct(select group_concat(distinct cn2.name SEPARATOR '|') from concept_name cn2 where cn2.concept_id = o.value_coded)),
    group_concat(distinct o.value_drug),
    group_concat(distinct o.value_datetime),
    group_concat(distinct o.value_numeric),
    group_concat(distinct o.value_modifier),
    group_concat(distinct o.value_text),
    group_concat(distinct o.value_complex)  
 from obs o, concept_name cn, concept c, concept_datatype cdt, concept_class ccl, encounter e
 where e.encounter_id=o.encounter_id and o.concept_id = cn.concept_id and c.concept_id=o.concept_id and cdt.concept_datatype_id = c.datatype_id and ccl.concept_class_id = c.class_id 
-- use if grouping by encounter type
 group by e.encounter_type, o.concept_id
-- use of group_concat all encounter_types
-- group by o.concept_id
*/

var fs = require('fs');

// print command line parameters
// process.argv.forEach(function (param, position) {
// 	console.log(position + ': ' + param);
// });

var data = fs.readFileSync('openmrs_kch-concepts.tsv')
    .toString() // convert Buffer to string
    .split('\n') // split string to lines
    .map(e => e.trim()) // remove white spaces for each line
    .map(e => e.split("\t").map(e => e.trim())); // split each line to array

// console.log(data);
// console.log(JSON.stringify(data, '', 2)); // as json

var last_encounter_type = "";
var flow_string = "";
var flows_string="[";
var element_position = 0;

for (const line of data){
	var header;
	var current_encounter_type = line[1];
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
	flow_string += ", " + JSON.stringify(createNodeInstance(line, header["id"], element_position), '', 2);
	
	element_position++;
	last_encounter_type = current_encounter_type;
    // console.log(line[0]);
}
flows_string+="]";

console.log(flows_string);

function createNodeInstance(line, flow_id, element_position) {
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
	
	if (line[4] === 'Numeric') {
		datatype = "decimal";
	} else if (line[4] === 'Text') {
		datatype = "string";
	} else if (line[4] === 'Date') {
		datatype = "date";
	} else if (line[4] === 'Boolean') {
		datatype = "boolean";
	} else if (line[4] === 'Datetime') {
		datatype = "dateTime";
	} else if (line[4] === 'Coded') {
		type="visit-select";
	} else if (line[4] === 'N/A') {
		datatype = "string"; // for now, most likley often a coded value
	}
		
	var instance = {};
	instance["id"]=(1 + Math.random () * 4294967295) .toString (16);
	instance["type"]= type;
	instance["z"]=flow_id; // id of flow
	instance["name"]=line[2];
	instance["label"]=line[2]; // currently same as name
	instance["key"]=""; // unused
	instance["datatype"]=datatype; // make this based on concept datatype
	instance["x"]="200";
	instance["y"]=element_position * 40 + 100; // position everything underneath each each with 40 px distance
	instance["wires"]=[[]]; // no wires / links for now
	
	if (type==="visit-select") {
		delete instance.datatype;
		instance["behavior"]="single";
		var options = [];
		// line[8] contains all options for multiple selects
		var coded_values = line[8].split(",").map(e => e.trim()); 
		for (const coded_value of coded_values) {
			options.push({"sid": coded_value});
		}
		// console.log(options);
		instance["devices"]=options;
        // "devices": [
        //     {
        //         "sid": "entry1"
        //     },
        //     {
        //         "sid": "entry2"
        //     }
        // ],
		
	}
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