#!/bin/sh
command -v traceur >/dev/null 2>&1 || { echo >&2 "You have to install the traceur compiler first.\nTry 'sudo npm i traceur'"; exit 1; }
traceur --experimental src/index.js && traceur --experimental --modules commonjs --outputLanguage es5 --dir src lib
