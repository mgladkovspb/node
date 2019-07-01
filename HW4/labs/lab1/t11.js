'use strict';

let http = require('http')
    , fs = require('fs');

http.createServer((request, response) => {
    let rs = fs.createReadStream(process.argv[3]);
    rs.pipe(response);
}).listen(process.argv[2]);