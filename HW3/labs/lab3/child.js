'use strict';

const brain        = require('brain.js')
    , mathProblems = require('./mathData.json')
    , LSTM         = brain.recurrent.LSTM
    , net          = new LSTM();

console.log('Neural network training has begun');
net.train(mathProblems, { log: true, errorThresh: 0.03 });
console.log('Neural network ready');

// obj – переменная содержащая объект отправленный родителем
process.on('message', (obj) => { 
    /* 
    Свойство expression содержит строку, которую будем
    передавать на вход в нейронную сеть 
    */
    const input = obj.expression; 
    /* 
    метод run позволяет передать на вход в нейронную сеть
    строку и получить результат работы нейронной сети 
    */
    const output = net.run(input); 
    console.log('Child: ' + input + output);
    obj.result = input + output;
    /*
    методу send передается объект, который будет передан родительскому
    процессу 
    */
    process.send(obj); 
});

process.send('ready');