'use strict';

let express = require('./nedo-express')
  , path    = require('path')
  , app     = express();

// пока не доделал...
app.static('/js');
app.static('/css');
app.static('/img');

require('./routes')(app);

let port = 31337;
app.listen(port, () => {
    console.log('Сервер слушает порт: %d', port);
});
