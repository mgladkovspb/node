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