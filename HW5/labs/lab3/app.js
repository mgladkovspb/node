let express    = require('express')
  , app        = express()
  , bodyParser = require('body-parser')
  , route      = require('./routes/register.js');


app.listen(80);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('public'));

app.use('/register', route);
