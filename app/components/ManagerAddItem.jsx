var React = require('react/addons');

module.exports = React.createClass({
    render:function(){
        return (
              <div className="modal fade" id="myModal" tabIndex="-1" role="dialog" aria-labelledby="myModalLabel">
  <div className="modal-dialog" role="document">
    <div className="modal-content">
      <div className="modal-header">
        <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
        <h4 className="modal-title" id="myModalLabel">Add new manager</h4>
      </div>
      <div className="modal-body">
        <form> 
          <div className="row">
              <label htmlFor="inputName" className="col-sm-2" control-label>Manager name</label>
              <div className="col-sm-10">
                <input type="text" id="inputName" name="manager[name]" className="form-control" placeholder="Insert manager name" required/>
              </div>
          </div>
        </form>  
      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
        <button type="button" className="btn btn-primary">Save changes</button>
      </div>
    </div>
  </div>
</div>
            )
    }
})