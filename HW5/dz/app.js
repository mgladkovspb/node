'use strict';

// let express = require('./nedo-express')
//   , path    = require('path')
//   , app     = express();

// require('./routes')(app);

// let port = 31337;
// app.listen(port, () => {
//     console.log('Сервер слушает порт: %d', port);
// });

const operators = {
    '+': (x, y) => x + y,
    '-': (x, y) => x - y,
    '*': (x, y) => x * y,
    '/': (x, y) => x / y,
    '//': (x, y) => x / y >> 0,
    '%': (x, y) => x % y,
    '^': (x, y) => x ^ y,
    '(': null,
    ')': null
};

function calc(expr) {
    let stack = [];

    expr.split(' ').forEach((token) => {
        if (token in operators) {
            let [y, x] = [stack.pop(), stack.pop()];
            stack.push(operators[token](x, y));
        } else {
            stack.push(parseFloat(token));
        }
    });

    return stack.pop();
}

/* 
TODO:
1. учесть скобки
2. Учесть приоритет операций
*/
function convert(expr) {
    let result  = ''
      , opstack = [];

    expr.split(' ').forEach((token) => {
        if (token in operators) {
            opstack.push(token);
        } else {
            result += token + ' ';
        }
    });

    return result + opstack.pop();
}

let expr = convert('2 + 3')
console.log(expr);
console.log(calc(expr));