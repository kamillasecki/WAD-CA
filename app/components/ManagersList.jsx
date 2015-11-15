var React = require('react/addons');

module.exports = React.createClass({
    render:function(){
        return (
            <option value = "{this.props.item.name}">{this.props.item.name}</option>
        )
    }

    
})