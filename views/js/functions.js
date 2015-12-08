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

  //buttons behaviours
  $(document).ready(function() {
    fundsPrices();
    //MENU BUTTONS
    //BUTTON - menu - Add manager
    $("#btnRemoveManager").click(function() {
      loadManagerList(1);
    });

    //BUTTON - menu - Add new fund
    $("#addFund").click(function() {
      loadManagerList(2);
    });

    $("#removeFund").click(function() {
      loadManagerList(4);
    });

    //BUTTON - menu - Update prices
    $("#updatePrices").click(function() {
      loadManagerList(3);
    });

    //SAVE BUTTONS
    $("#btnSaveAddManager").click(function() {
      addManager();
    });

    $("#btnSaveRemoveManager").click(function() {
      removeManager();
    });

    $("#btnSaveAddFund").click(function() {
      addFund();
    });

    $("#btnSaveRemoveFund").click(function() {
      removeFund();
    });

    $("#btnSaveAddPrice").click(function() {
      addPrice();
      loadManagerList(3);
    });
  });

  //function resposible for adding 'show all' button
  function loadShowAll_btn() {
    var showAll = '';

    if (activeManager === "All") {
      showAll = "<br/><button type='button' id='btn_coll_all' class='btn btn-default'>Colaps all</button>";
    } else {
      showAll = "<br/><button type='button' id='btn_show_all' class='btn btn-default'>Expand all</button>";
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

  // ManagerList loading manager list in depends on variable x loading manager list in 3 different places:
  // 1. Remove manager
  // 2. Add fund
  // 3. Update prices
  function loadManagerList(x) {
    //ajax static data
    $.get('Security_staticdata.xml', function(staticData) {
      //start drawing dropdown
      var html = '';
      html = html + "<select id='selectManager" + x + "'><option selected disabled hidden value=''></option>";
      //get list of all manager nodes
      var $manager = $(staticData).find("manager");
      //loop for each manager found
      $manager.each(function() {
        //assign current manager to $thisManager in order to easy access to the item inside another loop
        var $thisManager = $(this);
        //get current manager name
        var managerName = $thisManager.attr("name");
        //generate dropdown item using manager name
        html = html + "<option value = '" + managerName + "'>" + managerName + "</option>";
      });
      //finish drawing dropdown
      html = html + "</select>";

      //create destination so depends on x=? the dropdown will go different place
      var destination = "managersList" + x;
      document.getElementById(destination).innerHTML = html;
      // if the abowe dropdown is for "update prices" menu, create additional dropdown with list of funds for selected manager once it is seleceted
      if (x === 3 || x === 4) {
        document.getElementById("fcodesList" + x).innerHTML = '';
        //create listener for previous dropdown
        $("#selectManager" + x).change(function() {
          //start drawing dropdown
          var html = '';
          html = html + "<select id='selectFund" + x + "'><option selected disabled hidden value=''></option>";
          //get a name of selected manager
          var sel = document.getElementById("selectManager" + x);
          var selected = sel.options[sel.selectedIndex].value;
          //loop through all managers untill you find selected one
          $manager.each(function() {
            var $thisManager = $(this);
            var managerName = $thisManager.attr("name");
            //match currenlty checked manager against selected one
            if (selected === managerName) {
              //if match get list of funds under this manager
              var $funds = $thisManager.find("fund");
              //for each fund add one item in the dropdown
              $funds.each(function() {
                var $thisFund = $(this);
                var fundName = $thisFund.find("fname").text();
                html = html + "<option value = '" + fundName + "'>" + fundName + "</option>";
              });
            }
          });
          //finish drawing dropdown
          html = html + "</select>";
          //push html with dropdown containing fund names to the form
          document.getElementById("fcodesList" + x).innerHTML = html;
        });
      }
    });
  }

  //function responsible for removing the manager
  function removeManager() {
    //ajax static data
    $.get('Security_staticdata.xml', function(staticData) {
      //get name of manager to be removed from the dropdown
      var sel = document.getElementById("selectManager1");
      var selected = sel.options[sel.selectedIndex].value;
      //find all manager nodes in xml
      var $manager = $(staticData).find("manager");
      //loop through all managers until selected manager found
      $manager.each(function() {
        var $thisManager = $(this);
        var managerName = $thisManager.attr("name");
        if (managerName === selected) {
          var check = $thisManager.find("fund").length;
          if (check === 0) {
            $(this).remove();
          } else {
            alert("This manager contains some active funds.\nBefore removing a manager first make sure it has no active funds!");
          }
        }
      });
      //push xml with removed node to string 
      var xmlString = (new XMLSerializer()).serializeToString(staticData);
      //push xml string to be saved in the file on the server
      updateStaticXML(xmlString);
      //refresh table
      fundsPrices();
      loadManagerList(1)
    });
  }

  //function responsible for adding new manager
  function addManager() {
    //Checking if the name is not empty
    if ($("#newManager").val() === '') {
      alert("Please provide manager name before saving.");
    } else {
      var newName = $("#newManager").val();
      var node = '<manager name="' + newName + '"></manager>';
      //ajax static data
      $.get('Security_staticdata.xml', function(staticData) {
        //getting name entered by user
        var newName = $("#newManager").val();
        //checking if the same name already exists by searching the name and checking a number of items found
        var check = $(staticData).find('fundstatic')
          .find("manager[name='" + newName + "']");
        if (check.length === 0) {
          //if name not found add new node
          $(staticData).find('fundstatic').append(node);
          //transform xml object to the string
          var xmlString = (new XMLSerializer()).serializeToString(staticData);
          //save string to the file
          updateStaticXML(xmlString);
          //clear the input
          $("#newManager").val('');
          //refresh the table
          fundsPrices();
        } else {
          //if manager already exists show the warning
          alert("Manager already exists.");
        }
      });
    }
  }

  //function responsible for adding new fund
  function addFund() {
    //check if all fields are populated
    if ($("#newFund" || "#newCode" || "#newCurr").val() === '') {
      alert("Fill in all the fields");
    } else {
      //create varibles with all new fields user inputed
      var newCode = $("#newCode").val();
      var newCurrency = $("#newCurr").val();
      var newFname = $("#newFund").val();
      var selection = document.getElementById("selectManager2");
      var managerName = selection.options[selection.selectedIndex].value;
      //create new node from inputed data
      var newNode = '<fund code="' + newCode + '" currency="' + newCurrency + '"><fname>' + newFname + '</fname></fund>';

      //ajax static data file
      $.get('Security_staticdata.xml', function(staticData) {
        //finding selected manager and appending it by newly created node
        $(staticData).find('fundstatic')
          .find("manager[name='" + managerName + "']")
          .append(newNode);
        //transform xml object to the string
        var xmlStringStatic = (new XMLSerializer()).serializeToString(staticData);
        //saving sxl string to the xml file
        updateStaticXML(xmlStringStatic);
      });
      //ajax pricing data
      $.get('Security_pricingdata.xml', function(pricingData) {
        //creating new node for pricing file
        var pricingNode = '<fund code="' + newCode + '"></fund>'
          //adding new node to the main node of pricing file
        $(pricingData).find("fundspricing").append(pricingNode);
        //transform xml object to the string
        var xmlStringPricing = (new XMLSerializer()).serializeToString(pricingData);
        //saving sxl string to the xml file
        updatePricingXML(xmlStringPricing);
        //clearing all inputs
        $("#newCode").val('');
        $("#newCurr").val('');
        $("#newFund").val('');
        loadManagerList(2);
        //refreshing the table
        fundsPrices();
      });
    }
  }

  function removeFund() {
    $.get('Security_staticdata.xml', function(staticData) {
      //get name of manager to be removed from the dropdown
      var selManager = document.getElementById("selectManager4");
      var selectedManager = selManager.options[selManager.selectedIndex].value;

      var selFund = document.getElementById("selectFund4");
      var selectedFund = selFund.options[selFund.selectedIndex].value;
      //find all manager nodes in xml
      var $manager = $(staticData).find("manager");
      //loop through all managers until selected manager found
      $manager.each(function() {
        var $thisManager = $(this);
        var managerName = $thisManager.attr("name");
        if (managerName === selectedManager) {
          //once found remove whole node
          var $funds = $thisManager.find("fund");
          $funds.each(function() {
            var $thisFund = $(this);
            var fundName = $thisFund.find("fname").text();
            if (fundName === selectedFund) {
              $(this).remove();
            }
          });
        }
      });
      //push xml with removed node to string 
      var xmlString = (new XMLSerializer()).serializeToString(staticData);
      //push xml string to be saved in the file on the server
      updateStaticXML(xmlString);
      document.getElementById("fcodesList4").innerHTML = '';
      //refresh table
      fundsPrices();
      loadManagerList(4);
    });
  }

  //function responsible for updating prices
  function addPrice() {
    //checking if all inputs are provided
    if ($("#newDate" || "#newNav" || "#newBid" || "#newOffer").val() === '') {
      alert("Fill in all the fields");
    } else {
      //assigning selected values to variables
      var selManager = document.getElementById("selectManager3");
      var selectedManager = selManager.options[selManager.selectedIndex].value;
      var selectedFund;

      if (document.getElementById("selectFund3")) {
        var selFund = document.getElementById("selectFund3");
        selectedFund = selFund.options[selFund.selectedIndex].value;
      }

      var newDate = $("#newDate").val();
      var newNav = $("#newNav").val();
      var newBid = $("#newBid").val();
      var newOffer = $("#newOffer").val();
      if (selectedManager === '' || selectedFund === '') {
        alert("Please select manager and fund which you wish to update.");
      } else if (isNaN(newNav) || isNaN(newOffer) || isNaN(newBid)) {
          alert("Price must be a number");
          $("#newDate").val('');
          $("#newNav").val('');
          $("#newBid").val('');
          $("#newOffer").val('');
      } else if (parseInt(newNav)<=0 || parseInt(newOffer)<=0 || parseInt(newBid)<=0) {
          alert("Price must be a positive number");
          $("#newDate").val('');
          $("#newNav").val('');
          $("#newBid").val('');
          $("#newOffer").val('');
      
        } else {
          //Create new pricing node from all inputed elements
          var newNode = '<price date="' + newDate + '"><NAV>' + newNav + '</NAV><bid>' + newBid + '</bid><offer>' + newOffer + '</offer></price>';

          //getting a code for selected fund name
          var code = '';

          //ajax static and pricing data from xml
          $.get('Security_pricingdata.xml', function(pricingData) {
            $.get('Security_staticdata.xml', function(staticData) {

              //create list of all manager
              var $managers = $(staticData).find("manager");
              //find selected manager
              $managers.each(function() {
                var $thisManager = $(this);
                var managerName = $thisManager.attr("name");
                if (selectedManager === managerName) {
                  //when found create a list of all funds for manager and loop through them in order to find selected name
                  var $funds = $thisManager.find("fund");
                  $funds.each(function() {
                    var $thisFund = $(this);
                    var fundName = $thisFund.find("fname").text();
                    if (selectedFund === fundName) {
                      //once found assign a code to the variable
                      code = $thisFund.attr("code");
                    }
                  });
                }
              });

              //using var code find a node holding prices for this code and prepend them into that node
              $(pricingData).find("fund[code='" + code + "']").prepend(newNode);

              //transform xml object to the string
              var xmlString = (new XMLSerializer()).serializeToString(pricingData);
              //saving sxl string to the xml file
              updatePricingXML(xmlString);
              //clearing all inputs and selections
              $("#newDate").val('');
              $("#newNav").val('');
              $("#newBid").val('');
              $("#newOffer").val('');

              loadManagerList(3);
              //refreshing the table
              fundsPrices();
            });
          });
        }
      

    }
  }


  //function responsible for saving the data to the static xml file
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

  //function responsible for saving the data to the pricing xml file
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

  //creating a table with prices
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