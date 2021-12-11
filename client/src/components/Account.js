import React from "react";
import SignOutButton from "./FireBaseComponents/SignOut";
import "../App.css";
import ChangePassword from "./FireBaseComponents/ChangePassword";

function Account() {
  return (
    <div className="container">
      <br />
      <br />
      <br />
      <br />
      <br />
      <div className="row">
        <div class="col"></div>
        <div className="col-4">
          <h2>Account Page</h2>
          <ChangePassword />
          <SignOutButton />
        </div>
        <div class="col"></div>
      </div>
    </div>
  );
}

export default Account;
