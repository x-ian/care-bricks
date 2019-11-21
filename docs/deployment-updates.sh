#!/bin/bash

#/usr/bin/killall python
#sleep 10

#cd /home/neumann/workflow-poc-emr/bootstrap-studio-export
#/usr/bin/python -m SimpleHTTPServer &

cd ~
killall node-red
nohup node-red &
  
cd workflow-poc-emr/bootstrap-studio-export
sed -i 's/http:\/\/localhost:8000\//assets\/js\//g' *.html
sed -i 's/http:\/\/localhost:8000\//assets\/js\//g' assets/js/pages-event-handlers.js 
rm /home/neumann/workflow-poc-emr/bootstrap-studio-export/assets/js/node-red-flows.json
ln -s /home/neumann/.node-red/flows_s17974030.onlinehome-server.info.json /home/neumann/workflow-poc-emr/bootstrap-studio-export/assets/js/node-red-flows.json
