var dispatcher = require('./../dispatcher.js');

function ManagerItemStore(){
    var items = [{
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
        },{
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
    name:"Fidelity",
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
    name:"BNP Paribas",
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
}];
    var listeners = [];
    
    function getItems(){
        return items;
    }
    
    function addManagerItem(item) {
        items.push(item);
        triggerListeners();
    }
    
    function deleteManagerItem(item) {
        console.log("Deleting!!!!!" +  JSON.stringify(item,null,4))
        var index
        items.filter(function(_item, _index){
            console.log("_item.name=" +_item.name)
            console.log("item.name=" +item.input)
            console.log("_index=" +_index)
            if(_item.name === item.input) {
                index = _index;
            }
        });
        console.log("Deleting " + index)
        items.splice(index,1);
        console.log("Deleted " + index)
        triggerListeners();
        console.log("Listeners kicked off")
    }
    
    function onChange(listener){
        listeners.push(listener);
    }
    
    function triggerListeners(){
        console.log(listeners)
        listeners.forEach(function(listener){
            console.log(listener)
            listener(items);
        });
    }
    
    dispatcher.register(function(event){
        var split = event.type.split(':');
        if (split[0]==='manager-item'){
            switch (split[1]) {
                case 'add':
                    addManagerItem(event.payload);
                    break
                case 'delete':
                    deleteManagerItem(event.payload);
                    break;
            }
        }
    });
    
    return {
        getItems:getItems,
        onChange:onChange
    }
    
}

module.exports = new ManagerItemStore();