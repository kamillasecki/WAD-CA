var React = require('react/addons');
var Fund = require("./fund.jsx")

module.exports = React.createClass({
    render:function(){
        var price = this.props.priceType;
        console.log(price)
        return [
            
            <tr className='manager'>
                <td colSpan={price === "NAV" ? '5' : '6'}>
                    <h4>
                        <a href='javascript:changeActiveManager({this.props.item.name})'>
                            <div>{this.props.item.name}</div>
                        </a>
                    </h4>
                </td>
            </tr>,
            <tr>
                {this.props.ite.map(function(item,index){
                    <Fund item={item} key={index} />
                })
                }
            </tr>
        /*   {this.props.item.funds.map(function(item){
                return (
                <tr className='fund'>
                <td>{item.isin}</td>
                <td>{item.name}</td>
                <td>{item.currency}</td>
                <td>{item.prices[0].date}</td>
                {price === "NAV" ? <td>{item.prices[0].nav}</td> : [<td>{item.prices[0].bid}</td>,<td>{item.prices[0].offer}</td>]}
                </tr>
                )
                
            })}
            */
         ]
    }
})