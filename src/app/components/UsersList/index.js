import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';

// Actions
import {
  handleModal
} from "./actions";

class UsersList extends Component {
  editUser(user) {
    this.props.handleModal(user);
  }

  renderUsers(users) {
    return users.map((user) => {
      return (
        <tr key={user._id}>
          <td>{user.fullname}</td>
          <td>{user.email}</td>
          <td>{user.group.title}</td>
          <td className="md-visible">{moment(user.registered).format('DD.MM.YYYY - hh:mm (Z)')}</td>
          <td>
            <button className="btn btn-primary mr-1" onClick={()=> this.editUser(user)}>Edit</button>
          </td>
        </tr>
      );
    })
  }

  render() {
    return(
      <table className="table table-responsive-lg m-0">
        <thead>
          <tr>
            <th>Full Name</th>
            <th>Email</th>
            <th>Group</th>
            <th className="md-visible">Registered</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {this.renderUsers(this.props.users)}
        </tbody>
      </table>
    )
  }
}

function mapStateToProps(globalState) {
  return {};
}

export default connect(mapStateToProps, { handleModal })(UsersList);
