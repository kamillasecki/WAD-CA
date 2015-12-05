// var express = require('express');
// var router = express.Router();
// var fs = require('fs');
// var js2xmlparser = require("js2xmlparser");

// //define routes

// router.post('/updateXML', function(request, respond) {
//   console.log("Saving");
//   var body = '';
//   var filePath = __dirname + '/views/Security_staticdata.xml';
//   request.on('data', function(data) {
//     body += data;
//   });

//   request.on('end', function() {
//     fs.writeFile(filePath, body, function() {
//       respond.end();
//     });
//   });
// });

// // router.post('/post/json', function(req, res) {

// //   // Function to read in a JSON file, add to it & convert to XML
// //   function appendJSON(obj) {
    
// //     var filePath = __dirname + '/views/Security_staticdata.json';

// //     // Read in a JSON file
// //     var JSONfile = fs.readFileSync(filePath, 'utf8');

// //     // Parse the JSON file in order to be able to edit it 
// //     var JSONparsed = JSON.parse(JSONfile);

// //     // Add a new record into country array within the JSON file    
// //     JSONparsed.fundstatic.manager.push(obj);

// //     // Beautify the resulting JSON file
// //     var JSONformated = JSON.stringify(JSONparsed, null, 4);

// //     // Write the updated JSON file back to the system 
// //     fs.writeFileSync(filePath, JSONformated);

// //     // Convert the updated JSON file to XML     
// //     var XMLformated = js2xmlparser("countries", JSONformated);
// //     console.log(XMLformated);
// //     // Write the resulting XML back to the system
// //     // fs.writeFileSync('Countries.xml', XMLformated);

// //   }

// //   // Call appendJSON function and pass in body of the current POST request
// //   appendJSON(req.body);
  
// //   // Re-direct the browser back to the page, where the POST request came from
// //   res.redirect('back');

// // });


// module.exports = router;

var express = require('express');
var router = express.Router();
var fs = require('fs');

//define routes

router.post('/updateXML', function(request, respond) {
  console.log("Saving");
  var body = '';
  var filePath = __dirname + '/views/Security_staticdata.xml';
  request.on('data', function(data) {
    body += data;
    fs.writeFileSync(filePath, data);
    respond.end();
  });

  // request.on('end', function() {
    // fs.writeFile(filePath, body) function() {
    //   respond.end();
    // });
  // });
});

module.exports = router;