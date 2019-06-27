'use strict';

const http = require('http')
    , fs   = require('fs');

let port = 31337;
const server = http.createServer((request, response) => {
    switch(request.method) {
        case 'GET': break;
        case 'POST': break;
        default: 
            request.setHeader(400);
            request.end();
    }
});

server.listen(port, () => {
    console.log('Сервер слушает порт: %d', port);
});