'use strict';

function snakeToCamel(str) {
    return ('_' + str)
        .replace(/(?<=_)[a-z]{1}/g, (match) => match.toUpperCase())
        .replace(/_/g, '');
}

function camelToSnake(str) {
    return str.replace(/(?!^)(?=[A-Z])/g, '_')
        .toLowerCase();
}

console.log(snakeToCamel('camel_to_snake'));
console.log(camelToSnake('CamelCase'));