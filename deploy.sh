#!/bin/bash

ng build --env=demo

rsync -azv ./dist/** root@51.255.201.174:/var/www/demo_zetapush/zetalk/
