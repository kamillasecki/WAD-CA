  //getting pricing and static data from xml files
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
      loadManagerList(1);
    });

    $("#updatePrices").click(function() {
      loadManagerList(3);
    });

    $("#addFund").click(function() {
      console.log("rabotaet");
      loadManagerList(2);

    });

    $("#btnSaveRemoveManager").click(function() {
      removeManager(1);
    });

    $("#btnSaveAddFund").click(function() {
      addFund();

    });

    $("#btnSaveAddPrice").click(function() {
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
  function loadManagerList(x) {


    $.get('Security_staticdata.xml', function(staticData) {
      var html = '';
      html = html + "<select id='selectManager" + x + "'><option selected disabled hidden value=''></option>";
      var $manager = $(staticData).find("manager");
      $manager.each(function() {
        //assign current manager to $thisManager in order to easy access to the item inside another loop
        var $thisManager = $(this);
        var managerName = $thisManager.attr("name");
        html = html + "<option value = '" + managerName + "'>" + managerName + "</option>";
      });
      html = html + "</select>";
      var destination = "managersList" + x;
      document.getElementById(destination).innerHTML = html;
      $("#selectManager3").change(function() {
        $.get('Security_pricingdata.xml', function(pricingData) {
          var html = '';
          html = html + "<select id='selectFund'>";
          var $managers = $(staticData).find("manager");
          var sel = document.getElementById("selectManager3");
          var selected = sel.options[sel.selectedIndex].value;
          $managers.each(function() {
            var $thisManager = $(this);
            var managerName = $thisManager.attr("name");
            if (selected === managerName) {
              var $funds = $thisManager.find("fund");
              $funds.each(function() {
                var $thisFund = $(this);
                var fundName = $thisFund.find("fname").text();

                html = html + "<option value = '" + fundName + "'>" + fundName + "</option>";

              });
            }
          });
          html = html + "</select>";
          document.getElementById("fcodesList").innerHTML = html;
        });
      });
    });
  }

  function removeManager() {
    $.get('Security_staticdata.xml', function(staticData) {

      var sel = document.getElementById("selectManager1");
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

      updateStaticXML(xmlString);
      loadManagerList();
    });
  }

  function addManager() {
    console.log("Adding: " + $("#newManager").val());

    if ($("#newManager").val() === '') {
      alert("Please provide manager name before saving.");
    } else {
      $.get('Security_staticdata.xml', function(staticData) {

        $(staticData).find('fundstatic').append($('<manager>').attr('name', $("#newManager").val()));
        var xmlString = (new XMLSerializer()).serializeToString(staticData);
        updateStaticXML(xmlString);
        $("#newManager").val('');
      });
    }
  }

  function addFund() {
    console.log("Adding: " + $("#newFund").val());

    if ($("#newFund" || "#newCode" || "#newCurr").val() === '') {
      alert("Fill in all the fields");
    } else {

      $.get('Security_staticdata.xml', function(staticData) {



        var $manager = $(staticData).find("manager");

        $manager.each(function() {
          //assign current manager to $thisManager in order to easy access to the item inside another loop
          var $thisManager = $(this);
          var managerName = $thisManager.attr("name");
          var selection = document.getElementById("selectManager2");
          console.log("index=: " + selection.selectedIndex);
          var selected = selection.options[selection.selectedIndex].value;
          console.log("adding to: " + selected);
          if (managerName === selected) {

            var newCode = $("#newCode").val();
            var newCurrency = $("#newCurr").val();
            var newFname = $("#newFund").val();

            var newNode = '<fund code="' + newCode + '" currency="' + newCurrency + '"><fname>' + newFname + '</fname></fund>';
            alert(newNode);
            $(staticData).find('fundstatic')
              .find("manager[name='" + managerName + "']")
              .append(newNode);

            var xmlStringStatic = (new XMLSerializer()).serializeToString(staticData);
            updateStaticXML(xmlStringStatic);

            $.get('Security_pricingdata.xml', function(pricingData) {
              $(pricingData).find("fundspricing").append('<fund code="' + newCode + '"></fund>');
              var xmlStringPricing = (new XMLSerializer()).serializeToString(pricingData);
              updatePricingXML(xmlStringPricing);

            });
          }
        });
      });
    }

  }


  function addPrice() {
    console.log("Adding: " + $("#newDate").val());

    if ($("#newDate" || "#newNav" || "#newBid" || "#newOffer").val() === '') {
      alert("Fill in all the fields");
    } else {

      $.get('Security_pricingdata.xml', function(pricingData) {
        $.get('Security_staticdata.xml', function(staticData) {

          var selManager = document.getElementById("selectManager3");
          var selectedManager = selManager.options[selManager.selectedIndex].value;

          var selFund = document.getElementById("selectFund");
          var selectedFund = selFund.options[selFund.selectedIndex].value;

          //gertting code from selected name
          var $managers = $(staticData).find("manager");
          $managers.each(function() {
            console.log("ok");
            var $thisManager = $(this);
            var managerName = $thisManager.attr("name");
            console.log("checking selected:" +selectedManager+ "against"  + managerName);
            if (selectedManager === managerName) {
              var $funds = $thisManager.find("fund");
              $funds.each(function() {
                var $thisFund = $(this);
                var fundName = $thisFund.find("fname").text();
                if (selectedFund === fundName) {
                  var code = $thisFund.attr("code");
                  console.log(code);

                  var newDate = $("#newDate").val();
                  var newNav = $("#newNav").val();
                  var newBid = $("#newBid").val();
                  var newOffer = $("#newOffer").val();

                  var newNode = '<price date="' + newDate + '"><NAV>' + newNav + '</NAV><bid>' + newBid + '</bid><offer>' + newOffer + '</offer></price>';

                  $(pricingData).find("fund[code='" + code + "']").prepend(newNode);


                  var xmlString = (new XMLSerializer()).serializeToString(pricingData);
                  console.log(xmlString);
                  updatePricingXML(xmlString);

                  $("#newDate").val('');
                  $("#newNav").val('');
                  $("#newBid").val('');
                  $("#newOffer").val('');

                  loadTable();
                }
              });
            }
          });
        });
      });
    }
  }

  function updateStaticXML(value) {
    $.ajax({
      type: "POST",
      url: "/updateStaticXML",
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

  function updatePricingXML(value) {
    $.ajax({
      type: "POST",
      url: "/updatePricingXML",
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
