# care-bricks

### Installation

Upfront: Depending on distro, the default packages for Node-RED and NodeJS can be outdated. I suggest to first try to go with the defaults, but it might be necessary to switch to a more recent version (but I don't even know which version is minimally required).

#### Set up runtime environment

1. Install NodeJS (a recent version, maybe 12 or higher) and NPM (might come with Node)
1. ```npm install -g nodemon```
1. ```git clone https://github.com/x-ian/care-bricks```
1. ```cd care-bricks```
1. ```cd bootstrap-studio-export/assets; ln -s ../../client-js/ .; ln -s ../../resources/ .; cd -```
1. ```npm install```
1. Start runtime environment with ```node server.js``` or ```nodemon server-js —ignore ‘scripts’```. Per default the data repository dir is under ../repository (can be changed in config.js). Open http://localhost:3001

#### Set up design environment

1. Install Node-RED (at least 0.18)
1. Start Node-RED with ```node-red -u <path work care-bricks repo>/node-red-userdir```
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


### Node-RED Custom Nodes

* https://nodered.org/docs/creating-nodes/
* http://noderedguide.com/

#### Dynamic properties / lists

* in switch and change(?) node
* https://nodered.org/docs/api/ui/editableList/
* https://groups.google.com/forum/#!topic/node-red/SZLsfsBuuBs
* https://discourse.nodered.org/t/how-to-make-custom-ui-widgets/15340/8

#### Projects

Switch from master to another branch better done once on command line via git checkout <branch>. Otherwise NR always (?) tries to merge to branch with currently active master.
	
System-generated key file with encryption file (if left on default) is in config.json and config.json.backup. Most likely better not handing these around.

Project management from NR is using github project care-bricks-nodered. The whole node-red-userdir is excluded from main care-bricks via .gitignore.

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
