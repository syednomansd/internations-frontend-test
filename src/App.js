import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';

// Components
import Header from './app/components/Header';

// Pages
import Users from './app/containers/Users';
import Groups from './app/containers/Groups';
import GroupDetails from './app/containers/GroupDetails';
import NotFoundPage from './app/containers/NotFound';

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Header />
          <div className="app-body container">
            <Switch>
              <Route exact path="/" component={Users} />
              <Route exact path="/groups" component={Groups} />
              <Route exact path="/group/:groupid" component={GroupDetails} />
              <Route component={NotFoundPage} />
            </Switch>
          </div>
        </div>
      </Router>
    );
  }
}


function mapStateToProps(globalState) {
  return {
    leftbar: globalState.leftbar
  };
}
export default connect(mapStateToProps)(App);
