var React = require('react');
var Security = require('./Security.jsx')
var AddManager = require('./ManagerAddItem.jsx')
var RemoveManager = require('./ManagerRemoveItem.jsx')


module.exports = React.createClass({
    render:function(){
        
        var price = this.props.price;
        return (
            <div>
            <button type='button' onclick='changePriceType("NAV")' id='btn_chng_nav' className='btn btn-default' onClick=''>Display NAV</button>
                <div className='row'>
                    <table className='table-hover col-sm-12'>
                    <thead>
                        <tr>
                            <th className='col-sm-2'>ISINs code</th>
                            <th className='col-sm-5'>Security name</th>
                            <th className='col-sm-1'>Currency</th>
                            <th className='col-sm-2'>Valuation date</th>
                            {price==="NAV" ? <th className='col-sm-2'>NAV</th> : [<th className='col-sm-1'>Bid</th>,<th className='col-sm-1'>Offer</th>]}
                        </tr>
                    </thead>
                        <tbody>
                    {
                        this.props.items.map(function(item,index){

                            return (
                               <Security item={item} key={"item"+index} priceType={price} /> 
                            )
                        })
                    }
                    </tbody>
                    </table>
                </div>
                <AddManager />
                    {

                               <RemoveManager items={this.props.items}/> 
 
                    }
            </div>
        )
    }
})