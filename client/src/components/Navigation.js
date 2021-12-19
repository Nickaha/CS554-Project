import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../firebase/Auth";
import SignOutButton from "./FireBaseComponents/SignOut";
import "../App.css";

const Navigation = () => {
  const { currentUser } = useContext(AuthContext);
  return <div>{currentUser ? <NavigationAuth /> : <NavigationNonAuth />}</div>;
};



const NavigationAuth = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <h1 className="navbar-brand">Rice To meet you</h1>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav">
          <li className="nav-item ">
            <NavLink className="nav-link" exact to="/order" activeClassName="active">
              Order
            </NavLink>
          </li>
          
          <li className="nav-item">
            <NavLink className="nav-link" exact to="/" activeClassName="active">
              Landing
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" exact to="/account" activeClassName="active">
              Account
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" exact to="/reviews" activeClassName="active">
              Reviews
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" exact to="/cart" activeClassName="active">
              Cart/Checkout
            </NavLink>
          </li>
          <li>
            <SignOutButton />
          </li>
        </ul>
      </div>
    </nav>
  );
};

const NavigationNonAuth = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <h1 className="navbar-brand">Rice To meet you</h1>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav">
          <li className="nav-item ">
            <NavLink className="nav-link" exact to="/order" activeClassName="active">
              Order
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              className="nav-link"
              exact
              to="/signin"
              activeClassName="active"
            >
              Sign-in
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" exact to="/" activeClassName="active">
              Home
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" exact to="/reviews" activeClassName="active">
              Reviews
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" exact to="/cart" activeClassName="active">
              Cart/Checkout
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navigation;
