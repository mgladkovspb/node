'use strict';

const config = require('./config.json')
    , fs     = require('fs');

process.on('message', (m) => {
    let obj  = JSON.parse(m)
      , data = `Date: ${new Date().toJSON()}, method: ${obj.method}, url: ${obj.url}\r\n`;

    fs.writeFile(config.logFile, data, { encoding:'utf8', flag:'a'}, (error) => {
        if(error){
            console.log('Child: Can`t save log');
        } else {
            console.log('Child: Log save');
        }
    });
});