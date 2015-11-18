var React = require('react');

module.exports = React.createClass({
    render:function(){
        var price = this.props.priceType;
        console.log(price)
        return (
            <tr className='fund'>
            {this.props.item.funds.map(function(item){
                return [
                <td>{item.isin}</td>,
                <td>{item.name}</td>,
                <td>{item.currency}</td>,
                <td>{item.prices[0].date}</td>,
                <td>{price === "NAV" ? <td>{item.prices[0].nav}</td> : [<td>{item.prices[0].bid}</td>,<td>{item.prices[0].offer}</td>]}</td>
                
                ]
                
    })}
       </tr>
         )
    }
})