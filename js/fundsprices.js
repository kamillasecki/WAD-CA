  //getting pricing and static data from xml files
  var staticData;
  var pricingData;
  var activeISIN;
  var activeManager;
  var priceType = "NAV";

  //changge type of price which is being displayed
  function changePriceType(type) {
    priceType = type;
    fundsPrices();
  }

  //update manager which is currently being displayed
  function changeActiveManager(manager) {
    activeManager = manager;
    fundsPrices();
  }

  //update security for which pricing history is being displayed
  function changeActiveISIN(isin) {
    activeISIN = isin;
    fundsPrices();
  }

  //this function is called when 'Funds prices' is clicked on menu panel
  function fundsPrices(activeManager) {
    loadTable();
    loadShowAll_btn();
  }


    $(".btn btn-default").click(function() {
      changeActiveManager("All");
    });
    

  //function resposible for adding 'show all' button
  function loadShowAll_btn() {
    var showAll = '';
    
    if (activeManager === "All"){
    showAll = "<button type='button' id='btn_coll_all' class='btn btn-default'>Colaps all</button>";
    } else {
    showAll = "<button type='button' id='btn_show_all' class='btn btn-default'>Expand all</button>";
    }
    if (priceType === "NAV") {
      showAll = showAll + "<button type='button' id='btn_chng_dual' class='btn btn-default'>Display dual</button>";
    } else {
      showAll = showAll + "<button type='button' id='btn_chng_nav' class='btn btn-default'>Display NAV</button>";
    }
    document.getElementById('main-top').innerHTML = showAll;
    
    $("#btn_show_all").click(function() {
      changeActiveManager("All");
    });
    
    $("#btn_coll_all").click(function() {
      changeActiveManager("");
    });
    
    $("#btn_chng_nav").click(function() {
      changePriceType("NAV");
    });
    
    $("#btn_chng_dual").click(function() {
      changePriceType("Dual");
    });
    
    
  }
  
  function loadTable() {
  $('.row').on('click', function() {
   var row = $(this).find('td:first').text();
   console.log('You clicked ' + row);
});


//aquire data from staticdata xml file and assign to staticData 
    $.get('Security_staticdata.xml', function(staticData) {
      //aquire data from pricingdata xml file and assign to staticData
      $.get('Security_pricingdata.xml', function(pricingData) {
        //create list of all funds with their prices
        var $funds = $(pricingData).find("fund");
        //create list of all managers with their details
        var $manager = $(staticData).find("manager");
        //start building table
        var table = "";
        //create table header, two options depending on which priceType has been chosen (with nav only or with bid and offer)
        if (priceType === "NAV") {
          table = "<div class='row'><table id='t01' class='col-sm-12'><tr><th class='col-sm-2'>ISIN code</th><th class='col-sm-5'>Security name</th><th class='col-sm-1'>Currency</th><th class='col-sm-2'>NAV price</th><th class='col-sm-2'>Valuation date</th></tr>";
        } else {
          table = "<div class='row'><table id='t01' class='col-sm-12'><tr><th class='col-sm-2'>ISIN code</th><th class='col-sm-5'>Security name</th><th class='col-sm-1'>Currency</th><th class='col-sm-1'>Bid price</th><th class='col-sm-1'>Offer price</th><th class='col-sm-2'>Valuation date</th></tr>";
        }

        //loop through all managers
        $manager.each(function() {
          //assign current manager to $thisManager in order to easy access to the item inside another loop
          var $thisManager = $(this);
          var managerName = $thisManager.attr("name");
          //for each manager build header / link
          table = table + 
                  "<tr class='manager'><td colspan='5'><h4><a href='javascript:changeActiveManager(&quot;" + 
                  managerName + 
                  "&quot;)'><div>" + 
                  managerName + 
                  "</div></a></h4></td></tr>";
          //if manager is active/has been clicked or all managers are selected keep printing funds assigned to this manager
          if (activeManager === "All" | activeManager === managerName) {
            var $securities = $thisManager.find("fund");
            //looping through all securities assigned to manager (in static data file)
            $securities.each(function() {
              var $thisSecurity = $(this);
              var code = $thisSecurity.attr("code");
              //looping through all securities (in pricing data file)
              $funds.each(function() {
                var $thisFund = $(this);
                var isin = $thisFund.attr("code");
                //maching both datas (static and pricing) using uniquie identyfier (ISIN)
                if (isin === code) {
                  //if match found create new object FUND
                  var fund = new Object();
                  var $fundPrices = $thisFund.find("price");
                  fund.isin = isin;
                  fund.name = $thisSecurity.find("fname").text();
                  fund.currency = $thisSecurity.attr("currency");
                  fund.date = $thisFund.find("price:first").attr("date");
                  fund.nav = $thisFund.find("price:first").find("NAV").text();
                  fund.bid = $thisFund.find("price:first").find("bid").text();
                  fund.offer = $thisFund.find("price:first").find("offer").text();
                  
                  table = table + "<tr class='fund'><td>" + fund.isin + "</td>" +
                    "<td><a href='javascript:changeActiveISIN(&quot;" + fund.isin + "&quot;)'>" + fund.name + "</a></td>" +
                    "<td>" + fund.currency + "</td>";

                  if (priceType === "NAV") {
                    table = table + "<td>" + fund.nav + "</td>";
                  } else {
                    table = table + "<td>" + fund.bid + "</td><td>" + fund.offer + "</td>";
                  }

                  table = table + "<td>" + fund.date + "</td></tr>";

                  if (fund.isin == activeISIN) {
                    //check how many archive prices is available and print one row for each
                    var ArchPricesNo = $fundPrices.length;
                    //starting from 1 as the first price is already printed
                    for (var z = 1; z < ArchPricesNo; z++) {
                      var archDate = $fundPrices.eq(z).attr("date");
                      var archNav = $fundPrices.eq(z).find("NAV").text();
                      var archBid = $fundPrices.eq(z).find("bid").text();
                      var archOffer = $fundPrices.eq(z).find("offer").text();
                      if (priceType === "NAV") {
                        table = table + "<tr class='archive'><td colspan='3'></td>" +
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
              });
            });
          }

        });
        table = table + "</table><br/></div>";
        //finally pass the created html to 'main-mid' div
        document.getElementById("main-mid").innerHTML = table;
      });
    });
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