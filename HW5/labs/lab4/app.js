let express = require('express');
let mustacheExpress = require('mustache-express');
let app = express();

// Регистрируем '.mustache' расширение как шаблоны Mustache Express
app.set('views', __dirname + '/views'); //указываем расположение папки с шаблонами
app.engine('mustache', mustacheExpress()); //регистрируем шаблонизатор Mustache в Express
app.set('view engine', 'mustache'); //указываем использовать Mustache в качестве шаблонизатора

//Устанавливаем обработчик запроса вида: http://localhost:3000/
app.get('/', (req, res, next) => {

    /*render – наполняем данными шаблон и отправляет полученный таким образом файл
    вёрстки клиенту: index – это файл шаблона index.mustache; { title: 'First experence with
    mustache!' } – объект из которого берутся данные в шаблон*/
    res.render('index', { title: 'First experence with mustache!' });
});
app.listen(3000); //Настраиваем express приложение слушать запросы на 3000 порту

/*
Проанализируйте приложение, что оно делает?
-- Подключает шаблонизатор mustache, отрисовывает страницу с его помощью, когда заходим по адресу http://localhost:3000/
*/