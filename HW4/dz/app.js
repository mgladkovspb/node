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

    _parseProtocolHeader(str) {
        let result = {};

        let temp = str.split(' ');
        if(temp[0].includes('HTTP')) {
            result.protocol       = temp[0].trim();
            result.status_code    = parseInt(temp[1]);
            result.status_message = (temp[2] || '').trim();
        } else {
            result.method   = temp[0].trim();
            result.uri      = temp[1].trim();
            result.protocol = temp[2].trim();
        }

        return result;
    }

    _flush(next) {
        let headers = this._data.split('\n')
          , body = false
          , json = {
              http: {},
              headers: [],
              body: ''
          };

        for(let i = 0; i < headers.length; i++) {
            if(i === 0) {
                json.http = this._parseProtocolHeader(headers[i]);
                continue;
            }

            if(headers[i] === '\r') {
                body = true;
                continue;
            }

            if(!body) {
                let header = {}
                  , tmp    = headers[i].split(':');
                console.log(tmp);
                header[tmp[0].trim()] = tmp[1].trim();
                json.headers.push(header);
            } else {
                json.body = headers[i];
            }
        }

        this.push(JSON.stringify(json));
        next();
    }
}