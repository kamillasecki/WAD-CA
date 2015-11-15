var React = require('react/addons');
var Security = require('./Security.jsx')
var AddManager = require('./ManagerAddItem.jsx')

module.exports = React.createClass({
    render:function(){
        return (
            <div>
                <h1>Manager list </h1>
                <div className='row'>
                    <table className='table-hover col-sm-12'>
                        <tr>
                            <th className='col-sm-2'>ISIN code</th>
                            <th className='col-sm-5'>Security name</th>
                            <th className='col-sm-1'>Currency</th>
                            <th className='col-sm-2'>NAV price</th>
                            <th className='col-sm-2'>Valuation date</th>
                        </tr>
                    {
                        this.props.items.map(function(item,index){
                            return (
                               <Security item={item} key={"item"+index}/> 
                            )
                        })
                    }
                    </table>
                </div>
                <AddManager />
            </div>
        )
    }
})