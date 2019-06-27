'use strict';

const http  = require('http')
    , cp    = require('child_process')
    , child = cp.fork('./child.js');

let port = 31337;

const server = http.createServer((request, response) => {
    child.send(JSON.stringify(request, getCircularReplacer()));
    response.end();
});

server.listen(port, () => {
    console.log('Сервер слушает порт: %d', port);
});

//https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Errors/Cyclic_object_value#Examples
const getCircularReplacer = () => {
    const seen = new WeakSet();
    return (key, value) => {
        if (typeof value === "object" && value !== null) {
            if (seen.has(value)) {
                return;
            }
            seen.add(value);
        }
        return value;
    };
};