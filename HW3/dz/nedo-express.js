'use strict';

const http = require('http')
    , fs   = require('fs')
    , path = require('path')
    , base = './public';

function RouteDescription() {
    this.route   = '';
    this.method  = 'GET';
    this.handler = null;
}

class NedoExpress {
    constructor() {
        this._routes = [];
        this._static = [];

        this._httpServer = http.createServer();
    }

    listen(port = 8080, cb) {
        this._httpServer.on('request', this._onrequest.bind(this));
        this._httpServer.listen(port, cb);
    }

    static(f) {
        this._static.push(f);
    }

    get(url, cb) {
        let rd     = new RouteDescription();
        rd.route   = url;
        rd.method  = 'GET';
        rd.handler = cb;

        this._routes.push(rd);
    }

    post(url, cb) {
        let rd     = new RouteDescription();
        rd.route   = url;
        rd.method  = 'POST';
        rd.handler = cb;

        this._routes.push(rd);
    }

    render(file, enc = 'utf8') {
        return new Promise((resolve, reject) => {
            fs.readFile(base + file, enc, (err, data) => {
                if (err) 
                    reject(err); 
                else
                    resolve(data);
            });
        });
    };

    checkContentType(file) {
        let ext      = path.extname(file)
          , mimeType = {
            '.html': 'text/html',
            '.css' : 'text/css',
            '.js'  : 'application/javascript',
            '.png' : 'image/png',
            '.json': 'application/json'
        };
        console.log('ext: %s, mime: %s', ext, mimeType[ext]);
        return mimeType[ext] || 'text/plain';
    }

    render404() {
        return render('/404.html');
    }

    renderStatic(file) {
        return this.render(file);
    }

    _onrequest(request, response) {
        let url  = request.url.split('?')[0]
          , temp = this._routes.filter((current) => 
                current.method === request.method && current.route === url);
        console.log(url);
        if(temp.length > 0)
            temp.forEach((route) => route.handler(request, response));
        else 
            this.renderStatic(url).then((data) => {
                response.setHeader('Content-type', this.checkContentType(url));
                response.end(data, 'utf8');
            }).catch(() => {
                response.end('');
            });
    }
}

module.exports = () => {
    return new NedoExpress();
}