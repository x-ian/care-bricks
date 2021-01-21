# workflow-poc-emr

### Installation

Upfront: Depending on distro, the default packages for Node-RED and NodeJS can be outdated. I suggest to first try to go with the defaults, but it might be necessary to switch to a more recent version (but I don't even know why version are minimally required).

#### Set up runtime environment

1. Install NodeJS (a recent version, maybe 12 or higher) and NPM (might come with Node)
1. ```npm install -g nodemon```
1. ```git clone https://github.com/x-ian/workflow-poc-emr```
1. ```cd workflow-poc-emr```
1. ```npm install```
1. Start runtime environment with ```node server.js``` or ```nodemon server-js —ignore ‘scripts’```. Per default the data repository dir is under ../repository (can be changed in config.js). Open http://localhost:3001

#### Set up design environment

1. Install Node-RED (at least 0.18)
1. Start Node-RED with ```node-red -u <path work workflow-poc-emr repo>/node-red-userdir```
1. Open http://localhost:1880
1. Now the ugly part. <agically make Node-RED project feature with GitHub connection work
    * create / add new SSH key
    * send me the key so that I can add this as repository-specific ‘deploy key’
    * somehow get Node-RED to properly checkout the project (here it often didn’t work)
1. Once the project is properly set up, find the Careflow config node (currently on the Malaria flow) and add a new config. It is basically the fully qualified path to the file with the flow definition for the runtime environment. Every Node-RED deploy copies the flow definition into this file.

### Dev interface for  bricks

brick interface

* node id or flow id via URL get parameter
* node type and other properties via jsonFlow 
* HTML with id page-<filename>
* central event handler for page load (hook onLoad<brickname>) and hook for next button (hook hookNext<brickname>) ; optionally any interaction/button pressed

access in bricks to:

* currentPatient
* currentEncounter
* optional / on-demand: pastEncounters

### Stuff

#### Webcam for photos

https://www.npmjs.com/package/webcam-easy

Needs to be added as JS lib for take-photo.html
```
<script type="text/javascript" src="https://unpkg.com/webcam-easy/dist/webcam-easy.min.js"></script>
```

#### Chart.js on summary Nodes

Needs to be added as JS lib for summary-interactive.html
```
    <script src="assets/client-js/Chart.min.js"></script>
    <script src="assets/client-js/Chart.utils.js"></script>
```

Needs to go into the description of a summary node.
```
<h1>Viral Load</h1>
<div style="height: 400px; width: 800px">
<canvas id="myChart" width="800" height="400"></canvas>
<script>
var ctx = document.getElementById('myChart').getContext('2d');
var myChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: ['July', 'August', 'September', 'October', 'November', 'December'],
        datasets: [{
            label: 'Viral Load',
            data: [12345, 25001, 30000, 22394, 17934, 9878],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
        }]
    },
    options: {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        }
    }
});
</script>
</div>
```

### Install

#### Node-red / design environment

1. Install NodeRed (avoid registering as a daemon / service)
1. clone GitHub repo workflow-poc-emr
1. Start NodeRed with ```node-red --userDir workflow-poc-emr/node-red-userdir node-red-userdir/example-flows.json```
1. Open http://localhost:1880
1. Find (or add) one (and really only just one for all flows) node 'config runtime' and set flowpath to the absolute filename of the JSON flow file as used by the runtime environment (realpath of workflow-poc-emr/resources/node-red-flows.json). This file will be updated with every NodeRed deploy and therefore update the runtime env with the most recent flow definition.
   
#### Runtime environment

1. Run ```workflow-poc/emr/docs/bootstrap-studio-export-script.sh bootstrap-studio-export``` (or manually invoke commands from there)
1. Configure/run web server with rootdir on workflow-poc-emr/bootstrap-studio-export, e.g. with ```cd workflow-poc-emr/bootstrap-studio-export; python3 -m http.server```

### Node-RED Custom Nodes

* https://nodered.org/docs/creating-nodes/
* http://noderedguide.com/

#### Careflow Node-rED startup

node-red -u /Users/xian/projects/data-first-emr/workflow-poc-emr/node-red-userdir

#### Dynamic properties / lists

* in switch and change(?) node
* https://nodered.org/docs/api/ui/editableList/
* https://groups.google.com/forum/#!topic/node-red/SZLsfsBuuBs
* https://discourse.nodered.org/t/how-to-make-custom-ui-widgets/15340/8

#### Projects

Switch from master to another branch better done once on command line via git checkout <branch>. Otherwise NR always (?) tries to merge to branch with currently active master.
	
System-generated key file with encryption file (if left on default) is in config.json and config.json.backup. Most likely better not handing these around.

Project management from NR is using github project workflow-poc-emr-nodered. The whole node-red-userdir is excluded from main workflow-poc-emr via .gitignore.

### Persistence

* PostgreSQL with postgrest (http://postgrest.org/en/v6.0/)
* lowdb and multiple instances (https://github.com/typicode/lowdb, https://github.com/typicode/lowdb/issues/296)
* self-made with something ala https://github.com/typicode/json-server

### Nodejs

memory limits: https://medium.com/@ashleydavis75/node-js-memory-limitations-30d3fe2664c0

#### Async stuff

Use async / await these days.
* https://blog.risingstack.com/node-js-async-best-practices-avoiding-callback-hell-node-js-at-scale/
* https://stackabuse.com/avoiding-callback-hell-in-node-js/

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

### Node.JS on Android

* https://stackoverflow.com/questions/36632649/running-node-js-on-android
* example of enhanced/fixed version https://github.com/inu1255/node-on-android/commit/3c48931bf303f2e9dd7f6011fe7684a711b6041f, https://github.com/simoarpe/node-on-android/commit/d198350f8346b94f9562e6ee540441b50fdc49d8, https://techgaun.github.io/active-forks/index.html#node-on-mobile/node-on-android

Termux

* https://www.freecodecamp.org/news/building-a-node-js-application-on-android-part-1-termux-vim-and-node-js-dfa90c28958f/
* https://wiki.termux.com/wiki/Remote_Access

Node on Android

* https://github.com/Manoj-Roy/node-on-android

```
PATH=$PATH:/Users/xian/Library/Android/sdk//platform-tools/adb
cd ~/projects/data-first-emr/nodejs-mobile/node-on-android/careflow
npm run build ; adb install -r build/app.apk 
adb shell am start -n com.mafintosh.nodeonandroid/com.mafintosh.nodeonandroid.MainActivity
```

* Logging to file (for easier access via web?): https://stackoverflow.com/questions/8393636/node-log-in-a-file-instead-of-the-console


J2V8

* https://github.com/eclipsesource/J2V8

Dory

* https://play.google.com/store/apps/details?id=io.tempage.dorynode&hl=en

### Service worker for Offline first

* https://serviceworke.rs/
* https://developers.google.com/web/fundamentals/primers/service-workers
* https://medium.com/@bhargavshah2011/overview-of-web-worker-service-worker-56082720dcd0

### GPS coordinations / OpenStreetMaps 

http://www.openstreetmap.org/?mlat=49.8719803&mlon=8.3350004&zoom=12


```
<iframe width="425" height="350" frameborder="0" scrolling="no" marginheight="0" marginwidth="0" src="https://www.openstreetmap.org/export/embed.html?bbox=8.12370300292969%2C49.80431392204895%2C8.460159301757814%2C49.93951039093599&amp;layer=mapnik" style="border: 1px solid black"></iframe><br/><small><a href="https://www.openstreetmap.org/#map=12/49.8720/8.2919">View Larger Map</a></small>
```

https://render.openstreetmap.org/cgi-bin/export?bbox=8.190994262695314,49.831353215826354,8.39286804199219,49.91247109715859&scale=89218&format=png

0.2113405

### Artillery for load testing

```
artillery run -o artillery-test-report.json artillery-test.yml ; artillery report -o artillery-test-report.html artillery-test-report.json
```

### NVM for NodeJS switching

```
nvm use node
node server.js
```

### Nodemon for dev env

```
nodemon server.js --ignore 'scripts'
```

### server-less

cf multicast

multicast all current changes

if server detects by latest multicast that it is out of sync, deliberately request all changes since last known sync

server needs to keep transaction counter

hash code of each unit/file


