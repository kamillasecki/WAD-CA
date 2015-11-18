var React = require('react');
var action = require('./../actions/ManagerItemActionCreator.jsx')

module.exports = React.createClass({
    getInitialState:function(){
        return{input:""};
    },
    handleInputName:function(e){
        this.setState({input:e.target.value});

    },
    addItem:function(e){
        e.preventDefault();
        //console.log("Adding manager", this.state.input);
        action.add({
            name:this.state.input,
            funds:[]});
            //clearing input
            this.setState({
                input:''
            })
            
    },
    render:function(){
        return (
        <div className="modal fade" id="addmanager" tabIndex="-1" role="dialog" aria-labelledby="myModalLabel">
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                        <h4 className="modal-title" id="myModalLabel">Add new manager</h4>
                    </div>
                    
                        <form onSubmit={this.addItem}> 
                        <div className="modal-body">
                            <div className="row">
                                <label htmlFor="inputName" className="col-sm-2" control-label>Manager name</label>
                                <div className="col-sm-10">
                                    <input type="text" value={this.state.input} onChange={this.handleInputName}  className="form-control" placeholder="Insert manager name" required/>
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