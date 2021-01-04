#!/usr/bin/env node

var fs = require('fs');

var h = {};
var a = JSON.parse(fs.readFileSync('../docs/resources/UI_liberia_address_hierarchy_entries_9.json'));

for (const e of a){
	// console.log(e);
	if (h[e['1']] === undefined) {
		h[e['1']] = {};
	} 
	if (h[e['1']][e['2']] === undefined) {
		h[e['1']][e['2']] = {};
	} 
	if (h[e['1']][e['2']][e['3']] === undefined) {
		h[e['1']][e['2']][e['3']] = [];
	} 
	
	h[e['1']][e['2']][e['3']].push(e['4']);
	// h[e['1']][e['2']]e['3']
	// console.log(e['1']);
	// console.log(e['2']);
	// console.log(e['3']);
	// console.log(e['4']);
}

console.log(h);

console.log(JSON.stringify(h));

fs.writeFileSync('../docs/resources/address-liberia.json', JSON.stringify(h, null, 2));
