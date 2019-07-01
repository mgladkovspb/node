'use strict';

let http = require('http');

http.createServer((request, response) => {
    let result, date;

    if(request.method !== 'GET')
        return response.end();

    if(request.url === '/favicon.ico')
        return response.end();

    let [ url, param ] = request.url.split('?');
    date = new Date(param.replace('iso=', ''));

    switch(url.trim()) {
        case '/api/parsetime': 
            result = {
                hour: date.getHours(),
                minute: date.getMinutes(),
                second: date.getSeconds()
            };
            break;
        case '/api/unixtime': 
            result = { unixtime: date.getTime() }
            break;
        default:
            response.end();
    }

    response.writeHead(200, { 'Content-Type': 'application/json' });
    response.end(JSON.stringify(result));
}).listen(process.argv[2]);