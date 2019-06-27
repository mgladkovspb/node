'use strict';

const http = require('http')
    , fs   = require('fs');

let port = 31337
  , lang = undefined;

if(process.argv.length > 3)
    lang = process.argv[2];

if(process.env.MYLANG !== undefined)
    lang = process.env.MYLANG;

if(lang === undefined)
    return usage();

function usage() {
    console.log('Использование: node ./app.js [lang]');
    console.log('-- lang: en, ru');
    console.log('Или установить переменную окружения LANG.');
}

console.log(lang);
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