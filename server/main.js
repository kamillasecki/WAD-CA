var express = require('express');

var app = new express();

app.get('/',function(req,res){
    res.render(__dirname + './../app/index.ejs',{});
})
.use(express.static(__dirname + './../.temp'))
.listen(process.env.PORT);