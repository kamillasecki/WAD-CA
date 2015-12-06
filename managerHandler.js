var express = require('express');
var router = express.Router();
var fs = require('fs');
 
//define routes
 
router.post('/updateStaticXML', function(request, respond) {
  console.log("Saving");
  var body = '';
  var filePath = __dirname + '/views/Security_staticdata.xml';
  request.on('data', function(data) {
    body += data;
  });
  request.on('end', function() {
    fs.writeFile(filePath, body, function() {
      respond.end();
    });
  });
});
 
 
router.post('/updatePricingXML', function(request, respond) {
  console.log("Saving");
  var body = '';
  var filePath = __dirname + '/views/Security_pricingdata.xml';
  request.on('data', function(data) {
    body += data;
  });
  request.on('end', function() {
    fs.writeFile(filePath, body, function() {
      respond.end();
    });
  });
});
 
 
 
module.exports = router;