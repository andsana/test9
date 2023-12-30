import React from 'react';
import {NavLink} from 'react-router-dom';

const Navbar: React.FC = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary mb-3">
      <div className="container-fluid">
        <span className="navbar-brand">
          <NavLink to="/" className="nav-link">Finance tracker</NavLink>
        </span>
        <ul className="navbar-nav mr-auto">
          <li className="nav-item">
            <NavLink to="/Categories" className="nav-link">Categories</NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/new-transaction" className="nav-link">Add transaction</NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;