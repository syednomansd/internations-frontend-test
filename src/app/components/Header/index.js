import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Header extends Component {
  render() {
    return(
      <nav className="navbar navbar-expand-lg fixed-top navbar-dark bg-dark">
        <Link to="/" className="navbar-brand mr-auto mr-lg-0">Internations</Link>
        <button className="navbar-toggler p-0 border-0" type="button" data-toggle="offcanvas">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="navbar-collapse offcanvas-collapse" id="navbarsExampleDefault">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to="/" className="nav-link">Users</Link>
            </li>
            <li className="nav-item">
              <Link to="/groups" className="nav-link">Groups</Link>
            </li>
          </ul>
        </div>
      </nav>
    )
  }
}

export default Header;
