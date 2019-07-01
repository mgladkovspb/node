'use strict';

let { Transform } = require('stream')
  , http          = require('http')
  , fs            = require('fs');

http.createServer((request, response) => {
    let toUpper = new ToUpper();
    if(request.method !== 'POST') {
        response.end();
    }
    request.pipe(toUpper).pipe(response);
}).listen(process.argv[2]);

class ToUpper extends Transform {
    constructor(options) {
        super(options);
        this._data = '';
    }

    _transform(chunk, encoding, next) {
        this.push(chunk.toString().toUpperCase());
        next();
    }
}