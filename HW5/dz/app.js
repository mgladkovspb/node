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
    '+': { fn: (x, y) => x + y, p: 1},
    '-': { fn: (x, y) => x - y, p: 1},
    '*': { fn: (x, y) => x * y, p: 5},
    '/': { fn: (x, y) => x / y, p: 5},
    '//':{ fn: (x, y) => x / y >> 0, p: 5},
    '%': { fn: (x, y) => x % y, p: 5},
    '^': { fn: (x, y) => x ^ y, p: 5},
    '(': { fn: null, p: 10},
    ')': { fn: null, p: 10}
};

function calc(expr) {
    let stack = [];

    expr.split(' ').forEach((token) => {
        if (token in operators) {
            let [y, x] = [stack.pop(), stack.pop()];
            stack.push(operators[token].fn(x, y));
        } else {
            stack.push(parseFloat(token));
        }
    });

    return stack.pop();
}

/* 
TODO:
доделать алгоритм, не коррекно формирует вызодную строку
*/
function convert(expr) {
    let result = ''
      , stack  = [];

    expr.split(' ').forEach((token) => {
        if (token in operators) {
            switch(token) {
                case '(':
                    stack.push(token); 
                    break;
                case ')':
                    while(stack.length > 0) {
                        let last = stack.pop();
                        if(last !== '(')
                            result += last + ' ';
                    }
                    break;
                default:
                    let last = stack.pop();
                    if(last !== undefined && operators[last].p <= operators[token].p) {
                        result += last + ' ';
                        stack.push(token);
                    } else {
                        stack.push(token);
                    }
            }
        } else {
            result += token + ' ';
        }
    });

    return result + stack.pop();
}

let expr = convert('( 6 + 10 - 4 ) / ( 1 + 1 * 2 ) + 1');
console.log(expr);
console.log(calc(expr));