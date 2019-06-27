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
            /*
            TODO: сформировать имя выходного файла
            */
            let newFileStream = fs.createWriteStream('')
              , headerParser  = new HeaderParser();

            newFileStream.on('close', function(){
                response.writeHead(200);
                response.end();
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


class HeaderParser extends stream.Transform {
    constructor() {
        super();
        this._data = '';
    }

    _transform(chunk, encoding, callback) {
        this.data += chunk.toString();
    }

    _flush(callback) {
        let json = '';
        /*
        TODO: сделать формирование json объекта
        */
        this.push(json);
        callback();
    }
}