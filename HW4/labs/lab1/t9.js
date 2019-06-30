'use strict';

const http = require('http');

let result = [], count = 0;

function get(url, index) {
    let queryResult = '';
    http.get(url, (res) => {
        res.setEncoding('utf8');

        res.on('data', (data) => {
            queryResult += data;
        });

        res.on('end', () => {
            count++;
            result[index] = queryResult;
            if(count === 3)
                print();
        });
    });
}

function print() {
    result.forEach(element => {
        console.log(element);
    });
}

for(let i = 0; i < 3; i++)
    get(process.argv[2 + i], i);