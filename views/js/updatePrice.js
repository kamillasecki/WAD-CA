  function zeroButton(btnName) {
      $(btnName).addClass("btn-default")
      .removeClass("btn-primary");
  }
  //use this function to highlight button
  function activeButton(btnName) {
      $(btnName).addClass("btn-primary")
      .removeClass("btn-default");
  }

  $(document).ready(function() {
    $("#updatePrices").click(function() {
      //load content
      //change appearence of buttons
      zeroButton("#fundsPrices");
      zeroButton("#btnRemoveManager");
      zeroButton("#addFund");
      activeButton("#addManager");
    });
  });