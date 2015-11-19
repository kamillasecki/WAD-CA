var express = require('express');
var app = express();
var path = require("path");

//configure
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(__dirname + '/views'));

//define routes
app.use(require("./managerHandler"));

app.get('/', function(req, res) {
  res.render('index');
});

app.listen(process.env.PORT);