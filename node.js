var express = require('express');
var app = express();
var path = require("path");
var xslt4node  = require('xslt4node');

//configure
//app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(__dirname + '/views'));

//define routes
app.use(require("./managerHandler"));
// app.use(require("./fundHandler"));
app.get('/', function(req, res) {
  res.sent('index.html');
});

app.listen(process.env.PORT);

app.get('/rss', function(req, res){
    var config = {
        xsltPath: 'views/pricing.xsl',
        sourcePath: 'views/Security_pricingdata.xml',
        result: String,
        props: {
            indent: 'yes'
        }
    };

    xslt4node.transform(config, function (err,result) {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
    });
});

app.get('/rss2', function(req, res){
    var config = {
        xsltPath: 'views/rss.xsl',
        sourcePath: 'views/Security_staticdata.xml',
        result: String,
        props: {
            indent: 'yes'
        }
    };

    xslt4node.transform(config, function (err,result) {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
    });
});