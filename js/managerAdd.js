var staticData;
 

var xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function() {
    if (xhttp.readyState == 4 && xhttp.status == 200) {
        addManager(xhttp);
    }
}
xhttp.open("GET", "Security_staticdata.xml", true);
xhttp.send();


function loadAddManagerForm(){
  var code = "<br/><form name='myForm'" + 
"onsubmit='return addManager()' method='post'>" + 
"Name: <input type='text' name='mname'>" + 
"<input type='submit' value='Add new manager'></form>"

document.getElementById("main-mid").innerHTML = code;

}
    
function addManager(xml) {
    var mname = document.forms["myForm"]["mname"].value;
    if (x == null || x == "") {
        alert("Fund manager name must be filled out");
        return false;
    } else {
      alert("New manager: " + mname + " has been added");

var x, y, z, i, xLen, yLen, newEle, newText, xmlDoc, txt;
    xmlDoc = xml.responseXML;
    txt = "";
    x = xmlDoc.getElementsByTagName("manager");
    xLen = x.length;
    for (i = 0; i < xLen; i++) { 
        newEle = xmlDoc.createElement("edition");
        newText = xmlDoc.createTextNode("first");
        newEle.appendChild(newText);
        x[i].appendChild(newEle);
    }
    // Output all titles and editions
    y = xmlDoc.getElementsByTagName("title");
    yLen = y.length;
    z = xmlDoc.getElementsByTagName("edition");
    for (i = 0; i < yLen; i++) { 
        txt += y[i].childNodes[0].nodeValue + 
        " - Edition: " + 
        z[i].childNodes[0].nodeValue + "<br>";
    }
    document.getElementById("main-mid").innerHTML = txt; 
      xmlDoc.Save("Security_staticdata.xml");
      
      loadAddManagerForm();
    }
}