'use strict';

const http   = require('http')
    , stream = require('stream')
    , fs     = require('fs');

let port = 31337;
const server = http.createServer((request, response) => {
    switch(request.method) {
        case 'GET': 
            if(request.url === '/' || request.url === '/index.html') {
                response.setHeader('Content-type', 'text/html');
                let newFileStream = fs.createReadStream('./index.html');
                newFileStream.pipe(response);
            } else {
                response.statusCode = 404;
                response.end('Ой!');
            }
            break;
        case 'POST': 
            
            break;
        default: 
            response.statusCode = 400;
            response.end();
    }
});

server.listen(port, () => {
    console.log('Сервер слушает порт: %d', port);
});


class HeaderParser extends stream.Transform {
    constructor() {
        super();
        this._data = '';
    }

    _transform(chunk, encoding, callback) {
        this.data += chunk.toString();
    }
}