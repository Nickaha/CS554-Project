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
            <NavLink className="nav-link" exact to="/order">
              Order
            </NavLink>
          </li>

          <li className="nav-item">
            <NavLink className="nav-link" exact to="/">
              Landing
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" exact to="/account">
              Account
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" exact to="/reviews">
              Reviews
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" exact to="/cart">
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
      <h1 className="navbar-brand">Rice To Meet You</h1>
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
            <NavLink className="nav-link" exact to="/order" color="black">
              Order
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" exact to="/signin">
              Sign-in
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" exact to="/">
              Home
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" exact to="/reviews">
              Reviews
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" exact to="/cart">
              Cart/Checkout
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navigation;
