import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

// Actions
import {
  updateGroup
} from './actions';

class GroupsList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      updatedTitle: "",
      updatedId: ""
    };
    this.submitUpdate = this.submitUpdate.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);
    this.handleUpdateBox = this.handleUpdateBox.bind(this);
  }

  handleUpdate(e) {
    this.setState({updatedTitle: e.target.value.replace(/(<([^>]+)>)/ig,"")});
  }

  submitUpdate(e) {
    e.preventDefault();
    const { updatedTitle, updatedId } = this.state;
    if(!updatedTitle || !updatedId){
      this.setState({msgContent: 'Please provide group title', msgType: 'alert error'})
    }else{
      this.setState({loading: true}, function(){
        this.props.updateGroup(updatedTitle, updatedId);
      })
    }
  }

  // Open edit group box
  handleUpdateBox(id, title) {
    this.setState({updatedId: id, updatedTitle: title});
  }

  renderGroups(groups) {
    const { updatedId, updatedTitle } = this.state;
    return groups.map((group) => {
      return (
        <tr key={group._id}>
          <td>
            {group.title}
            {updatedId === group._id &&
            <form onSubmit={this.submitUpdate}>
              <div className="input-group">
                <input
                  name="title"
                  value={updatedTitle}
                  className="form-control form-control-lg"
                  placeholder="Group Name"
                  type="text"
                  onChange={this.handleUpdate} />
                <div className="input-group-append">
                  <button className="btn btn-success">Update</button>
                </div>
              </div>
            </form>
            }
          </td>
          <td className="text-right">
            {updatedId === group._id ? (
            <button className="btn btn-primary mr-1" type="button" onClick={()=> this.handleUpdateBox("", "")}>Remove</button>
            ):(
            <button className="btn btn-primary mr-1" type="button" onClick={()=> this.handleUpdateBox(group._id, group.title)}>Edit</button>
            )}
            <Link to={"/group/" + group._id}>
              <button className="btn btn-success" type="button">View</button>
            </Link>
          </td>
        </tr>
      );
    })
  }

  render() {
    const { groups } = this.props;
    return(
      <table className="table table-responsive-sm my-0">
        <thead>
          <tr>
            <th>Name</th>
            <th className="text-right">Action</th>
          </tr>
        </thead>
        <tbody>
          {this.renderGroups(groups)}
        </tbody>
      </table>
    )
  }
}

function mapStateToProps(globalState) {
  return {};
}

export default connect(mapStateToProps, { updateGroup })(GroupsList);
