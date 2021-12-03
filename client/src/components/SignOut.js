import React from 'react';
import { doSignOut } from '../firebase/FirebaseFunctions';
import "../App.css";
import { NavLink } from "react-router-dom";

const SignOutButton = () => {
  return (
    <NavLink className="nav-link" exact to="/" activeClassName="active_signout" onClick={doSignOut}>
      Sign Out
    </NavLink>
  );
};

export default SignOutButton;
