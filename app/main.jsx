var React = require('react/addons');
console.log("It's working");

var SecuritiesList = require('./components/SecuritiesList.jsx');


var managerItemStore = require('./stores/ManagerItemStore.jsx');
var initial = managerItemStore.getItems();


function render(){
   React.render(<SecuritiesList items={initial}/>,app)
}
managerItemStore.onChange(function(items){
    initial = items;
    render();
})
render();