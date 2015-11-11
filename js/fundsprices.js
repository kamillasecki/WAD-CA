  //getting pricing and static data from xml files
    var staticData;
    var pricingData;
    var activeISIN;
    var activeManager;
    var priceType = "NAV";
    
  //changge type of price which is being displayed
    function changePriceType(type){
      priceType = type;
      fundsPrices();
    }
    
  //update manager which is currently being displayed
    function changeActiveManager(manager){
      activeManager = manager;
      fundsPrices();
    }
    
  //update security for which pricing history is being displayed
    function changeActiveISIN(isin){
    activeISIN = isin;
    fundsPrices();
    }

//this function is called when 'Funds prices' is clicked on menu panel
    function fundsPrices(activeManager) {
      loadTable();
      loadShowAll_btn();
    }

//function resposible for adding 'show all' button
    function loadShowAll_btn() {
      var showAll = "<a onClick='changeActiveManager(&quot;All&quot;)' href='#'>Show All</a><br/>";
      if (priceType === "NAV") {
        showAll = showAll + "<a onClick='changePriceType(&quot;dual&quot;)' href='#'>Change to dual prices</a>";
      } else {
        showAll = showAll + "<a onClick='changePriceType(&quot;NAV&quot;)' href='#'>Change to Net Asset Value prices</a>";
      }
      document.getElementById('main-top').innerHTML = showAll;
    }

function loadTable() {
  
  $.get('Security_staticdata.xml' , function(staticData) {
    $.get('Security_pricingdata.xml', function(pricingData) {
      var $funds = $(pricingData).find("fund");
      var $manager = $(staticData).find("manager");
      
       if (priceType === "NAV") {
        var table = "<div class='row'><table id='t01' class='col-sm-12'><tr><th class='col-sm-2'>ISIN code</th><th class='col-sm-5'>Security name</th><th class='col-sm-1'>Currency</th><th class='col-sm-2'>NAV price</th><th class='col-sm-2'>Valuation date</th></tr>";
      } else {
        var table = "<div class='row'><table id='t01' class='col-sm-12'><tr><th class='col-sm-2'>ISIN code</th><th class='col-sm-5'>Security name</th><th class='col-sm-1'>Currency</th><th class='col-sm-1'>Bid price</th><th class='col-sm-1'>Offer price</th><th class='col-sm-2'>Valuation date</th></tr>";
      }
      
      $manager.each(function(){
        var $thisManager = $(this);
        var managerName = $thisManager.attr("name");
        console.log(managerName);
        table = table + "<tr><td colspan='5'><h4><a href='javascript:changeActiveManager(&quot;" 
                      + managerName 
                      + "&quot;)'>" 
                      + managerName 
                      + "</a></h4></td></tr>";
        
        if (activeManager === "All" | activeManager === managerName) {
        var $securities = $thisManager.find("fund");
        //looping through all securities assignd to manager
        $securities.each(function(){
          var $thisSecurity = $(this);
          var code = $thisSecurity.attr("code");
          console.log("checking: " + code);
          $funds.each(function(){
            var $thisFund = $(this);
            var isin = $thisFund.attr("code");
            if (isin === code) {
            console.log("found matching code");
            var fund = new Object();
            fund.isin = isin;
            fund.name = $thisSecurity.find("fname").text();
            fund.currency = $thisSecurity.attr("currency");
            fund.date = $thisFund.find("price:first").attr("date");
            console.log(fund.name);
            console.log(fund.currency);
            console.log(fund.date);
            if (priceType === "NAV") {
                fund.nav = $thisFund.find("price:first").find("NAV").text();
              } else {
                fund.bid = $thisFund.find("price:first").find("bid").text();
                fund.offer = $thisFund.find("price:first").find("offer").text();
              }
            table = table + "<tr><td>" + fund.isin + "</td>" +
                                  "<td><a href='javascript:changeActiveISIN(&quot;" + fund.isin + "&quot;)'>" + fund.name + "</a></td>" + 
                                  "<td>" + fund.currency + "</td>";
                                  
              if (priceType === "NAV") {
                table = table + "<td>" + fund.nav + "</td>";
              } else {
                table = table + "<td>" + fund.bid + "</td><td>" + fund.offer + "</td>";
              }
                                   
              table = table + "<td>" + fund.date +"</td></tr>";
            
            }
          });
          
        })}
             
                  
                  
              
      });
      table = table + "</table><br/></div>";
      //finally pass the created html to 'main-mid' div
      document.getElementById("main-mid").innerHTML = table;  
    });
  });
 
}


