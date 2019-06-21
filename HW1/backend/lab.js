'use strict';

const http = require('http')
    , fs   = require('fs')
    , path = require('path')
    , base = './frontend';

function startServer(port) {
    const server = http.createServer((request, response) => {
        let data = ''
          , file = request.url
          , ext  = path.extname(file);

        console.log('Запрошенный файл: %s, тип файла: %s', file, ext);
        switch(file) {
            case '/favicon.ico': response.end(); break;
            case '/lab3.html': data = compose(); break;
            case '/': file += 'index.html';
            default: data = render(file);
        }

        let mimeType = 'text/html';
        if(data === null) {
            data = render404();
            response.writeHead(404, {'Content-Type': mimeType});
        } else {
            switch(ext) {
                case '.css': mimeType = 'text/css'; break;
                case '.js': mimeType = 'application/javascript'; break;
                case '.png': mimeType = 'image/png'; break;
            }
            response.writeHead(200, {'Content-Type': mimeType});
        }

        response.end(data, 'utf8');
    });

    server.listen(port, () => {
        console.log('Сервер слушает порт: %d', port);
    });
}

function render(file) {
    if(!fs.existsSync(base + file))
        return null;
    return fs.readFileSync(base + file);
}

function render404() {
    return render('/404.html');
}

function compose() {
    let result    = ''
      , files     = ['header.html', 'body.html', 'footer.html']
      , pageStart = '<!DOCTYPE html><html><head><meta charset="UTF-8"/><link rel="stylesheet" href="css/style.css"></head><body><div class="main-content">'
      , pageEnd   = '</div></body></html>';

    result += pageStart;
      for(let i = 0; i < files.length; i++) {
        let data = render('/' + files[i]);
        if(data !== null)
            result += data;
    }
    result += pageEnd;

    return result;
}

module.exports = startServer;