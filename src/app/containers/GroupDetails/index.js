import React, { Component } from 'react';
import { connect } from 'react-redux';

// Actions
import {
  fetchGroupUsers,
  searchUser,
  fetchGroup
} from './actions';

// Components
import UsersList from '../../components/UsersList';
import UserModal from '../../components/UserModal';
import Loading from '../../components/Loading';
import NotFound from '../../components/NotFound';

class GroupDetails extends Component {
  constructor(props){
    super(props)
    this.state = {
      skip: 0,
      perPage: 24,
      inPage: 24,
      msgContent: null,
      msgType: null,
      searchterm: "",
      userupdates: props.userupdates
    }
    this.handleSearch = this.handleSearch.bind(this);
  }

  handleSearch(e) {
    const { searchterm } = this.state;
    const { groupid } = this.props.match.params;
    this.setState({ searchterm: e.target.value.replace(/(<([^>]+)>)/ig,"")}, function(){
      if(searchterm.length > 1){
        this.props.searchUser(searchterm, groupid);
      }else{
        this.props.fetchGroupUsers(groupid);
      }
    });
  }

  componentDidMount() {
    const { groupid } = this.props.match.params;
    this.props.fetchGroup(groupid);
    this.props.fetchGroupUsers(groupid);
  }

  static getDerivedStateFromProps(props, state) {
    if(props.userupdates && props.userupdates !== state.userupdates){
      window.scrollTo(0, 0);
      if(props.userupdates.code === 200){
        props.fetchGroupUsers(props.match.params.groupid);
        console.log(props.userupdates.message);
        return{
          msgContent: props.userupdates.message,
          msgType: 'alert success',
          userupdates: props.userupdates
        }
      }else{
        return{
          msgContent: props.userupdates.error,
          msgType: 'alert error',
          userupdates: props.userupdates
        }
      }
    }else{
      return null;
    }
  }

  render() {
    const { group, users, inPage } = this.props;
    const { msgContent, msgType, searchterm } = this.state;

    if(group){
      if(group.code ===200){
        let loadMore = users.length === inPage;
        return(
          <div className="group-page my-3">
            {msgContent &&
            <div className={msgType} role="alert">
              {msgContent}
            </div>
            }
            <div className="wrap">
              <div className="col-full">
                <div className="card">
                  <div className="card-header">
                    {group.data.title} - Users List
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
      }else if(group.code === 404 || group.code === 500){
        return(
          <NotFound />
        )
      }
    }else{
      return(
        <Loading />
      )
    }
  }
}


function mapStateToProps(globalState) {
  return {
    users: globalState.users,
    group: globalState.group,
    userupdates: globalState.userupdates
  };
}

export default connect(mapStateToProps, { fetchGroup, fetchGroupUsers, searchUser })(GroupDetails);