//function resposible for loading the table accepting manager name or 'all;'
    function loadTable2(managerOpt) {
      //aquire fund pricing tree
      var funds = pricingData.getElementsByTagName("fund");
      //aquire fund static data tree
      var manager = staticData.getElementsByTagName("manager");
      //check number of managers in xml
      var mnanagerNum = manager.length;
      //draw the header
      if (priceType === "NAV") {
        var table = "<div class='row'><table id='t01' class='col-sm-12'><tr><th class='col-sm-2'>ISIN code</th><th class='col-sm-5'>Security name</th><th class='col-sm-1'>Currency</th><th class='col-sm-2'>NAV price</th><th class='col-sm-2'>Valuation date</th></tr>";
      } else {
        var table = "<div class='row'><table id='t01' class='col-sm-12'><tr><th class='col-sm-2'>ISIN code</th><th class='col-sm-5'>Security name</th><th class='col-sm-1'>Currency</th><th class='col-sm-1'>Bid price</th><th class='col-sm-1'>Offer price</th><th class='col-sm-2'>Valuation date</th></tr>";
      }
      
      var j, i, k, fundNum;
      
      //populating table with data for i manager
      function populateTable(i) {
        //get number of funds for i manager
        fundNum = manager[i].children.length;
        //for each fund draw the table row
        for (j = 0; j < fundNum; j++) {
          for (k = 0; k < funds.length; k++) {
            if (funds[k].getAttribute("code") === manager[i].children.item(j).getAttribute("code")) {
              var fund = new Object();
              fund.isin = manager[i].children.item(j).getAttribute("code");
              fund.fundName = manager[i].children.item(j).getElementsByTagName("fname")[0].childNodes[0].nodeValue;
              fund.currency = manager[i].children.item(j).getAttribute("currency");
              if (priceType === "NAV") {
                fund.nav = funds[k].children.item(0).getElementsByTagName("NAV")[0].childNodes[0].nodeValue;
              } else {
                fund.bid = funds[k].children.item(0).getElementsByTagName("bid")[0].childNodes[0].nodeValue;
                fund.offer = funds[k].children.item(0).getElementsByTagName("offer")[0].childNodes[0].nodeValue;
              }
              
              fund.date = funds[k].children.item(0).getAttribute("date");
              table = table + "<tr><td>" + fund.isin + "</td>" +
                                  "<td><a onclick='changeActiveISIN(&quot;" + fund.isin + "&quot;)' href='#'>" + fund.fundName + "</a></td>" + 
                                  "<td>" + fund.currency + "</td>";
                                  
              if (priceType === "NAV") {
                table = table + "<td>" + fund.nav + "</td>";
              } else {
                table = table + "<td>" + fund.bid + "</td><td>" + fund.offer + "</td>";
              }
                                   
              table = table + "<td>" + fund.date +"</td></tr>";
                fundInfo (fund.isin);
            }
          }
        }
      }
      
    //function printing additional rows for historical data
      function fundInfo (isin) {
        //check if printing isin is active one
        if (isin == activeISIN) {
          //check how many archive prices is available and print one row for each
          var ArchPricesNo = funds[k].children.length;
          for (var z = 1 ; z < ArchPricesNo ; z++){
            var archDate = funds[k].children.item(z).getAttribute("date");
            var archNav = funds[k].children.item(z).getElementsByTagName("NAV")[0].childNodes[0].nodeValue;
            var archBid = funds[k].children.item(z).getElementsByTagName("bid")[0].childNodes[0].nodeValue;
            var archOffer = funds[k].children.item(z).getElementsByTagName("offer")[0].childNodes[0].nodeValue;
            if (priceType === "NAV") {
              table = table + "<tr><td colspan='3'></td>" + 
                                "<td>" + archNav + "</td>" + 
                                "<td>" + archDate + "</td></tr>";
            } else {
              table = table + "<tr><td colspan='3'></td>" + 
                                "<td>" + archBid + "</td>" + 
                                "<td>" + archOffer + "</td>" + 
                                "<td>" + archDate + "</td></tr>";
            }
          }
        }
      }
      
      //draw the list of managers
      var managerName;
      //for each manager in tree
      for (i = 0; i < mnanagerNum; i++) {
        managerName = manager[i].getAttribute("name");
        //display its name as a link
        table = table + "<tr><td colspan='5'><h4><a onclick='changeActiveManager(&quot;" 
                      + managerName 
                      + "&quot;)' href='#'>" 
                      + managerName 
                      + "</a></h4></td></tr>";
        //if the mnager name was also passed in loadTable() parameter display prices as well using populateTable()
        if (activeManager === manager[i].getAttribute("name")) {
          populateTable(i);
        //if 'all parameter has been passed by 'show all' bytton draw all prices
        } else if (activeManager === "All") {
          populateTable(i);
        }
      }
      table = table + "</table><br/></div>";
      //finally pass the created html to 'main-mid' div
      document.getElementById("main-mid").innerHTML = table;
    }

//old function displaying dropdown preserved for the moment as other dropdown will be needed in the future [not used at the moment]
    function loadDropdown() {
      var stuff = "<select onchange='loadTable(this.value)' name='managers'><option value='All'>All</option>";
      var i;
      var manager = staticData.getElementsByTagName("manager");
      var mnanagerNum = manager.length;
      for (i = 0; i < mnanagerNum; i++) {
        var value = manager[i].getAttribute("name");
        stuff = stuff + "<option value='" + value + "'>" + value + "</option>";
      }
      stuff = stuff + "</select>";
      document.getElementById("dropdown").innerHTML = stuff;
    }
