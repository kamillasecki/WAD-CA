var React = require('react/addons');

module.exports = React.createClass({
    render:function(){
        return (
            <tr className='manager'>
                <td colSpan='5'>
                    <h4>
                        <a href='javascript:changeActiveManager({this.props.item.name})'>
                            <div>{this.props.item.name}</div>
                        </a>
                    </h4>
                </td>
            </tr>
        )
    }

    
})