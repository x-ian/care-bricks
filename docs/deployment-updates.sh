#!/bin/bash

#/usr/bin/killall python
#sleep 10

#cd /home/neumann/workflow-poc-emr/bootstrap-studio-export
#/usr/bin/python -m SimpleHTTPServer &

cd ~
killall node-red
nohup node-red &

#cp /home/neumann/.node-red/flows_s17974030.onlinehome-server.info.json /home/neumann/.node-red/flows_s17974030.onlinehome-server.info.json-191128

cd /home/neumann/workflow-poc-emr/bootstrap-studio-export

#cp ../js/*.js assets/js/
rm -rf assets/js
ln -s /home/neumann/workflow-poc-emr/js/ assets/js

sed -i 's/http:\/\/localhost:8000\///g' *.html
sed -i 's/http:\/\/localhost:8000\///g' assets/js/pages-event-handlers.js 
sed -i 's/http:\/\/localhost:8000\///g' assets/js/local-storage.js
#ln -s /home/neumann/.node-red/flows_s17974030.onlinehome-server.info.json /home/neumann/workflow-poc-emr/bootstrap-studio-export/assets/js/node-red-flows.json
