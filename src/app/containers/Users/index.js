import React, { Component } from 'react';
import { connect } from 'react-redux';

// Actions
import {
  fetchUsers,
  moreUsers,
  fetchGroups,
  searchUser,
  handleModal
} from './actions';

// Components
import UserModal from '../../components/UserModal';
import UsersList from '../../components/UsersList';

class Users extends Component {
  constructor(props) {
    super(props);
    this.state = {
      skip: 0,
      perPage: 24,
      inPage: 24,
      loading: false,
      msgContent: null,
      msgType: null,
      searchterm: "",
      userupdates: props.userupdates
    };
    this.loadMore = this.loadMore.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.addUser = this.addUser.bind(this);
  }

  loadMore() {
    const { skip, perPage, inPage } = this.state;
    this.setState({skip: skip + perPage, inPage: inPage + perPage}, function () {
      this.props.moreUsers(skip , perPage);
    });
  }

  handleSearch(e) {
    const { searchterm, skip, perPage } = this.state;
    this.setState({ searchterm: e.target.value.replace(/(<([^>]+)>)/ig,"")}, function(){
      if(searchterm){
        this.props.searchUser(searchterm);
      }else{
        this.props.fetchUsers(skip , perPage);
      }
    });
  }

  addUser() {
    const user = {
      _id: "",
      fullname: "",
      email: "",
      group: {
        _id: ""
      },
      type: "add"
    }
    this.props.handleModal(user);
  }

  componentDidMount() {
    const { skip, perPage } = this.state;
    this.props.fetchUsers(skip , perPage);
    this.props.fetchGroups();
    window.scrollTo(0, 0);
  }

  static getDerivedStateFromProps(props, state) {
    if(props.userupdates && props.userupdates !== state.userupdates){
        window.scrollTo(0, 0);
        if(props.userupdates.code === 200){
          props.fetchUsers(state.skip , state.perPage);
          return{
            msgContent: props.userupdates.message,
            msgType: 'alert success',
            userupdates: props.userupdates,
            loading: false
          }
        }else{
          return{
            msgContent: props.userupdates.error,
            msgType: 'alert error',
            userupdates: props.userupdates,
            loading: false
          }
        }
    }else{
      return null;
    }
  }

  render() {
    const users = this.props.users;
    let loadMore = users.length === this.state.inPage;
    const { msgContent, msgType, searchterm } = this.state;
    return (
      <div className="list-page my-3">
        {msgContent &&
        <div className={msgType} role="alert">
            {msgContent}
        </div>
        }
        <div className="wrap">
          <div className="col-full">
            <div className="card">
              <div className="card-header">
                <div className="card-actions">
                  <button className="btn btn-success" onClick={this.addUser}>
                    Add User
                  </button>
                </div>
              </div>
              <div className="card-body">
                <div className="form-group wrap">
                  <div className="col-full">
                    <div className="input-group">
                      <div className="input-group-prepend">
                        <span className="input-group-text"><i className="fa fa-search"></i></span>
                      </div>
                      <input
                        onChange={this.handleSearch}
                        value={searchterm}
                        name="searchterm"
                        className="form-control form-control-lg"
                        placeholder="Search User"
                        type="text" />
                    </div>
                  </div>
                </div>
                <UsersList users={users}/>
              </div>
              {loadMore &&
              <div className="card-footer">
                <button type="button" className="btn btn-sm btn-success" onClick={this.loadMore}><i className="fa fa-more"></i> Load more</button>
              </div>
              }
            </div>
          </div>
        </div>
        <UserModal />
      </div>
    )
  }
}

function mapStateToProps(globalState) {
    return {
      users: globalState.users,
      userupdates: globalState.userupdates
    };
}

export default connect(mapStateToProps, {fetchUsers, moreUsers, fetchGroups, searchUser, handleModal})(Users);
