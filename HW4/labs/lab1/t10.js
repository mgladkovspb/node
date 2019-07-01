const net = require('net')
    , strftime = require('strftime')
    , ru       = strftime.localize(strftime.ru_RU);
let server = net.createServer(function (socket) {
    socket.end(ru('%F %R', new Date()) + '\n');
})
server.listen(process.argv[2]);