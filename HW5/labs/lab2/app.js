let express    = require('express') //подключаем модуль express
  , app        = express() //создаем приложение express
  , bodyParser = require('body-parser'); /*подключаем модуль для обработки содержимого тела post запроса */

app.listen(80); //Настраиваем express приложение слушать запросы на 80 порту

app.use(bodyParser.urlencoded({ extended: false })); /*регистрируем модуль для обработки содержимого тела post запроса в express */
app.use(express.static('public')); /* настраиваем статический сервер, для отдачи контента из папки public */

//Формируем обработчик post запроса на адрес http://localhost:80/somepath
app.post('/somepath', (req, res, next) => {
    console.log('Параметры POST запроса: ' + JSON.stringify(req.body));
    res.send(JSON.stringify(req.body)); //Отправляем присланные параметры обратно клиенту
});

/*
Протестируйте и проанализируйте приложение, что оно делает?
-- По кнопке submit, форма передается на сервер, методом POST по url http://localhost:80/somepath
-- Обработчик /somepath, принимает запрос, выводит тело запроса в консоль и отправляет его клиенту
*/