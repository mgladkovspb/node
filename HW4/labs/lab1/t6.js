'use strict';

const rd = require('./t6m');
rd(process.argv[2], process.argv[3], (error, files) => {
    if(error) return console.log(error);
    files.forEach(element => {
        console.log(element);
    });
});