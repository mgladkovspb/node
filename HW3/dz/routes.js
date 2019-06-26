'use strict';

const liburl = require('url');

module.exports = function(app) {
    app.get('/', (req, res) => {
        app.render('/index.html').then((data) => {
            res.setHeader('Content-type', app.checkContentType('/index.html'));
            res.end(data, 'utf8');
        });
    });

    app.get('/users', (req, res) => {
        let users = '/js/users.json';
        app.render(users).then((data) => {
            res.setHeader('Content-type', app.checkContentType(users));
            res.end(data, 'utf8');
        });
    });

    app.get('/ajax', (req, res) => {
        let page = '/ajax.html';
        app.render(page).then((data) => {
            res.setHeader('Content-type', app.checkContentType(page));
            res.end(data, 'utf8');
        });
    });

    app.get('/products', (req, res) => {
        let products = productsGenerator(12);
        res.setHeader('Content-type', 'application/json');
        res.end(JSON.stringify(products), 'utf8');
    });

    app.get('/camel_to_snake', (req, res) => {
        let params = liburl.parse(req.url, true);
        res.end(camelToSnake(params.query.name || ''))
    });

    app.get('/snake_to_camel', (req, res) => {
        let params = liburl.parse(req.url, true);
        res.end(snakeToCamel(params.query.name || ''));
    });
}

function snakeToCamel(str) {
    return ('_' + str)
        .replace(/(?<=_)[a-z]{1}/g, (match) => match.toUpperCase())
        .replace(/_/g, '');
}

function camelToSnake(str) {
    return str.replace(/(?!^)(?=[A-Z])/g, '_')
        .toLowerCase();
}

const rnd = (min, max) => {
    return Math.floor(min + Math.random() * (max + 1 - min));
}

function* generateSymbol() {
    let str = 'abcdefghijklmnopqrstuvwxyz';

    while(true) {
        yield str[rnd(0, str.length - 1)];
    }
}

function* generateString(len = 5) {
    let gs = generateSymbol();

    let counter = len;
    do {
        let result  = '';

        for(let i = 0; i < counter; i++) {
            result += gs.next().value;
        }

        counter = yield result;
    } while(true);
}

function productsGenerator(count) {
    let gs = generateString(10)
      , result = [];

    for(let i = 0; i < count; i++) {
        result.push({
            id: rnd(0, 999).toString().padStart(3),
            name: gs.next(rnd(5, 20)).value,
            cnt: rnd(0, 99).toString().padStart(2)
        });
    }

    return result;
}