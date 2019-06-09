import React, { Component } from 'react';
import { connect } from 'react-redux';

// Actions
import {
  fetchGroups,
  searchGroup,
  addGroup
} from './actions';

// Compenents
import GroupsList from '../../components/GroupsList';

class Groups extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      msgContent: null,
      msgType: null,
      title: "",
      searchterm: "",
      groupupdates: props.groupupdates
    };
    this.handleInput = this.handleInput.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
  }

  handleInput(event) {
    this.setState({title: event.target.value.replace(/(<([^>]+)>)/ig,"")});
  }

  handleSubmit(e) {
    e.preventDefault();
    const { title } = this.state;
    if(!title){
      this.setState({msgContent: 'Please provide group title', msgType: 'alert error'})
    }else{
      this.setState({loading: true}, function(){
        this.props.addGroup({title});
      })
    }
  }

  handleSearch(e) {
    const { searchterm } = this.state;
    this.setState({ searchterm: e.target.value.replace(/(<([^>]+)>)/ig,"")}, function(){
      if(searchterm.length > 1){
        this.props.searchGroup(searchterm);
      }else{
        this.props.fetchGroups();
      }
    });
  }

  componentDidMount() {
    this.props.fetchGroups();
    window.scrollTo(0, 0);
  }

  static getDerivedStateFromProps(props, state) {
    if(props.groupupdates && props.groupupdates !== state.groupupdates){
      window.scrollTo(0, 0);
      if(props.groupupdates.code === 200){
        props.fetchGroups();
        return{
          msgContent: props.groupupdates.message,
          msgType: 'alert success',
          groupupdates: props.groupupdates,
          loading: false,
          title: ""
        }
      }else{
        return{
          msgContent: props.groupupdates.error,
          msgType: 'alert error',
          groupupdates: props.groupupdates,
          loading: false
        }
      }
    }else{
      return null;
    }
  }

  render() {
    const { groups } = this.props;
    const { msgContent, msgType, searchterm, loading, title } = this.state;
    return(
      <div className="list-page my-3">
        {msgContent &&
        <div className={msgType} role="alert">
          {msgContent}
        </div>
        }
        <div className="row">
          <div className="col-md-8">
            <div className="card">
              <div className="card-header">
                Groups List
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
                <GroupsList groups={groups} />
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card">
              <form className="form-horizontal" onSubmit={this.handleSubmit}>
                <div className="card-header">
                  Add Group
                </div>
                <div className="card-body">
                  <div className="form-group wrap my-0">
                    <div className="col-full">
                      <div className="input-group">
                        <div className="input-group-prepend">
                          <span className="input-group-text"><i className="fa fa-user"></i></span>
                        </div>
                        <input
                          name="title"
                          value={title}
                          className="form-control form-control-lg"
                          placeholder="Group Name"
                          type="text"
                          onChange={this.handleInput} />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="card-footer">
                {loading ?(
                  <button type="button" className="btn btn-success loading" disabled><i className="fas fa-sync-alt fa-spin"></i></button>
                ):(
                  <button type="submit" className="btn btn-success">Submit</button>
                )}
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

function mapStateToProps(globalState) {
  return {
    groups: globalState.groups,
    groupupdates: globalState.groupupdates
  };
}

export default connect(mapStateToProps, { fetchGroups, addGroup, searchGroup })(Groups);
