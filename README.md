# workflow-poc-emr

### Stuff

#### Webcam for photos

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
