'use strict';

const fs   = require('fs')
    , path = require('path');

module.exports = function(dir, ext, callback) {
    fs.readdir(dir, (error, data) => {
        let files = [];
        if(error) return callback(error);
        data.forEach((value) => {
            if(path.extname(value) === '.' + ext)
                files.push(value);
        });
        return callback(null, files);
    });
}
