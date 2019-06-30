'use strict';

let express = require('express')
  , router  = express.Router();

router.post('/', (req, res, next)=>{
    let content = `<!DOCTYPE html><html><head><meta charset="UTF-8"></head><body>
                   <h3>Зарегистрирован новый пользователь.</h3><br/>
                   <label>Имя:</label>${req.body.name}<br/>
                   <label>Email:</label>${req.body.email}<br/>
                   <label>Пароль:</label>${req.body.password}<br/>
                   </body></html>`
    res.send(content);
});

module.exports = router;