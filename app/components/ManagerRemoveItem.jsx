var React = require('react');
var action = require('./../actions/ManagerItemActionCreator.jsx')
var Manager = require('./ManagersList.jsx')

module.exports = React.createClass({
    getInitialState:function(){
        return{input:""};
    },
    handleInputName:function(e){
        this.setState({input:e.target.options[e.target.selectedIndex].text});
    },
    delete:function(e){
        console.log(JSON.stringify(e, null, 4));
        e.preventDefault();
        action.delete(this.state);
    },
    render:function(){
        return (
        <div className="modal fade" id="removemanager" tabIndex="-1" role="dialog" aria-labelledby="myModalLabel">
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                        <h4 className="modal-title" id="myModalLabel">Remove manager</h4>
                    </div>
                        <form onSubmit={this.delete}> 
                        <div className="modal-body">
                            <div className="row">
                                <label htmlFor="inputName" className="col-sm-2" control-label>Manager name</label>
                                <div className="col-sm-10">
                                     <select onChange={this.handleInputName}>
                                        {
                                            this.props.items.map(function(item, index){
                                                return (
                                                   <Manager item={item} key={"item"+index}/> 
                                                )
                                            })
                                        }
                                      </select> 
                            </div>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
                        <button type="submit" className="btn btn-primary">Save changes</button>
                    </div>
                    </form>  
                </div>
            </div>
        </div>
        )
    }
})