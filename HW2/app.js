'use strict';

const fs = require('fs');

const rnd = (min, max) => {
    return Math.floor(min + Math.random() * (max + 1 - min));
}

function task1() {
    function* generateSymbol(type) {
        let o = {
            'numbers': '0123456789',
            'lowercase': 'abcdefghijklmnopqrstuvwxyz',
            'uppercase': 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
            'ascii': "!\"#$%&'()*+,-./:;<=>?@[\\]^_`{|}~"
        }
    
        while(true) {
            let str = o[type];
            type = yield str[rnd(0, str.length - 1)];
        }
    }

    function* generatePassword(len = 5) {
        let types  = ['numbers', 'lowercase', 'uppercase', 'ascii']
          , gs     = generateSymbol(types[rnd(0, 3)]);

        let counter = len;
        while(true) {
            let result  = '';

            for(let i = 0; i < counter; i++) {
                let type = types[rnd(0, 3)];
                result += gs.next(type).value;
            }

            counter = yield result;
        }
    }
    
    let gp = generatePassword(10);
    console.log(gp.next().value);
    console.log(gp.next(7).value);
    console.log(gp.next(20).value);
}

function task2() {
    function cb(error) {
        if (error) throw error;
        console.log('Файл записан.');
    }
    
    fs.readFile('data.txt', 'utf8', (error, data) => {
        if(error)
            throw error;

        let numbers = data.split(' ')
          , out1    = ''
          , out2    = '';
        for(let i = 0; i < numbers.length; i++) {
            let num = parseInt(numbers[i]);
            if(num % 2 === 0)
                out1 += num.toString() + ' ';
            out2 += (num ** 3).toString() + ' ';
        }

        fs.writeFile('out-1.txt', out1.trimRight(), 'utf8', cb);
        fs.writeFile('out-2.txt', out2.trimRight(), 'utf8', cb);

        console.log('Созданы или перезаписаны 2 файла. out-1.txt и out-2.txt');
    });
}

function task3() {
    class EventEmmiter {
        constructor() {
            this.events = {};
        }

        on(event, callback) {
            if(this.events[event] === undefined)
                this.events[event] = [];
            this.events[event].push(callback);
        }

        emit(event, param) {
            if(this.events[event] === undefined)
                return;
            this.events[event].forEach(callback => {
                callback(param);
            });
        }
    }

    let em = new EventEmmiter();
    em.on('eat', stringData => {
        console.log('Первым: Я кушаю ' + stringData + '.');
    });

    em.on('eat', stringData => {
        console.log('Вторым: Я кушаю ' + stringData + '.');
    });

    em.on('sleep', () => {
        console.log('После вкусного обеда, нужно спать ;)');
    });

    setTimeout(() => { em.emit('eat', 'бутерброд'); }, 3000);
    setTimeout(() => { em.emit('eat', 'мясо'); }, 2000);
    setTimeout(() => { em.emit('eat', 'яблочко'); }, 500);
    setTimeout(() => { em.emit('sleep'); }, 3500);
}

console.log('Задача №1. Результат работы:'), task1();
console.log('Задача №2. Результат работы:'), task2();
console.log('Задача №3. Результат работы:'), task3();