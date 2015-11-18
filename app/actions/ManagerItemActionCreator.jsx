var dispatcher = require('./../dispatcher.js');

module.exports = {
    add:function(item){
        console.log(JSON.stringify(item,null,4))
        dispatcher.dispatch({
            payload:item,
            type:"manager-item:add"
        })
    },
    delete:function(item){
        dispatcher.dispatch({
            payload:item,
            type:"manager-item:delete"
        })
    }
}