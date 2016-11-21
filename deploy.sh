#!/bin/bash

#ng build --target=production --environment=demo
ng build --environment=demo

rsync -azv ./dist/** root@51.255.201.174:/var/www/demo_zetapush/zetalk/
