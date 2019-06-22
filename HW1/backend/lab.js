'use strict';

const http = require('http')
    , fs   = require('fs')
    , path = require('path')
    , base = './frontend';

const mimeType = {
    '.html': 'text/html',
    '.css': 'text/css',
    '.js' : 'application/javascript',
    '.png': 'image/png'
}

function startServer(port) {
    const server = http.createServer((request, response) => {
        let file = request.url;

        console.log('Запрошенный файл: %s', file);
        if(file === '/favicon.ico')
            return response.end();

        if(file === '/')
            file += 'index.html';

        let ext = path.extname(file);
        response.setHeader('Content-type', mimeType[ext] || 'text/plain' );

        if(file === '/lab3.html')
            return compose().then((data) => {
                response.end(data);
            }).catch(() => {
                render404().then((data) => response.end(data));
            });

        render(file).then((data) => {
            response.end(data, 'utf8');
        }).catch(() => {
            render404().then((data) => response.end(data));
        });
    });

    server.listen(port, () => {
        console.log('Сервер слушает порт: %d', port);
    });
}

function render(file, enc = 'utf8') {
    return new Promise((resolve, reject) => {
        fs.readFile(base + file, enc, (err, data) => {
            if (err) 
                reject(err); 
            else
                resolve(data);
        });
    });
};

// function render(file) {
//     if(!fs.existsSync(base + file))
//         return null;
//     return fs.readFileSync(base + file);
// }

function render404() {
    return render('/404.html');
}

async function compose() {
    let result    = ''
      , files     = ['header.html', 'body.html', 'footer.html']
      , pageStart = '<!DOCTYPE html><html><head><meta charset="UTF-8"/><link rel="stylesheet" href="css/style.css"></head><body><div class="main-content">'
      , pageEnd   = '</div></body></html>';

    result += pageStart;
    for(let i = 0; i < files.length; i++) {
        let data = await render('/' + files[i]);
        if(data !== null)
            result += data;
    }
    result += pageEnd;

    return result;
}

module.exports = startServer;