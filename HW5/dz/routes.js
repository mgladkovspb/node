'use strict';

module.exports = function(app) {
    app.get('/', (req, res) => {
        app.render('/index.html').then((data) => {
            res.setHeader('Content-type', app.checkContentType('/index.html'));
            res.end(data, 'utf8');
        });
    });

    app.post('/task', (req, res) => {
        let data = '';
        req.on('data', (chunk) => {
            data += chunk;
        });

        req.on('end', () => {
            let result = '';
            if(data.includes('method=send_lead')) {
                res.writeHead(200, { 'Content-Type': 'application/json' });
                result = send_lead(data);
            } else if(data.includes('method=get_api_key')) {
                result = get_api_key();
            } 

            res.end(result);
        });
    });
}

function send_lead(param) {
    let result = {}
      , args = param.split('&');

    args.reduce((o, v, i) => {
        let [key, val] = v.split('=');
        if(key !== 'method') {
            o[key] = decodeURI(val);
        }
        return o;
    }, result);

    return JSON.stringify(result);
}

function get_api_key() {
    return '986897875897';
}