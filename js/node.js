var express = require('express');
var app =  express();

app.get('/helo.txt', function(req, res) {
  res.send("xxx");
});

var server = app.listen(8080);