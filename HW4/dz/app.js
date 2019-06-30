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
        let result      = {}
          , temp        //= str.split(' ')
          , requestLine = /^([A-Z_]+) (.+) [A-Z]+\/(\d)\.(\d)$/
          , statusLine  = /[0-9]{3}/g;

        if(str.match(requestLine) !== null) {
            temp = str.split(' ');
            result.method   = temp[0].trim();
            result.uri      = temp[1].trim();
            result.protocol = temp[2].trim();
        }

        if((temp = str.match(statusLine)) !== null) {
            result.status_code = parseInt(temp[0]);
            temp = str.split(result.status_code.toString());
            if(temp.length === 1)
                temp.unshift('HTTP/2');
            result.protocol       = temp[0].trim();
            result.status_message = (temp[1] || '').trim();
        }

        return result;
    }

    _flush(next) {
        let headers = this._data.split('\n')
          , json = {
              http: {},
              headers: {}
          };

        headers.forEach((line) => {
            let index = line.indexOf(':');

            if(index === -1 && json.http.isEmpty()) {
                json.http = this._parseProtocolHeader(line.trim());
            } else if(index !== -1) {
                let key   = line.slice(0, index).trim()
                  , value = line.slice(index + 1).trim();

                if (typeof(json.headers[key]) === 'undefined') {
                    json.headers[key] = value;
                }
            }
        });

        this.push(JSON.stringify(json));
        next();
    }
}

Object.prototype.isEmpty = function() {
    for(var key in this) {
        if(this.hasOwnProperty(key))
            return false;
    }
    return true;
}