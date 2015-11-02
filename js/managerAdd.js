var staticData;
 
//call for static data from xml and assign to variable
$.get("Security_staticdata.xml", function(data) {
  staticData = data;
});
    
