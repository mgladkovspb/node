'use strict';

let http = require('http')
    , fs = require('fs')
    , path = require('path');

let mimeTypes = {
    '.html': 'text/html',
    '.mp4': 'video/mp4'
};

http.createServer((request, response) => {
    let pathname, extname, mimeType;
    console.log("Request: " + request.url);
    console.log("Request: " + request.headers.range);

    if (request.url === '/')
        pathname = 'site/index.html';
    else
        pathname = 'site' + request.url;

    extname = path.extname(pathname);
    mimeType = mimeTypes[extname];
    if (extname === '.mp4') {
        fs.readFile(pathname, (err, data) => {
            if (err) {
                console.log('Could not find or open file for reading\n');
                response.statusCode = 404;
                response.end();
            } else {
                console.log(`The file ${pathname} is read and sent to the client\n`);
                response.writeHead(200, {
                    'Content-Type': mimeType
                });
                response.end(data);
            }
        });
    } else {
        fs.readFile(pathname, 'utf8', (err, data) => {
            if (err) {
                console.log('Could not find or open file for reading\n');
                response.statusCode = 404;
                response.end();
            } else {
                console.log(`The file ${pathname} is read and sent to the client\n`);
                response.writeHead(200, {
                    'Content-Type': mimeType
                });
                response.end(data);
            }
        });
    }
}).listen(31337, () => {
    console.log("HTTP server works in 31337 port!\n");
});

/*
Запустите данный код и посмотрите весь ли видео контент получен браузером?
-- Да.

Нормально ли управляется видео контент в браузере?
-- Можно только запускать и приостанавливать... Перемотка не работает...

Посмотрите в консоль (терминал) сервера, что он выводил нам, когда клиент запрашивал видео? 
-- Request: /video/Introducing_Windows_95_Mobile.mp4
-- Request: bytes=0-
-- The file site/video/Introducing_Windows_95_Mobile.mp4 is read and sent to the client

Как вы думаете в чём недостаток такой отдачи видео контента?
-- нет возможности управлять воспроизведением (перемотка)
*/