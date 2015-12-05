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
  function fundsPrices() {
    loadTable();
    loadShowAll_btn();
  }


  //MENU CONTROL
  //use this function to remove highlight form button
  function zeroButton(btnName) {
    $(btnName).addClass("btn-default")
      .removeClass("btn-primary");
  }
  //use this function to highlight button
  function activeButton(btnName) {
    $(btnName).addClass("btn-primary")
      .removeClass("btn-default");
  }

  //actions to execute on Funds Prices button click
  $(document).ready(function() {
    $("#fundsPrices").click(function() {
      //load content
      fundsPrices();
      //change appearence of buttons
      zeroButton("#addManager");
      zeroButton("#addFund");
      zeroButton("#updatePrices");
      activeButton("#fundsPrices");
    });
    $("#btnSaveAddManager").click(function() {
      addManager();
    });

    $("#btnRemoveManager").click(function() {
       loadManagerList()
    });
    
    $("#updatePrices").click(function() {
     
      loadFundNameList();
    });
    
    $("#addFund").click(function() {
      console.log("rabotaet");
            loadManagerList2();
      
    });

    $("#btnSaveRemoveManager").click(function() {
      removeManager();
    });
    
    $("#btnSaveAddFund").click(function(){
           addFund();
    
    });
    
      $("#btnSaveAddPrice").click(function(){
           addPrice();
    
    });
  });

  //function resposible for adding 'show all' button
  function loadShowAll_btn() {
    var showAll = '';

    if (activeManager === "All") {
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
  
//ManagerList
  function loadManagerList() {
   
    $.get('Security_staticdata.xml', function(staticData) {
      var html = '';
      html = html + "<select id='selectManager'>";
      var $manager = $(staticData).find("manager");
      $manager.each(function() {
      //assign current manager to $thisManager in order to easy access to the item inside another loop
        var $thisManager = $(this);
        var managerName = $thisManager.attr("name");
        html = html + "<option value = '" + managerName + "'>" + managerName + "</option>";
      });
      html = html + "</select>";
      document.getElementById("managersList").innerHTML = html;
 
    });
       
  }

// function loadManagerList3() {
//     $.get('Security_staticdata.xml', function(staticData) {
//       var html = '';
//       html = html + "<select id='selectManager'>";
  
//       var $manager = $(staticData).find("manager");
//       $manager.each(function() {
//         //assign current manager to $thisManager in order to easy access to the item inside another loop
//         var $thisManager = $(this);
//         var managerName = $thisManager.attr("name");
//         html = html + "<option value = '" + managerName + "'>" + managerName + "</option>";
//       });
//       html = html + "</select>";
//       document.getElementById("managersList3").innerHTML = html;
//     });
//   }
  
 function loadManagerList2(){
    $.get('Security_staticdata.xml', function(staticData) {
      var html = '';
      html = html + "<select id='selectManager'>";
  
      var $manager = $(staticData).find("manager");
      $manager.each(function() {
        //assign current manager to $thisManager in order to easy access to the item inside another loop
        var $thisManager = $(this);
        var managerName = $thisManager.attr("name");
        html = html + "<option value = '" + managerName + "'>" + managerName + "</option>";
      });
      html = html + "</select>";
      document.getElementById("managersList2").innerHTML = html;
    });
 }
 
   function loadFundNameList(){
     console.log("WORKING")
       $.get('Security_pricingdata.xml', function(pricingData) {
      var html = '';
      html = html + "<select id='selectFund'>";
  
      var $fund = $(pricingData).find("fund");
      $fund.each(function() {
        //assign current manager to $thisManager in order to easy access to the item inside another loop
        var $thisFund = $(this);
        var fundCode = $thisFund.attr("code");
        html = html + "<option value = '" + fundCode + "'>" + fundCode + "</option>";
      });
      html = html + "</select>";
      document.getElementById("fcodesList").innerHTML = html;
    });
   }
    

  function removeManager() {
    $.get('Security_staticdata.xml', function(staticData) {

      var sel = document.getElementById("selectManager");
      var selected = sel.options[sel.selectedIndex].value;
      var $manager = $(staticData).find("manager");
      $manager.each(function() {
        //assign current manager to $thisManager in order to easy access to the item inside another loop
        var $thisManager = $(this);
        var managerName = $thisManager.attr("name");
        if (managerName === selected) {
          $(this).remove();
        }
      });

//fCodeList 

      var xmlString = (new XMLSerializer()).serializeToString(staticData);

      updateXML(xmlString);
      loadManagerList();
    });
  }

  function addManager() {
    console.log("Adding: " + $("#newManager").val());

    if ($("#newManager").val() === '') {
      alert("Please provide manager name before saving.");
    } 
    
    else {
      $.get('Security_staticdata.xml', function(staticData) {

        $(staticData).find('fundstatic').append($('<manager>').attr('name', $("#newManager").val()));
        var xmlString = (new XMLSerializer()).serializeToString(staticData);
        updateXML(xmlString);
        $("#newManager").val('');
      });
    }
  }
  
    function addFund() {
    console.log("Adding: " + $("#newFund").val());
 
    if ($("#newFund" || "#newCode" || "#newCurr").val() === '') {
      alert("Fill in all the fields");
    } 
    else {
      
      $.get('Security_staticdata.xml', function(staticData) {

      var sel = document.getElementById("selectManager");
      
      var selected = sel.options[sel.selectedIndex].value;
    
      var $manager = $(staticData).find("manager");
      $manager.each(function() {
        //assign current manager to $thisManager in order to easy access to the item inside another loop
        var $thisManager = $(this);
        var managerName = $thisManager.attr("name");
        if (managerName === selected) {
            console.log(selected);
        var $wholeFile = $(staticData).find('fundstatic')
        var newCode = $("#newCode").val();
        var newCurrency = $("#newCurr").val();
        var newFname =  $("#newFund").val();
        
        console.log("this:" + $("#newCode").val());
        $(staticData).find('fundstatic')
        .find("manager[name='"+managerName+"']")
        .append($('<fund>').attr('code', newCode).attr('currency', newCurrency))
        .find("fund[code='"+newCode+"']").append($('<fname>').text(newFname));
        
        var xmlString = (new XMLSerializer()).serializeToString(staticData);
        console.log(xmlString);
        updateXML(xmlString);
        
        }
       
          
      
    // $.get('Security_staticdata.xml', function(staticData){
      
    //   var mnEntered= $("#exisManager").val();
       
    //   var $manager = $(staticData).find("manager");
      
    //   $manager.each(function() {
    //     //assign current manager to $thisManager in order to easy access to the item inside another loop
    //     var $thisManager = $(this);
    //     var managerName = $thisManager.attr("name");
    //     if (managerName === mnEntered){
    //     $(this).append($('<fund>').attr('code', $("#newCode").val()).attr('currency', $("#newCurr").val()));
    //   }
    //     else{
    //       alert("manager does not exist, enter correct manager");
    
    //   }
      
        });
      
    });
    }
  
    

        // $("#exisManager").val('');
        // $("#newFund").val('');
        // $("#newCode").val('');
        // $("#newCurr").val('');
      }
  
     
    function addPrice() {
    console.log("Adding: " + $("#newDate").val());
 
    if ($("#newDate" || "#newNav" || "#newBid"||"#newOffer").val() === '') {
      alert("Fill in all the fields");
    } 
    else {
      
      $.get('Security_pricingdata.xml', function(pricingData) {

      var sel = document.getElementById("selectFund");
      
      var selected = sel.options[sel.selectedIndex].value;
      var $fcode = $(staticData).find("fund");
      $fcode.each(function() {
        //assign current manager to $thisManager in order to easy access to the item inside another loop
        var $thisFcode = $(this);
        var fundCode = $thisFcode.attr("code");
        if (fundCode === selected) {
            console.log(selected);
        var $wholeFile = $(staticData).find('fundspricing')
        var newDate = $("#newDate").val();
        var newNav=$("#newNav").val();
        var newBid = $("#newBid").val();
        var newOffer =  $("#newOffer").val();
        
        console.log("this:" + $("#newDate").val());
        $(pricingData).find('fundspricing')
        .find("fund[name='"+fundCode+"']")
        .append($('<price>').attr('date', newDate))
        .find("price[date='"+newDate+"']").append($('<NAV>').text(newNav).$('<bid>').text(newBid).$('<offer>').text(newOffer));
        
        var xmlString = (new XMLSerializer()).serializeToString(staticData);
        console.log(xmlString);
        // updateXML(xmlString);
        
        }
       
          
      
    // $.get('Security_staticdata.xml', function(staticData){
      
    //   var mnEntered= $("#exisManager").val();
       
    //   var $manager = $(staticData).find("manager");
      
    //   $manager.each(function() {
    //     //assign current manager to $thisManager in order to easy access to the item inside another loop
    //     var $thisManager = $(this);
    //     var managerName = $thisManager.attr("name");
    //     if (managerName === mnEntered){
    //     $(this).append($('<fund>').attr('code', $("#newCode").val()).attr('currency', $("#newCurr").val()));
    //   }
    //     else{
    //       alert("manager does not exist, enter correct manager");
    
    //   }
      
        });
      
    });
    }
  
    

        // $("#exisManager").val('');
        // $("#newFund").val('');
        // $("#newCode").val('');
        // $("#newCurr").val('');
      }
      
    
   
    function updateXML(value) {
    $.ajax({
      type: "POST",
      url: "/updateXML",
      data: value,
      contentType: "text/xml",
      dataType: "xml",
      cache: false,
      error: function() {
        alert("No data found.");
      },
      success: function() {
        loadTable();
      }
    });
  }

  function loadTable() {
    //aquire data from staticdata xml file and assign to staticData 
    $.get('Security_staticdata.xml', function(staticData) {
      //aquire data from pricingdata xml file and assign to staticData
      $.get('Security_pricingdata.xml', function(pricingData) {
        //create list of all funds with their prices
        var $funds = $(pricingData).find("fund");
        //create list of all managers with their details
        var $manager = $(staticData).find("manager");
        //create list of all fund names
        var $fname = $(staticData).find("fname");
        //start building table
        var table = "";
        //create table header, two options depending on which priceType has been chosen (with nav only or with bid and offer)
        if (priceType === "NAV") {
          table = "<div class='row'><table class='table-hover col-sm-12'><tr><th class='col-sm-2'>ISIN code</th><th class='col-sm-5'>Security name</th><th class='col-sm-1'>Currency</th><th class='col-sm-2'>NAV price</th><th class='col-sm-2'>Valuation date</th></tr>";
        } else {
          table = "<div class='row'><table class='table-hover col-sm-12'><tr><th class='col-sm-2'>ISIN code</th><th class='col-sm-5'>Security name</th><th class='col-sm-1'>Currency</th><th class='col-sm-1'>Bid price</th><th class='col-sm-1'>Offer price</th><th class='col-sm-2'>Valuation date</th></tr>";
        }

        //loop through all managers
        $manager.each(function() {
          //assign current manager to $thisManager in order to easy access to the item inside another loop
          var $thisManager = $(this);
          var managerName = $thisManager.attr("name");
          //for each manager build header / link
          if (priceType === "NAV") {
            table = table +
              "<tr class='manager'><td colspan='5'><h4><a href='javascript:changeActiveManager(&quot;" +
              managerName +
              "&quot;)'><div>" +
              managerName +
              "</div></a></h4></td></tr>";
          } else {
            table = table +
              "<tr class='manager'><td colspan='6'><h4><a href='javascript:changeActiveManager(&quot;" +
              managerName +
              "&quot;)'><div>" +
              managerName +
              "</div></a></h4></td></tr>";
          }
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