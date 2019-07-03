'use strict';

/*
https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Operators/Operator_Precedence
Приоритет операций
*/
const operators = {
    '+': { fn: (x, y) => x + y, p: 13 },
    '-': { fn: (x, y) => x - y, p: 13 },
    '*': { fn: (x, y) => x * y, p: 14 },
    '/': { fn: (x, y) => x / y, p: 14 },
    '_': { fn: (x, y) => x / y >> 0, p: 14 },
    '%': { fn: (x, y) => x % y, p: 14 },
    '^': { fn: (x, y) => Math.pow(x, y), p: 15 }
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

    return stack.pop().toString();
}

/*
https://ru.wikipedia.org/wiki/%D0%90%D0%BB%D0%B3%D0%BE%D1%80%D0%B8%D1%82%D0%BC_%D1%81%D0%BE%D1%80%D1%82%D0%B8%D1%80%D0%BE%D0%B2%D0%BE%D1%87%D0%BD%D0%BE%D0%B9_%D1%81%D1%82%D0%B0%D0%BD%D1%86%D0%B8%D0%B8
Shunting Yard algorithm
*/
function convert (infix) {
    let peek = (a) => a[a.length - 1];
    let stack = [];

    /* 
    заменить символ '//' - деление без остатка на '_', 
    т.к. регулярка деления по операциям работает не корректно
    */
    infix = infix.replace('//', '_'); 
    infix = infix.replace(/\s+/g, '');
    infix = infix.split(/([\+\-\*\_\/\^\(\)])/)

    return infix
        .reduce((output, token) => {
            if (parseFloat(token)) {
                output.push(token);
            }

            if (token in operators) {
                while (peek(stack) in operators && operators[token].p <= operators[peek(stack)].p)
                    output.push(stack.pop());
                stack.push(token);
            }

            if (token == '(') {
                stack.push(token);
            }

            if (token == ')') {
                while (peek(stack) != '(')
                    output.push(stack.pop());
                stack.pop();
            }

            return output;
        }, [])
        .concat(stack.reverse())
        .join(' ');
};

module.exports.calc    = calc;
module.exports.convert = convert;