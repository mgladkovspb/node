'use strict';

const fs = require('fs');

let fdata = fs.readFileSync(process.argv[2])
  , data  = fdata.toString().split('\n');

console.log(data.length - 1);
