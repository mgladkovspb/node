'use strict';

const http = require('http')
    , fs   = require('fs');

if(process.argv.length < 3)
    return usage();

function usage() {
    console.log('Использование: node ./app.js [lang]');
    console.log('-- lang: en, ru');
}

let port = 31337
  , lang = process.argv[2] || 'ru';

const server = http.createServer((request, response) => {
    let file = lang + '.html';

    fs.readFile(file, 'utf8', (err, data) => {
        response.setHeader('Content-type', 'text/html' );
        if (err) {
            response.statusCode = 404;
            data = '';
        } 

        response.end(data, 'utf8');
    });
});

server.listen(port, () => {
    console.log('Сервер слушает порт: %d', port);
});