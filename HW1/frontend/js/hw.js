'use strict';

// раз уж пошла такая пьянка, то короткий вариант...
// хотя я предпочитаю так не делать :)
function hw1() {
    const print = (p = 0) => console.log('Функция выполнилась с задержкой: %d сек.', p)
        , pause = (fn, seconds) => (() => setTimeout(() => fn(seconds), seconds * 1000));

    let timeout = 5
      , paused  = pause(print, timeout);
    console.log('Запуск функции "print" через %d сек.', timeout);
    paused();
}

function hw2() {
    const enumFn = () => [1, 2, 3, 4, 5, 6, 7, 8]
        , langFn = () => ['JS', 'Python', 'C++']
        , oFn    = () => { return { ...['a', 'b', 'c'] } };

    function decoratorFn(fn, ...args) {
        let a = fn();
        // млин, клёвая идея!!! как я забыл про reduce...
        // Виталий Владимирович, спасибо...
        // Евгений Александрович, кто короче? ;)
        return () => Array.isArray(a) ? args.reduce((o, v, i) => (o[v] = a[i], o), {}) : a;
        // return function() {
        //     let a      = fn()
        //       , result = {};

        //     if(!Array.isArray(a))
        //         return a;

        //     for(let i = 0; i < args.length; i++) 
        //         result[args[i]] = a[i];

        //     return result;
        // }
    }

    let e = decoratorFn(enumFn, 'one', 'two', 'free', 'four', 'five')
      , l = decoratorFn(langFn, 'js', 'p', 'c')
      , o = decoratorFn(oFn);

    console.log('%o', e());
    console.log('%o', l());
    console.log('%o', o());
}

document.addEventListener('DOMContentLoaded', function() {
    console.log('Задача №1'), hw1();
    console.log('Задача №2'), hw2();
});
