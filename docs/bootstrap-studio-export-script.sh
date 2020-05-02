#!/bin/bash

# $1 is bootstrap export dir

cd $1
sed -i '' 's/http:\/\/localhost:8000\///g' *.html

cd $1/assets

rm client-js
ln -s ../../client-js/ client-js
rm resources
ln -s ../../resources/ resources

