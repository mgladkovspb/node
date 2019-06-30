let express         = require('express')
  , mustacheExpress = require('mustache-express')
  , bodyParser      = require('body-parser')
  , app             = express();

app.set('views', __dirname + '/views');
app.engine('mustache', mustacheExpress());
app.set('view engine', 'mustache');

app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', (req, res, next) => {
    res.render('index', { title: 'First experence with mustache!' });
});

app.post('/register', (req, res) => {
    res.render('result', req.body);
});

app.listen(3000);