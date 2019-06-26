'use strict';

let express = require('./nedo-express')
  , path    = require('path')
  , app     = express();

app.static('/js',     path.join(__dirname, './public/js'));
app.static('/css',    path.join(__dirname, './public/css'));
app.static('/images', path.join(__dirname, './public/img'));

require('./routes')(app);

let port = 31337;
app.listen(port, () => {
    console.log('Сервер слушает порт: %d', port);
});
