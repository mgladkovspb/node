'use strict';

const fs = require('fs');

fs.readdir(process.argv[2], (error, data) => {
    if(error) return console.log(error);
    data.forEach((value) => {
        if(value.includes('.' + process.argv[3]))
            console.log(value);
    });
});