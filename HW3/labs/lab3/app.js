'use strict';

const http  = require('http')
    , cp    = require('child_process')
    , url   = require('url')
    , child = cp.fork('./child.js');

let childReady = false; // false – дочерний процесс не готов к использованию

function childSaidReady(status){
    if (status === 'ready') {
        childReady = true;
        child.off('message', childSaidReady); //Удаляет ранее прикреплённого слушателя
        console.log('Server ready');
    }
}

child.on('message', childSaidReady);

http.createServer((request, response)=>{
    let _get = url.parse(request.url, true).query;

    console.log('Parametrs of request: ' + JSON.stringify(_get));

    if(!(_get.num1 && _get.num2)){
        console.log('Bad Request');
        response.statusCode = 400;
        return response.end();
    }

    let expression = `${_get.num1}+${_get.num2}=`;
    function responseFromChild(data){
        /*
        Ответ:
        data.expression === expression - а-ля синхронизация потоков...
        -- Локальное объявление функции позволит ей в замыкании запомнить, что было в переменной response и expression на момент объявления,
        -- а значит запомнить кому именно из клиентов нашего сервера требуется отправить ответ.
        */
        if (data.expression === expression) {
            response.writeHead(200, {'Content-Type':'text/html'});
            response.write(`<h1>${data.result}</h1>`);
            response.end();
            child.off('message', responseFromChild);
        }
    }

    child.on('message', responseFromChild);
    child.send({ expression });
}).listen(31337, ()=>{
    console.log('Server run in 31337 port!');
});