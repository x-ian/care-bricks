# workflow-poc-emr

### Install

#### Node-red / design environment

1. Install NodeRed
1. clone GitHub repo workflow-poc-emr
1. Run Nodered once with node-red and quit
1. Link (or copy) ~/.node-red/nodes from workflow-poc-emr/node-red-nodes
1. Link (or copy) ~/.node-red/settings from workflow-poc-emr/node-red-nodes/node-red_settings.js
1. Link (or copy) ~/.node-red/flows_HOSTNAME.json from workflow-poc-emr/js/node-red-flows.json
1. Start node-red
   
#### Runtime environment

1. Configure/run web server with rootdir on workflow-poc-emr/bootstrap-studio-export

   (note that 'python3 -m http.server' had sometimes high delays between some calls; version problem?)

1. Patch HTML and js sources to match web server environment per per workflow-poc-emr/docs/deployment-updates.sh

### Runtime env

* python3 -m http.server

### Node-RED Custom Nodes

* https://nodered.org/docs/creating-nodes/
* http://noderedguide.com/

#### Dynamic properties / lists

* in switch and change(?) node
* https://nodered.org/docs/api/ui/editableList/
* https://groups.google.com/forum/#!topic/node-red/SZLsfsBuuBs
* https://discourse.nodered.org/t/how-to-make-custom-ui-widgets/15340/8

### Persistence

* PostgreSQL with postgrest (http://postgrest.org/en/v6.0/)
* lowdb and multiple instances (https://github.com/typicode/lowdb, https://github.com/typicode/lowdb/issues/296)
* self-made with something ala https://github.com/typicode/json-server

### Nodejs

memory limits: https://medium.com/@ashleydavis75/node-js-memory-limitations-30d3fe2664c0

### REST API

patients/1234/
	1234-demographics.json
	1234-visits.json

create, update, get demographics 

get /patients ?patients_filter
get /patient/{pid}
post /patient
put /patient/{pid}

?patients_filter
names
ids
encounter_type
encounter_field
encounter_value

get /encounters ?filter
get /encounter/{pid} ?filter
post /encounter
put /encounter/{eid}

?encounter_filter

findbynameorid
find scheduled patients
find checked-in patients


### JSON query languages

* jq - https://stedolan.github.io/jq/, https://jq.alhur.es/jiq/
* http://jmespath.org/
* http://jsoniq.org/

### JSON Merging

* JSON.stringify can pretty print to some degree. either everything in one line or each value on its own (good for demographics). multiple visits might be easiest in one-line-per-visit, but requires post-stringify introduction of newlines at the right places. (https://stackoverflow.com/questions/3515523/javascript-how-to-generate-formatted-easy-to-read-json-straight-from-an-object, https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify#Parameters)
* as visits are never deleted (only marked as voided) using diff with a patch file should be able detect (and with manually parsing of the output merge) concurrent visits. But without further checks it would also duplicate historical visits, which have been modified at the remote site.
* diff3 is a 3-way-merge with a common ancestor, but  doesn't work on a by-line basis
* comm is line by line, but requires lexically sorted files. can then show lines which are only present in one or the other. (https://stackoverflow.com/questions/4544709/compare-two-files-line-by-line-and-generate-the-difference-in-another-file)
* to be assessed: will it be easier to keep each visit in its own dedicated JSON file? (might not scale well in file systems)
* to be assessed: maybe explicit line numbering also helps? (https://unix.stackexchange.com/questions/136380/compare-two-files-strictly-line-by-line-without-insertions-or-deletions)
