'use strict';

const fs = require('fs');

fs.readFile(process.argv[2], (error, data) => {
    let lines = [];

    if(error) return console.log(error);
    lines = data.toString().split('\n');
    console.log(lines.length - 1);
});