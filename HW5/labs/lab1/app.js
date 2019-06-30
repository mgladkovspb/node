let express = require('express') //подключаем модуль express
  , app     = express() //создаем приложение express
  , route   = require('./routes/products.js'); //подключаем файл с роутом

app.use('/products', route); /*регистрируем роут, все url начинающиеся с /products будут

передаваться в обработку в этот роут*/
app.listen(3000); //Настраиваем express приложение слушать запросы на 3000 порту

/*
Почему на http://localhost:3000/ возвращает строка «Cannot GET /»?
-- Не обработчика такого маршрута
*/