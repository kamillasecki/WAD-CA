var React = require('react/addons');
console.log("It's working");

var SecuritiesList = require('./components/SecuritiesList.jsx');


var initial = [{
    name:"Blackrock",
    funds:[{
            isin:"IE0012333446",
            name:"Majedie UK Focus",
            currency:"EUR",
            active:true,
            prices:[{
                date:"11/11/2015",
                nav:"12.32",
                bid:"12.33",
                offer:"12.35"
                },{ 
                date:"10/11/2015",
                nav:"12.22",
                bid:"12.23",
                offer:"12.25"
            }]
        }]
},{
    name:"Fidelity"
},{
    name:"BNP Paribas"
}];

React.render(<SecuritiesList items={initial}/>,app)