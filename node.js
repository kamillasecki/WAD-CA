var express = require('express');
var app =  express();


app.use(express.static(__dirname + '/public'));

app.get('/manager/:name' , function(req, res) {
 res.setHeader('Content-type','text/plain');
 res.send("You wanted to display :" + req.params.name);
 
});

var server = app.listen(process.env.PORT);