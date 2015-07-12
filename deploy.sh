#!/bin/sh

# Temporary deploy script until grunt or something is set up.

/usr/bin/rsync -r ./server.js             rsync://node@bluewren/seeddb
/usr/bin/rsync -r ./package.json          rsync://node@bluewren/seeddb
/usr/bin/rsync -r ./db/CreateDB.sql       rsync://node@bluewren/seeddb/db
/usr/bin/rsync -r ./frontend/bower.json   rsync://node@bluewren/seeddb/frontend
/usr/bin/rsync -r ./frontend/index.html   rsync://node@bluewren/seeddb/frontend
/usr/bin/rsync -r ./frontend/css          rsync://node@bluewren/seeddb/frontend/
/usr/bin/rsync -r ./frontend/js           rsync://node@bluewren/seeddb/frontend/
/usr/bin/rsync -r ./frontend/templates    rsync://node@bluewren/seeddb/frontend/
/usr/bin/rsync -r ./frontend/directives   rsync://node@bluewren/seeddb/frontend/
/usr/bin/rsync -r ./frontend/model        rsync://node@bluewren/seeddb/frontend/
/usr/bin/rsync -r ./frontend/providers    rsync://node@bluewren/seeddb/frontend/
