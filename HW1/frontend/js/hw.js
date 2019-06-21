'use strict';

function hw1() {
    function print(p = 0) {
        console.log('Функция выполнилась с задержкой: %d сек.', p);
    }

    function pause(fn, seconds) {
        return function() {
            setTimeout(() => fn(seconds), seconds * 1000);
        }
    }

    let timeout = 5
      , paused  = pause(print, timeout);
    console.log('Запуск функции "print" через %d сек.', timeout);
    paused();
}

function hw2() {
    const enumFn = () => [1, 2, 3, 4, 5, 6, 7, 8]
        , langFn = () => ['JS', 'Python', 'C++'];

    function decoratorFn(fn, ...args) {
        return function() {
            let a      = fn()
              , result = {};

            if(!Array.isArray(a))
                return a;

            for(let i = 0; i < args.length; i++) 
                result[args[i]] = a[i];

            return result;
        }
    }

    let e = decoratorFn(enumFn, 'one', 'two', 'free', 'four', 'five')
      , l = decoratorFn(langFn, 'js', 'p', 'c');

    console.log('%o', e());
    console.log('%o', l());
}

document.addEventListener('DOMContentLoaded', function() {
    console.log('Задача №1'), hw1();
    console.log('Задача №2'), hw2();
});
