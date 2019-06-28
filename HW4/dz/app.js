'use strict';

const { Transform } = require('stream')
    , http          = require('http')
    , fs            = require('fs');

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
            let filename = request.url.substring(1, request.url.length)
                .split('.')[0] + '.json';

            let newFileStream = fs.createWriteStream(filename)
              , headerParser  = new HeaderParser();

            newFileStream.on('close', function(){
                response.writeHead(200);
                response.end(filename);
            });

            request.pipe(headerParser).pipe(newFileStream);
            break;
        default: 
            response.statusCode = 400;
            response.end();
    }
});

server.listen(port, () => {
    console.log('Сервер слушает порт: %d', port);
});


class HeaderParser extends Transform {
    constructor(options) {
        super(options);
        this._data = '';
    }

    _transform(chunk, encoding, next) {
        this._data += chunk.toString();
        next();
    }

    _flush(next) {
        let header = this._data.split('\n')[0]
          , json = {};

        if(header.includes('HTTP')) {
            let temp = header.split(' ');
            if(temp[0].includes('HTTP')) {
                json.protocol       = temp[0].trim();
                json.status_code    = parseInt(temp[1]);
                json.status_message = (temp[2] || '').trim();
            } else {
                json.method   = temp[0].trim();
                json.uri      = temp[1].trim();
                json.protocol = temp[2].trim();
            }
        }

        this.push(JSON.stringify(json));
        next();
    }
}