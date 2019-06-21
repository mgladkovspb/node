'use strict';

if(process.argv.length < 3)
    usage();

function usage() {
    console.log('Использование: node ./app.js [порт]');
    console.log('порт по умолчанию 31337');
}

const lab         = require('./backend/lab')
    , defaultPort = 31337;

let port = parseInt(process.argv[2]) || defaultPort;
if(port > 65535)
    port = defaultPort;

lab(port);