var React = require('react/addons');
var priceType = "dual";
var btn_chng_type;
  function changePriceType(type) {
    priceType = type;
    render(priceType);
  }
    $("#btn_chng_nav").click(function() {
      changePriceType("NAV");
    });
    
    $("#btn_chng_dual").click(function() {
      changePriceType("Dual");
    });
    
  if (priceType === "NAV") {
      btn_chng_type = "<button type='button' id='btn_chng_dual' class='btn btn-default'>Display dual</button>";
    } else {
      btn_chng_type = "<button type='button' id='btn_chng_nav' class='btn btn-default'>Display NAV</button>";
    }

var SecuritiesList = require('./components/SecuritiesList.jsx');


var managerItemStore = require('./stores/ManagerItemStore.jsx');
//requesting json object from store
var initial = managerItemStore.getItems();

//rendering SecuritiesList.jsx and passing JSON object in var items
function render(priceType){
   React.render(<SecuritiesList items={initial} price={priceType}/>,app)
}
//refreshing var initial on every change to the store and re-calling render()
managerItemStore.onChange(function(items){
    initial = items;
    render(priceType);
})

//starting render()
render(priceType);